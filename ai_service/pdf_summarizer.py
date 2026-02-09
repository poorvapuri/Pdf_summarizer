# # #!/usr/bin/env python3

# # import sys
# # import json
# # import os
# # import re
# # import nltk
# # import pytesseract
# # import slate3k as slate
# # from pdf2image import convert_from_path
# # from nltk.corpus import stopwords
# # from nltk.tokenize import word_tokenize, sent_tokenize
# # from nltk.stem.snowball import SnowballStemmer
# # from PIL import Image

# # # Download once (cached after first run)
# # nltk.download("stopwords", quiet=True)
# # nltk.download("punkt", quiet=True)


# # POPPLER_PATH = r"C:\poppler-25.12.0\Library\bin"

# # import logging
# # logging.getLogger("pdfminer").setLevel(logging.ERROR)


# # def extract_text_pdf(file_path):
# #     with open(file_path, "rb") as f:
# #         pages = slate.PDF(f)

# #     text = ""
# #     for page in pages:
# #         text += page

# #     return text


# # # def extract_text_ocr(file_path):
# # #     pages = convert_from_path(file_path, dpi=300)
# # #     text = ""

# # #     for page in pages:
# # #         text += pytesseract.image_to_string(page)

# # #     return text


# # def extract_text_ocr(file_path):
# #     pages = convert_from_path(
# #         file_path,
# #         dpi=300,
# #         poppler_path=POPPLER_PATH
# #     )

# #     text = ""
# #     for page in pages:
# #         text += pytesseract.image_to_string(page)

# #     return text


# # def summarize(text):
# #     processed_text = re.sub("’", "'", text)
# #     processed_text = re.sub("[^a-zA-Z' ]+", " ", processed_text)

# #     stop_words = set(stopwords.words("english"))
# #     stemmer = SnowballStemmer("english", ignore_stopwords=True)

# #     words = word_tokenize(processed_text.lower())
# #     freq_table = {}

# #     for word in words:
# #         if word not in stop_words:
# #             stem = stemmer.stem(word)
# #             freq_table[stem] = freq_table.get(stem, 0) + 1

# #     sentences = sent_tokenize(text)
# #     sentence_scores = {}

# #     for sentence in sentences:
# #         for stem in freq_table:
# #             if stem in sentence.lower():
# #                 sentence_scores[sentence] = sentence_scores.get(sentence, 0) + freq_table[stem]

# #     if not sentence_scores:
# #         return ""

# #     average = sum(sentence_scores.values()) / len(sentence_scores)

# #     summary = [
# #         s for s in sentences
# #         if sentence_scores.get(s, 0) > 3.0 * average
# #     ]

# #     return " ".join(summary)


# # # def main():
# # #     data = json.loads(sys.stdin.read())

# # #     file_path = data["file_path"]
# # #     mode = data.get("mode", "text")  # "text" or "ocr"

# # #     if mode == "ocr":
# # #         text = extract_text_ocr(file_path)
# # #     else:
# # #         text = extract_text_pdf(file_path)

# # #     summary = summarize(text)

# # #     print(json.dumps({
# # #         "summary": summary
# # #     }))


# # # if __name__ == "__main__":
# # #     main()


# # # def main():
# # #     try:
# # #         # data = json.loads(sys.stdin.read())
# # #         raw_input = sys.stdin.read()

# # #         if not raw_input.strip():
# # #             print(json.dumps({
# # #                 "summary": "No input received from Node.js"
# # #             }), flush=True)
# # #             sys.exit(0)

# # #         data = json.loads(raw_input)

# # #         file_path = data.get("file_path")
# # #         mode = data.get("mode", "text")

# # #         if not file_path:
# # #             raise ValueError("No file path provided")

# # #         if mode == "ocr":
# # #             text = extract_text_ocr(file_path)
# # #         else:
# # #             text = extract_text_pdf(file_path)

# # #         if not text or not text.strip():
# # #             summary = "No readable text could be extracted from the PDF."
# # #         else:
# # #             summary = summarize(text)
# # #             if not summary.strip():
# # #                 summary = "Summary could not be generated for this document."

# # #         print(json.dumps({
# # #             "summary": summary
# # #         }),flush=True)

# # #     # except Exception as e:
# # #     #     # 🔴 ALWAYS return valid JSON, even on error
# # #     #     print(json.dumps({
# # #     #         "summary": "Error occurred during PDF summarization.",
# # #     #         "error": str(e)
# # #     #     }))

# # #     except Exception as e:
# # #         import traceback
# # #         traceback.print_exc(file=sys.stderr)

# # #         print(json.dumps({
# # #             "summary": "Error occurred during PDF summarization.",
# # #             "error": str(e)
# # #         }),flush=True)

# # def main():
# #     try:
# #         if len(sys.argv) < 2:
# #             print(json.dumps({
# #                 "summary": "No file path provided"
# #             }), flush=True)
# #             return

# #         file_path = sys.argv[1]
# #         mode = sys.argv[2] if len(sys.argv) > 2 else "text"

# #         if mode == "ocr":
# #             text = extract_text_ocr(file_path)
# #         else:
# #             try:
# #                 text = extract_text_pdf(file_path)
# #             except Exception:
# #                 text = ""

# #             if not text or not text.strip():
# #                 text = extract_text_ocr(file_path)

# #         if not text or not text.strip():
# #             summary = "No readable text could be extracted from the PDF."
# #         else:
# #             summary = summarize(text)
# #             if not summary.strip():
# #                 summary = "Summary could not be generated for this document."

# #         print(json.dumps({
# #             "summary": summary
# #         }), flush=True)

# #     except Exception as e:
# #         import traceback
# #         traceback.print_exc(file=sys.stderr)

# #         print(json.dumps({
# #             "summary": "Error occurred during PDF summarization.",
# #             "error": str(e)
# #         }), flush=True)


# # if __name__ == "__main__":
# #     main()


# # import sys, json, re, logging
# # import pytesseract
# # import slate3k as slate
# # from pdf2image import convert_from_path
# # from nltk.corpus import stopwords
# # from nltk.tokenize import word_tokenize, sent_tokenize
# # from nltk.stem.snowball import SnowballStemmer

# # logging.getLogger("pdfminer").setLevel(logging.ERROR)

# # POPPLER_PATH = r"C:\poppler-25.12.0\Library\bin"

# # def extract_text_pdf(path):
# #     with open(path, "rb") as f:
# #         return "".join(slate.PDF(f))

# # def extract_text_ocr(path):
# #     pages = convert_from_path(path, poppler_path=POPPLER_PATH)
# #     return "".join(pytesseract.image_to_string(p) for p in pages)

# # # def summarize(text):
# # #     words = word_tokenize(text.lower())
# # #     stop = set(stopwords.words("english"))
# # #     stem = SnowballStemmer("english")
# # #     freq = {}

# # #     for w in words:
# # #         if w.isalpha() and w not in stop:
# # #             s = stem.stem(w)
# # #             freq[s] = freq.get(s, 0) + 1

# # #     sentences = sent_tokenize(text)
# # #     scores = {}

# # #     for s in sentences:
# # #         for k in freq:
# # #             if k in s.lower():
# # #                 scores[s] = scores.get(s, 0) + freq[k]

# # #     if not scores:
# # #         return "No summary could be generated."

# # #     avg = sum(scores.values()) / len(scores)
# # #     return " ".join(s for s in sentences if scores.get(s, 0) > avg)



# # # def summarize(text, chunk_size=8, sentences_per_chunk=2):
# # #     stop = set(stopwords.words("english"))
# # #     stem = SnowballStemmer("english")

# # #     sentences = sent_tokenize(text)
# # #     if len(sentences) < chunk_size:
# # #         return text  # short doc fallback

# # #     # build global word frequency
# # #     words = word_tokenize(text.lower())
# # #     freq = {}

# # #     for w in words:
# # #         if w.isalpha() and w not in stop:
# # #             s = stem.stem(w)
# # #             freq[s] = freq.get(s, 0) + 1

# # #     summary_sentences = []

# # #     # process chunk by chunk
# # #     for i in range(0, len(sentences), chunk_size):
# # #         chunk = sentences[i:i + chunk_size]
# # #         scores = {}

# # #         for s in chunk:
# # #             score = 0
# # #             count = 0
# # #             for w in word_tokenize(s.lower()):
# # #                 if w.isalpha() and w not in stop:
# # #                     sw = stem.stem(w)
# # #                     if sw in freq:
# # #                         score += freq[sw]
# # #                         count += 1
# # #             if count > 0:
# # #                 scores[s] = score / count

# # #         top = sorted(scores, key=scores.get, reverse=True)[:sentences_per_chunk]
# # #         top = sorted(top, key=lambda s: chunk.index(s))
# # #         summary_sentences.extend(top)

# # #     summary = " ".join(summary_sentences)
# # #     summary = re.sub(r"\s+", " ", summary).strip()

# # #     return summary

# # # def summarize(text, chunk_size=6, sentences_per_chunk=1):
# # #     # ---------- CLEANING ----------
# # #     # Remove URLs
# # #     text = re.sub(r"http\S+|www\.\S+", "", text)

# # #     # Remove citation brackets [1], [2], etc.
# # #     text = re.sub(r"\[\s*\d+\s*\]", "", text)

# # #     # Remove numeric-heavy lines (charts, tables)
# # #     lines = []
# # #     for line in text.split("\n"):
# # #         digit_ratio = sum(c.isdigit() for c in line) / max(len(line), 1)
# # #         if digit_ratio < 0.3:
# # #             lines.append(line)
# # #     text = " ".join(lines)

# # #     # Normalize spacing
# # #     text = re.sub(r"\s+", " ", text).strip()

# # #     sentences = sent_tokenize(text)

# # #     stop = set(stopwords.words("english"))
# # #     stem = SnowballStemmer("english")

# # #     # ---------- GLOBAL WORD FREQUENCY ----------
# # #     freq = {}
# # #     for w in word_tokenize(text.lower()):
# # #         if w.isalpha() and w not in stop:
# # #             sw = stem.stem(w)
# # #             freq[sw] = freq.get(sw, 0) + 1

# # #     summary = []
# # #     seen = set()

# # #     # ---------- CHUNK-BASED SELECTION ----------
# # #     for i in range(0, len(sentences), chunk_size):
# # #         chunk = sentences[i:i + chunk_size]
# # #         scores = {}

# # #         for s in chunk:
# # #             words = word_tokenize(s.lower())
# # #             content_words = [
# # #                 stem.stem(w) for w in words
# # #                 if w.isalpha() and w not in stop
# # #             ]

# # #             if len(content_words) < 5:
# # #                 continue  # skip labels / headings

# # #             score = sum(freq.get(w, 0) for w in content_words)
# # #             score /= len(content_words)  # normalize

# # #             scores[s] = score

# # #         if not scores:
# # #             continue

# # #         best = sorted(scores, key=scores.get, reverse=True)[:sentences_per_chunk]

# # #         for s in best:
# # #             key = s.lower()
# # #             if key not in seen:
# # #                 seen.add(key)
# # #                 summary.append(s)

# # #     # ---------- FINAL FORMATTING ----------
# # #     result = " ".join(summary)
# # #     result = re.sub(r"\s+", " ", result)
# # #     result = re.sub(r"\s([.,!?])", r"\1", result)

# # #     return result.strip()


# # def summarize(text, chunk_size=7):
# #     # ---------- CLEAN ----------
# #     # Remove URLs and URL fragments
# #     text = re.sub(r"http\S+|www\.\S+|\S+\.html", "", text)

# #     # Remove citation brackets
# #     text = re.sub(r"\[\s*\d+\s*\]", "", text)

# #     # Remove spaced OCR garbage like "n o n n"
# #     text = re.sub(r"\b(?:[a-zA-Z]\s+){3,}[a-zA-Z]\b", "", text)

# #     # Remove numeric-heavy lines (charts)
# #     lines = []
# #     for line in text.split("\n"):
# #         if sum(c.isdigit() for c in line) / max(len(line), 1) < 0.25:
# #             lines.append(line)
# #     text = " ".join(lines)

# #     text = re.sub(r"\s+", " ", text).strip()

# #     sentences = sent_tokenize(text)

# #     stop = set(stopwords.words("english"))
# #     stem = SnowballStemmer("english")

# #     # ---------- WORD FREQUENCY ----------
# #     freq = {}
# #     for w in word_tokenize(text.lower()):
# #         if w.isalpha() and w not in stop:
# #             sw = stem.stem(w)
# #             freq[sw] = freq.get(sw, 0) + 1

# #     summary = []
# #     seen = set()

# #     # ---------- CHUNK-BASED SCORING ----------
# #     for i in range(0, len(sentences), chunk_size):
# #         chunk = sentences[i:i + chunk_size]
# #         scores = {}

# #         for s in chunk:
# #             words = word_tokenize(s)
# #             content = [
# #                 stem.stem(w.lower())
# #                 for w in words
# #                 if w.isalpha() and w.lower() not in stop
# #             ]

# #             # Skip headings / labels
# #             if len(content) < 6:
# #                 continue

# #             score = sum(freq.get(w, 0) for w in content) / len(content)
# #             scores[s] = score

# #         if not scores:
# #             continue

# #         best = max(scores, key=scores.get)
# #         key = best.lower()

# #         if key not in seen:
# #             seen.add(key)
# #             summary.append(best)

# #     # ---------- FORMAT ----------
# #     result = " ".join(summary)
# #     result = re.sub(r"\s([.,!?])", r"\1", result)
# #     return result.strip()


# # def main():
# #     try:
# #         file_path = sys.argv[1]
# #         text = extract_text_pdf(file_path)
# #         if not text.strip():
# #             text = extract_text_ocr(file_path)

# #         summary = summarize(text)
# #         print(json.dumps({"summary": summary}), flush=True)
# #     except Exception as e:
# #         print(json.dumps({"summary": "Error", "error": str(e)}), flush=True)

# # if __name__ == "__main__":
# #     main()



# import sys
# import json
# import re
# import logging
# import math
# from pathlib import Path
# from typing import Optional

# import pytesseract
# import slate3k as slate
# from pdf2image import convert_from_path
# from nltk.corpus import stopwords
# from nltk.tokenize import word_tokenize, sent_tokenize
# from nltk.stem.snowball import SnowballStemmer

# logging.getLogger("pdfminer").setLevel(logging.ERROR)

# # ─── CONFIGURATION ────────────────────────────────────────────────────
# POPPLER_PATH = r"C:\poppler-25.12.0\Library\bin"
# MIN_SENTENCE_WORDS = 6
# MAX_SENTENCE_WORDS = 60
# SUMMARY_RATIO = 0.25          # target: ~25% of original sentence count
# MIN_SUMMARY_SENTENCES = 3
# MAX_SUMMARY_SENTENCES = 40
# CHUNK_SIZE = 7
# SENTENCES_PER_CHUNK = 1

# STOP = set(stopwords.words("english"))
# STEMMER = SnowballStemmer("english")


# # ─── TEXT EXTRACTION ──────────────────────────────────────────────────
# def extract_text_pdf(path: str) -> str:
#     """Extract text from a text-based PDF using slate3k (pdfminer)."""
#     try:
#         with open(path, "rb") as f:
#             pages = slate.PDF(f)
#             return " ".join(pages)
#     except Exception:
#         return ""


# def extract_text_ocr(path: str) -> str:
#     """Fallback: extract text from scanned PDF using Tesseract OCR."""
#     try:
#         pages = convert_from_path(path, poppler_path=POPPLER_PATH)
#         texts = [pytesseract.image_to_string(page) for page in pages]
#         return " ".join(texts)
#     except Exception:
#         return ""


# def extract_text(path: str) -> str:
#     """Try text extraction first, fall back to OCR if needed."""
#     text = extract_text_pdf(path)
#     if len(text.strip()) < 50:  # more robust than checking empty
#         text = extract_text_ocr(path)
#     return text


# # ─── TEXT CLEANING ────────────────────────────────────────────────────
# def clean_text(text: str) -> str:
#     """Remove noise, artifacts, and normalize whitespace."""

#     # Remove URLs
#     text = re.sub(r"https?://\S+|www\.\S+|\S+\.html?\b", "", text)

#     # Remove email addresses
#     text = re.sub(r"\S+@\S+\.\S+", "", text)

#     # Remove citation brackets: [1], [2,3], [1-5]
#     text = re.sub(r"\[\s*\d+(?:\s*[,\-–]\s*\d+)*\s*\]", "", text)

#     # Remove figure/table references that aren't real sentences
#     text = re.sub(
#         r"(?i)(figure|fig|table|chart)\s*\.?\s*\d+\s*[:.]?",
#         "",
#         text,
#     )

#     # Remove OCR spaced-out garbage like "n o n n a m e"
#     text = re.sub(r"\b(?:[a-zA-Z]\s+){3,}[a-zA-Z]\b", "", text)

#     # Remove lines that are mostly numbers (data tables)
#     cleaned_lines = []
#     for line in text.split("\n"):
#         if len(line.strip()) == 0:
#             continue
#         digit_ratio = sum(c.isdigit() for c in line) / max(len(line), 1)
#         alpha_ratio = sum(c.isalpha() for c in line) / max(len(line), 1)
#         if digit_ratio < 0.25 and alpha_ratio > 0.4:
#             cleaned_lines.append(line.strip())

#     text = " ".join(cleaned_lines)

#     # Remove excessive whitespace
#     text = re.sub(r"\s+", " ", text).strip()

#     return text


# # ─── SENTENCE FILTERING ──────────────────────────────────────────────
# def is_valid_sentence(sentence: str) -> bool:
#     """Filter out headings, fragments, and malformed sentences."""
#     words = word_tokenize(sentence)
#     alpha_words = [w for w in words if w.isalpha()]

#     # Too short or too long
#     if not (MIN_SENTENCE_WORDS <= len(alpha_words) <= MAX_SENTENCE_WORDS):
#         return False

#     # All caps → likely a heading
#     if sentence.isupper():
#         return False

#     # Starts with a bullet/number marker only (e.g., "1.", "•", "a)")
#     if re.match(r"^\s*(\d+[\.\):]|[•\-–—]|[a-zA-Z][\.\)])\s*$", sentence):
#         return False

#     # Too many special characters relative to alpha
#     special = sum(not c.isalnum() and not c.isspace() for c in sentence)
#     if special / max(len(sentence), 1) > 0.3:
#         return False

#     return True


# # ─── SCORING ──────────────────────────────────────────────────────────
# def build_word_frequencies(text: str) -> dict:
#     """Build normalized word frequency map from the full document."""
#     freq = {}
#     for w in word_tokenize(text.lower()):
#         if w.isalpha() and w not in STOP and len(w) > 2:
#             sw = STEMMER.stem(w)
#             freq[sw] = freq.get(sw, 0) + 1

#     # Normalize by max frequency to prevent bias toward very long docs
#     if freq:
#         max_freq = max(freq.values())
#         freq = {k: v / max_freq for k, v in freq.items()}

#     return freq


# def score_sentence(sentence: str, freq: dict, position_in_doc: float) -> float:
#     """
#     Score a sentence using multiple signals:
#     - Word frequency (TF-based relevance)
#     - Sentence position (intro/conclusion bias)
#     - Sentence length preference (medium-length sentences)
#     """
#     words = word_tokenize(sentence.lower())
#     content_words = [
#         STEMMER.stem(w) for w in words
#         if w.isalpha() and w not in STOP and len(w) > 2
#     ]

#     if len(content_words) < 4:
#         return 0.0

#     # ── Frequency score (normalized) ──
#     freq_score = sum(freq.get(w, 0) for w in content_words) / len(content_words)

#     # ── Position score ──
#     # Sentences near the beginning or end of the document score higher
#     # This reflects how most documents are structured
#     if position_in_doc < 0.1:
#         position_score = 1.2   # strong intro bias
#     elif position_in_doc < 0.2:
#         position_score = 1.1
#     elif position_in_doc > 0.85:
#         position_score = 1.15  # conclusion bias
#     else:
#         position_score = 1.0

#     # ── Length score ──
#     # Prefer medium-length sentences (not too short, not too long)
#     ideal_length = 20
#     length_penalty = 1.0 - 0.3 * abs(len(words) - ideal_length) / ideal_length
#     length_penalty = max(length_penalty, 0.5)

#     # ── Combine ──
#     final_score = freq_score * position_score * length_penalty

#     return final_score


# # ─── SUMMARIZATION ────────────────────────────────────────────────────
# def summarize(
#     text: str,
#     chunk_size: int = CHUNK_SIZE,
#     summary_ratio: float = SUMMARY_RATIO,
# ) -> str:
#     """
#     Extractive summarizer using chunk-based sentence scoring.

#     Strategy:
#     1. Clean and tokenize text into sentences
#     2. Filter out invalid/noisy sentences
#     3. Build word frequency map
#     4. Score sentences in chunks (preserves coverage across document)
#     5. Select top sentence(s) per chunk
#     6. Return ordered summary
#     """

#     text = clean_text(text)

#     if len(text) < 100:
#         return "The document contains too little text to summarize."

#     all_sentences = sent_tokenize(text)
#     total = len(all_sentences)

#     # Filter valid sentences while preserving original indices
#     indexed_sentences = [
#         (i, s) for i, s in enumerate(all_sentences)
#         if is_valid_sentence(s)
#     ]

#     if len(indexed_sentences) < 3:
#         return "Not enough readable content to generate a summary."

#     freq = build_word_frequencies(text)

#     # Determine how many summary sentences to aim for
#     target_count = max(
#         MIN_SUMMARY_SENTENCES,
#         min(MAX_SUMMARY_SENTENCES, int(len(indexed_sentences) * summary_ratio)),
#     )

#     # Adaptive chunk size based on document length and target
#     adaptive_chunk = max(3, len(indexed_sentences) // target_count)

#     # ── Score all valid sentences ──
#     scored = []
#     for orig_idx, sentence in indexed_sentences:
#         position = orig_idx / max(total, 1)
#         score = score_sentence(sentence, freq, position)
#         scored.append((orig_idx, sentence, score))

#     # ── Chunk-based selection ──
#     selected = []
#     seen = set()

#     for i in range(0, len(scored), adaptive_chunk):
#         chunk = scored[i : i + adaptive_chunk]

#         # Sort by score descending, pick top N
#         chunk_sorted = sorted(chunk, key=lambda x: x[2], reverse=True)
#         picks = chunk_sorted[:SENTENCES_PER_CHUNK]

#         for orig_idx, sentence, score in picks:
#             normalized = sentence.strip().lower()
#             if normalized not in seen and score > 0:
#                 seen.add(normalized)
#                 selected.append((orig_idx, sentence))

#     # ── Order by original document position ──
#     selected.sort(key=lambda x: x[0])

#     # ── Format output ──
#     summary = " ".join(s for _, s in selected)
#     summary = re.sub(r"\s+", " ", summary)
#     summary = re.sub(r"\s([.,!?;:])", r"\1", summary)

#     if not summary.strip():
#         return "No meaningful summary could be generated."

#     return summary.strip()


# # ─── ENTRY POINT ──────────────────────────────────────────────────────
# def main():
#     if len(sys.argv) < 2:
#         print(
#             json.dumps({
#                 "summary": "Error",
#                 "error": "No file path provided",
#             }),
#             flush=True,
#         )
#         sys.exit(1)

#     file_path = sys.argv[1]

#     if not Path(file_path).is_file():
#         print(
#             json.dumps({
#                 "summary": "Error",
#                 "error": f"File not found: {file_path}",
#             }),
#             flush=True,
#         )
#         sys.exit(1)

#     try:
#         text = extract_text(file_path)

#         if not text or len(text.strip()) < 50:
#             print(
#                 json.dumps({
#                     "summary": "Could not extract readable text from this PDF.",
#                 }),
#                 flush=True,
#             )
#             sys.exit(0)

#         summary = summarize(text)

#         # Include metadata for the frontend
#         word_count_original = len(text.split())
#         word_count_summary = len(summary.split())

#         print(
#             json.dumps({
#                 "summary": summary,
#                 "stats": {
#                     "original_words": word_count_original,
#                     "summary_words": word_count_summary,
#                     "compression_ratio": round(
#                         word_count_summary / max(word_count_original, 1), 3
#                     ),
#                 },
#             }),
#             flush=True,
#         )

#     except Exception as e:
#         print(
#             json.dumps({
#                 "summary": "Error processing the PDF.",
#                 "error": str(e),
#             }),
#             flush=True,
#         )
#         sys.exit(1)


# if __name__ == "__main__":
#     main()



import sys
import json
import re
import logging
from pathlib import Path

import pytesseract
import slate3k as slate
from pdf2image import convert_from_path
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.stem.snowball import SnowballStemmer

logging.getLogger("pdfminer").setLevel(logging.ERROR)

# ─── CONFIGURATION ────────────────────────────────────────────────────
POPPLER_PATH = r"C:\poppler-25.12.0\Library\bin"

MIN_SENTENCE_WORDS = 6
MAX_SENTENCE_WORDS = 60
CHUNK_SIZE = 7

STOP = set(stopwords.words("english"))
STEMMER = SnowballStemmer("english")

# 🔹 SUMMARY MODES (NEW)
SUMMARY_PROFILES = {
    "short": {
        "summary_ratio": 0.1,      # ~5–6 lines
        "sentences_per_chunk": 1,
        "min_sentences": 3,
        "max_sentences": 6,
    },
    "medium": {
        "summary_ratio": 0.25,     # 1–2 paragraphs
        "sentences_per_chunk": 1,
        "min_sentences": 6,
        "max_sentences": 15,
    },
    "detailed": {
        "summary_ratio": 0.45,     # section/coverage-wise
        "sentences_per_chunk": 2,
        "min_sentences": 12,
        "max_sentences": 40,
    },
}


# ─── TEXT EXTRACTION ──────────────────────────────────────────────────
def extract_text_pdf(path: str) -> str:
    try:
        with open(path, "rb") as f:
            return " ".join(slate.PDF(f))
    except Exception:
        return ""


def extract_text_ocr(path: str) -> str:
    try:
        pages = convert_from_path(path, poppler_path=POPPLER_PATH)
        return " ".join(pytesseract.image_to_string(p) for p in pages)
    except Exception:
        return ""


def extract_text(path: str) -> str:
    text = extract_text_pdf(path)
    if len(text.strip()) < 50:
        text = extract_text_ocr(path)
    return text


# ─── TEXT CLEANING ────────────────────────────────────────────────────
def clean_text(text: str) -> str:
    text = re.sub(r"https?://\S+|www\.\S+|\S+\.html?\b", "", text)
    text = re.sub(r"\S+@\S+\.\S+", "", text)
    text = re.sub(r"\[\s*\d+(?:\s*[,\-–]\s*\d+)*\s*\]", "", text)
    text = re.sub(r"(?i)(figure|fig|table|chart)\s*\.?\s*\d+\s*[:.]?", "", text)
    text = re.sub(r"\b(?:[a-zA-Z]\s+){3,}[a-zA-Z]\b", "", text)

    lines = []
    for line in text.split("\n"):
        if not line.strip():
            continue
        digit_ratio = sum(c.isdigit() for c in line) / max(len(line), 1)
        alpha_ratio = sum(c.isalpha() for c in line) / max(len(line), 1)
        if digit_ratio < 0.25 and alpha_ratio > 0.4:
            lines.append(line.strip())

    text = " ".join(lines)
    text = re.sub(r"\s+", " ", text).strip()
    return text


# ─── SENTENCE FILTERING ──────────────────────────────────────────────
def is_valid_sentence(sentence: str) -> bool:
    words = word_tokenize(sentence)
    alpha_words = [w for w in words if w.isalpha()]

    if not (MIN_SENTENCE_WORDS <= len(alpha_words) <= MAX_SENTENCE_WORDS):
        return False
    if sentence.isupper():
        return False
    if re.match(r"^\s*(\d+[\.\):]|[•\-–—]|[a-zA-Z][\.\)])\s*$", sentence):
        return False

    special = sum(not c.isalnum() and not c.isspace() for c in sentence)
    if special / max(len(sentence), 1) > 0.3:
        return False

    return True


# ─── SCORING ──────────────────────────────────────────────────────────
def build_word_frequencies(text: str) -> dict:
    freq = {}
    for w in word_tokenize(text.lower()):
        if w.isalpha() and w not in STOP and len(w) > 2:
            sw = STEMMER.stem(w)
            freq[sw] = freq.get(sw, 0) + 1

    if freq:
        max_freq = max(freq.values())
        freq = {k: v / max_freq for k, v in freq.items()}

    return freq


def score_sentence(sentence: str, freq: dict, position: float) -> float:
    words = word_tokenize(sentence.lower())
    content = [
        STEMMER.stem(w) for w in words
        if w.isalpha() and w not in STOP and len(w) > 2
    ]

    if len(content) < 4:
        return 0.0

    freq_score = sum(freq.get(w, 0) for w in content) / len(content)

    if position < 0.1:
        position_score = 1.2
    elif position < 0.2:
        position_score = 1.1
    elif position > 0.85:
        position_score = 1.15
    else:
        position_score = 1.0

    ideal_len = 20
    length_penalty = 1.0 - 0.3 * abs(len(words) - ideal_len) / ideal_len
    length_penalty = max(length_penalty, 0.5)

    return freq_score * position_score * length_penalty


# ─── SUMMARIZATION ────────────────────────────────────────────────────
def summarize(text: str, mode: str = "medium") -> str:
    profile = SUMMARY_PROFILES.get(mode, SUMMARY_PROFILES["medium"])

    summary_ratio = profile["summary_ratio"]
    sentences_per_chunk = profile["sentences_per_chunk"]
    min_sent = profile["min_sentences"]
    max_sent = profile["max_sentences"]

    text = clean_text(text)
    sentences = sent_tokenize(text)

    indexed = [
        (i, s) for i, s in enumerate(sentences)
        if is_valid_sentence(s)
    ]

    if len(indexed) < 3:
        return "Not enough readable content to generate a summary."

    freq = build_word_frequencies(text)

    target = max(
        min_sent,
        min(max_sent, int(len(indexed) * summary_ratio))
    )

    adaptive_chunk = max(3, len(indexed) // target)

    scored = []
    total = len(sentences)

    for idx, sent in indexed:
        pos = idx / max(total, 1)
        score = score_sentence(sent, freq, pos)
        scored.append((idx, sent, score))

    selected = []
    seen = set()

    for i in range(0, len(scored), adaptive_chunk):
        chunk = scored[i:i + adaptive_chunk]
        chunk = sorted(chunk, key=lambda x: x[2], reverse=True)
        picks = chunk[:sentences_per_chunk]

        for idx, sent, score in picks:
            key = sent.lower().strip()
            if score > 0 and key not in seen:
                seen.add(key)
                selected.append((idx, sent))

    selected.sort(key=lambda x: x[0])

    summary = " ".join(s for _, s in selected)
    summary = re.sub(r"\s+", " ", summary)
    summary = re.sub(r"\s([.,!?;:])", r"\1", summary)

    return summary.strip()


# ─── ENTRY POINT ──────────────────────────────────────────────────────
def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No file path provided"}), flush=True)
        sys.exit(1)

    file_path = sys.argv[1]
    mode = sys.argv[2] if len(sys.argv) > 2 else "medium"

    if not Path(file_path).is_file():
        print(json.dumps({"error": "File not found"}), flush=True)
        sys.exit(1)

    text = extract_text(file_path)
    if not text.strip():
        print(json.dumps({"error": "Could not extract text"}), flush=True)
        sys.exit(1)

    summary = summarize(text, mode)

    print(json.dumps({
        "summary_type": mode,
        "summary": summary,
        "stats": {
            "original_words": len(text.split()),
            "summary_words": len(summary.split())
        }
    }), flush=True)


if __name__ == "__main__":
    main()
