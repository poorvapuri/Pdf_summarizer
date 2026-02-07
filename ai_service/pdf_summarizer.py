# #!/usr/bin/env python3

# import sys
# import json
# import os
# import re
# import nltk
# import pytesseract
# import slate3k as slate
# from pdf2image import convert_from_path
# from nltk.corpus import stopwords
# from nltk.tokenize import word_tokenize, sent_tokenize
# from nltk.stem.snowball import SnowballStemmer
# from PIL import Image

# # Download once (cached after first run)
# nltk.download("stopwords", quiet=True)
# nltk.download("punkt", quiet=True)


# POPPLER_PATH = r"C:\poppler-25.12.0\Library\bin"

# import logging
# logging.getLogger("pdfminer").setLevel(logging.ERROR)


# def extract_text_pdf(file_path):
#     with open(file_path, "rb") as f:
#         pages = slate.PDF(f)

#     text = ""
#     for page in pages:
#         text += page

#     return text


# # def extract_text_ocr(file_path):
# #     pages = convert_from_path(file_path, dpi=300)
# #     text = ""

# #     for page in pages:
# #         text += pytesseract.image_to_string(page)

# #     return text


# def extract_text_ocr(file_path):
#     pages = convert_from_path(
#         file_path,
#         dpi=300,
#         poppler_path=POPPLER_PATH
#     )

#     text = ""
#     for page in pages:
#         text += pytesseract.image_to_string(page)

#     return text


# def summarize(text):
#     processed_text = re.sub("’", "'", text)
#     processed_text = re.sub("[^a-zA-Z' ]+", " ", processed_text)

#     stop_words = set(stopwords.words("english"))
#     stemmer = SnowballStemmer("english", ignore_stopwords=True)

#     words = word_tokenize(processed_text.lower())
#     freq_table = {}

#     for word in words:
#         if word not in stop_words:
#             stem = stemmer.stem(word)
#             freq_table[stem] = freq_table.get(stem, 0) + 1

#     sentences = sent_tokenize(text)
#     sentence_scores = {}

#     for sentence in sentences:
#         for stem in freq_table:
#             if stem in sentence.lower():
#                 sentence_scores[sentence] = sentence_scores.get(sentence, 0) + freq_table[stem]

#     if not sentence_scores:
#         return ""

#     average = sum(sentence_scores.values()) / len(sentence_scores)

#     summary = [
#         s for s in sentences
#         if sentence_scores.get(s, 0) > 3.0 * average
#     ]

#     return " ".join(summary)


# # def main():
# #     data = json.loads(sys.stdin.read())

# #     file_path = data["file_path"]
# #     mode = data.get("mode", "text")  # "text" or "ocr"

# #     if mode == "ocr":
# #         text = extract_text_ocr(file_path)
# #     else:
# #         text = extract_text_pdf(file_path)

# #     summary = summarize(text)

# #     print(json.dumps({
# #         "summary": summary
# #     }))


# # if __name__ == "__main__":
# #     main()


# # def main():
# #     try:
# #         # data = json.loads(sys.stdin.read())
# #         raw_input = sys.stdin.read()

# #         if not raw_input.strip():
# #             print(json.dumps({
# #                 "summary": "No input received from Node.js"
# #             }), flush=True)
# #             sys.exit(0)

# #         data = json.loads(raw_input)

# #         file_path = data.get("file_path")
# #         mode = data.get("mode", "text")

# #         if not file_path:
# #             raise ValueError("No file path provided")

# #         if mode == "ocr":
# #             text = extract_text_ocr(file_path)
# #         else:
# #             text = extract_text_pdf(file_path)

# #         if not text or not text.strip():
# #             summary = "No readable text could be extracted from the PDF."
# #         else:
# #             summary = summarize(text)
# #             if not summary.strip():
# #                 summary = "Summary could not be generated for this document."

# #         print(json.dumps({
# #             "summary": summary
# #         }),flush=True)

# #     # except Exception as e:
# #     #     # 🔴 ALWAYS return valid JSON, even on error
# #     #     print(json.dumps({
# #     #         "summary": "Error occurred during PDF summarization.",
# #     #         "error": str(e)
# #     #     }))

# #     except Exception as e:
# #         import traceback
# #         traceback.print_exc(file=sys.stderr)

# #         print(json.dumps({
# #             "summary": "Error occurred during PDF summarization.",
# #             "error": str(e)
# #         }),flush=True)

# def main():
#     try:
#         if len(sys.argv) < 2:
#             print(json.dumps({
#                 "summary": "No file path provided"
#             }), flush=True)
#             return

#         file_path = sys.argv[1]
#         mode = sys.argv[2] if len(sys.argv) > 2 else "text"

#         if mode == "ocr":
#             text = extract_text_ocr(file_path)
#         else:
#             try:
#                 text = extract_text_pdf(file_path)
#             except Exception:
#                 text = ""

#             if not text or not text.strip():
#                 text = extract_text_ocr(file_path)

#         if not text or not text.strip():
#             summary = "No readable text could be extracted from the PDF."
#         else:
#             summary = summarize(text)
#             if not summary.strip():
#                 summary = "Summary could not be generated for this document."

#         print(json.dumps({
#             "summary": summary
#         }), flush=True)

#     except Exception as e:
#         import traceback
#         traceback.print_exc(file=sys.stderr)

#         print(json.dumps({
#             "summary": "Error occurred during PDF summarization.",
#             "error": str(e)
#         }), flush=True)


# if __name__ == "__main__":
#     main()


import sys, json, re, logging
import pytesseract
import slate3k as slate
from pdf2image import convert_from_path
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.stem.snowball import SnowballStemmer

logging.getLogger("pdfminer").setLevel(logging.ERROR)

POPPLER_PATH = r"C:\poppler-25.12.0\Library\bin"

def extract_text_pdf(path):
    with open(path, "rb") as f:
        return "".join(slate.PDF(f))

def extract_text_ocr(path):
    pages = convert_from_path(path, poppler_path=POPPLER_PATH)
    return "".join(pytesseract.image_to_string(p) for p in pages)

def summarize(text):
    words = word_tokenize(text.lower())
    stop = set(stopwords.words("english"))
    stem = SnowballStemmer("english")
    freq = {}

    for w in words:
        if w.isalpha() and w not in stop:
            s = stem.stem(w)
            freq[s] = freq.get(s, 0) + 1

    sentences = sent_tokenize(text)
    scores = {}

    for s in sentences:
        for k in freq:
            if k in s.lower():
                scores[s] = scores.get(s, 0) + freq[k]

    if not scores:
        return "No summary could be generated."

    avg = sum(scores.values()) / len(scores)
    return " ".join(s for s in sentences if scores.get(s, 0) > avg)

def main():
    try:
        file_path = sys.argv[1]
        text = extract_text_pdf(file_path)
        if not text.strip():
            text = extract_text_ocr(file_path)

        summary = summarize(text)
        print(json.dumps({"summary": summary}), flush=True)
    except Exception as e:
        print(json.dumps({"summary": "Error", "error": str(e)}), flush=True)

if __name__ == "__main__":
    main()
