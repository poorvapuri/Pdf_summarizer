import sys
import json
import re
import logging
import nltk
import os

NLTK_DIR = "/opt/render/nltk_data"
os.makedirs(NLTK_DIR, exist_ok=True)

nltk.data.path.append(NLTK_DIR)

for pkg in ["stopwords", "punkt"]:
    try:
        if pkg == "stopwords":
            nltk.data.find("corpora/stopwords")
        else:
            nltk.data.find("tokenizers/punkt")
    except LookupError:
        nltk.download(pkg, download_dir=NLTK_DIR)


from pathlib import Path

try:
    import pytesseract
    import slate3k as slate
    from pdf2image import convert_from_path
    from nltk.corpus import stopwords
    from nltk.tokenize import word_tokenize, sent_tokenize
    from nltk.stem.snowball import SnowballStemmer
except Exception as exc:
    pytesseract = None
    slate = None
    convert_from_path = None
    stopwords = None
    word_tokenize = None
    sent_tokenize = None
    SnowballStemmer = None
    IMPORT_ERROR = str(exc)
else:
    IMPORT_ERROR = None

logging.getLogger("pdfminer").setLevel(logging.ERROR)

# ─── CONFIGURATION ────────────────────────────────────────────────────
POPPLER_PATH = None  # ✅ macOS uses system poppler

MIN_SENTENCE_WORDS = 6
MAX_SENTENCE_WORDS = 60

try:
    STOP = set(stopwords.words("english")) if stopwords else set()
except LookupError:
    nltk.download("stopwords", download_dir=NLTK_DIR)
    STOP = set(stopwords.words("english"))
STEMMER = SnowballStemmer("english") if SnowballStemmer else None

SUMMARY_PROFILES = {
    "short": {
        "summary_ratio": 0.1,
        "sentences_per_chunk": 1,
        "min_sentences": 3,
        "max_sentences": 6,
    },
    "medium": {
        "summary_ratio": 0.25,
        "sentences_per_chunk": 1,
        "min_sentences": 6,
        "max_sentences": 15,
    },
    "detailed": {
        "summary_ratio": 0.45,
        "sentences_per_chunk": 2,
        "min_sentences": 12,
        "max_sentences": 40,
    },
}

# ─── TEXT EXTRACTION ──────────────────────────────────────────────────
def extract_text_pdf(path: str) -> str:
    if slate is None:
        return ""

    try:
        with open(path, "rb") as f:
            return " ".join(slate.PDF(f))
    except Exception as e:
        print("SLATE ERROR:", str(e), flush=True)
        return ""


# def extract_text(path, start_page=None, end_page=None):
#     print("Starting PDF extraction", flush=True)

#     text = extract_text_pdf(path)
#     print(f"PDF text length: {len(text)}", flush=True)

#     if start_page or end_page or len(text.strip()) < 50:
#         print("Falling back to OCR", flush=True)
#         text = extract_text_ocr(path, start_page, end_page)

#     print("Extraction finished", flush=True)
#     return text

def extract_text(path: str, start_page=None, end_page=None) -> str:
    print("Trying slate", flush=True)

    text = extract_text_pdf(path)

    print("Text length:", len(text), flush=True)

    if start_page or end_page or len(text.strip()) < 50:
        print("Using OCR", flush=True)
        text = extract_text_ocr(path, start_page, end_page)

    print("Extraction complete", flush=True)

    return text

# def extract_text_ocr(path: str, start_page=None, end_page=None) -> str:

#     print("Calling convert_from_path", flush=True)

#     pages = convert_from_path(
#     path,
#     first_page=start_page,
#     last_page=end_page
# )

#     print("convert_from_path done", flush=True)

#     print("Starting pytesseract", flush=True)

#     text = " ".join(pytesseract.image_to_string(p) for p in pages)

#     print("pytesseract done", flush=True)
#     if convert_from_path is None or pytesseract is None:
#         return ""

#     try:
#         pages = convert_from_path(
#             path,
#             first_page=start_page,
#             last_page=end_page
#         )
#         return " ".join(pytesseract.image_to_string(p) for p in pages)
#     except Exception:
#         return ""


def extract_text_ocr(path: str, start_page=None, end_page=None) -> str:
    if convert_from_path is None or pytesseract is None:
        return ""

    try:
        print("Calling convert_from_path()", flush=True)

        pages = convert_from_path(
            path,
            first_page=start_page,
            last_page=end_page
        )

        print("convert_from_path finished", flush=True)

        print("Starting pytesseract", flush=True)

        text = " ".join(pytesseract.image_to_string(p) for p in pages)

        print("pytesseract finished", flush=True)

        return text

    except Exception as e:
        print("OCR ERROR:", str(e), flush=True)
        return ""

# def extract_text(path: str, start_page=None, end_page=None) -> str:
#     text = extract_text_pdf(path)

#     # If page range is provided or text is weak → OCR
#     if start_page or end_page or len(text.strip()) < 50:
#         text = extract_text_ocr(path, start_page, end_page)

#     return text


# ─── TEXT CLEANING ────────────────────────────────────────────────────
def clean_text(text: str) -> str:
    text = re.sub(r"https?://\S+|www\.\S+", "", text)
    text = re.sub(r"\S+@\S+\.\S+", "", text)
    text = re.sub(r"\[\s*\d+(?:\s*[,\-–]\s*\d+)*\s*\]", "", text)
    text = re.sub(r"(?i)(figure|fig|table|chart)\s*\d*", "", text)

    text = re.sub(r"\s+", " ", text).strip()
    return text


# ─── SENTENCE FILTERING ──────────────────────────────────────────────
def is_valid_sentence(sentence: str) -> bool:
    if not word_tokenize:
        return False

    words = word_tokenize(sentence)
    alpha_words = [w for w in words if w.isalpha()]
    return MIN_SENTENCE_WORDS <= len(alpha_words) <= MAX_SENTENCE_WORDS


# ─── SCORING ──────────────────────────────────────────────────────────
def build_word_frequencies(text: str) -> dict:
    if not word_tokenize or not STEMMER:
        return {}

    freq = {}
    for w in word_tokenize(text.lower()):
        if w.isalpha() and w not in STOP:
            sw = STEMMER.stem(w)
            freq[sw] = freq.get(sw, 0) + 1

    max_freq = max(freq.values(), default=1)
    return {k: v / max_freq for k, v in freq.items()}


def score_sentence(sentence: str, freq: dict) -> float:
    if not STEMMER or not word_tokenize:
        return 0.0

    words = [
        STEMMER.stem(w) for w in word_tokenize(sentence.lower())
        if w.isalpha() and w not in STOP
    ]
    return sum(freq.get(w, 0) for w in words) / max(len(words), 1)


# ─── SUMMARIZATION ────────────────────────────────────────────────────
def summarize(text: str, mode="medium") -> str:
    if not sent_tokenize or not word_tokenize or not STEMMER:
        return "Summary generation is unavailable because the required Python dependencies are not installed on the server."

    profile = SUMMARY_PROFILES.get(mode, SUMMARY_PROFILES["medium"])

    sentences = sent_tokenize(clean_text(text))
    valid = [s for s in sentences if is_valid_sentence(s)]

    if not valid:
        return "No readable content found in selected pages."

    freq = build_word_frequencies(text)

    scored = [(s, score_sentence(s, freq)) for s in valid]
    scored.sort(key=lambda x: x[1], reverse=True)

    target = max(
        profile["min_sentences"],
        min(profile["max_sentences"], int(len(valid) * profile["summary_ratio"]))
    )

    return " ".join(s for s, _ in scored[:target])


# ─── HEADING GENERATION ───────────────────────────────────────────────
def generate_headings(text: str, summary: str) -> list:
    headings = []
    
    # 1. First sentence of the summary
    sentences = sent_tokenize(summary)
    if sentences:
        first_sent = sentences[0]
        words = word_tokenize(first_sent)
        alpha_words = [w for w in words if w.isalpha()]
        if len(alpha_words) > 6:
            headings.append(" ".join(alpha_words[:6]).title() + "...")
        elif alpha_words:
            headings.append(" ".join(alpha_words).title())
            
    # 2. Keyword extraction (using original words)
    raw_freq = {}
    for w in word_tokenize(text.lower()):
        if w.isalpha() and w not in STOP and len(w) > 3:
            raw_freq[w] = raw_freq.get(w, 0) + 1
            
    sorted_raw = sorted(raw_freq.items(), key=lambda item: item[1], reverse=True)
    top_words = [w.title() for w, score in sorted_raw[:2]]
    if top_words:
        headings.append(" ".join(top_words) + " Overview")
        
    if len(sorted_raw) > 4:
        next_words = [w.title() for w, score in sorted_raw[2:4]]
        if next_words:
            headings.append(" ".join(next_words) + " Highlights")
            
    if not headings:
        headings.append("Document Summary")
        
    unique_headings = []
    for h in headings:
        if h not in unique_headings:
            unique_headings.append(h)
            
    return unique_headings[:3]


# ─── ENTRY POINT ──────────────────────────────────────────────────────
def main():
    if len(sys.argv) < 3:
        print(json.dumps({"summary": "Invalid arguments", "error": "No file path or mode provided"}), flush=True)
        sys.exit(0)

    file_path = sys.argv[1]
    mode = sys.argv[2]

    start_page = int(sys.argv[3]) if len(sys.argv) > 3 else None
    end_page = int(sys.argv[4]) if len(sys.argv) > 4 else None

    if not Path(file_path).is_file():
        print(json.dumps({"summary": "File not found", "error": f"File not found: {file_path}"}), flush=True)
        sys.exit(0)

    if IMPORT_ERROR:
        print(json.dumps({
            "summary": "Summary generation is unavailable on this server.",
            "error": IMPORT_ERROR
        }), flush=True)
        sys.exit(0)

    try:
        text = extract_text(file_path, start_page, end_page)

        if not text.strip():
            print(json.dumps({
                "summary": "Could not extract text from selected pages.",
                "error": "No readable text found"
            }), flush=True)
            sys.exit(0)

        summary = summarize(text, mode)
        headings = generate_headings(text, summary)

        print(json.dumps({
            "summary_type": mode,
            "pages": f"{start_page}-{end_page}" if start_page is not None else "full",
            "summary": summary,
            "headings": headings
        }), flush=True)
    except Exception as exc:
        print(json.dumps({
            "summary": "Error processing the PDF.",
            "error": str(exc)
        }), flush=True)
        sys.exit(0)


if __name__ == "__main__":
    main()
