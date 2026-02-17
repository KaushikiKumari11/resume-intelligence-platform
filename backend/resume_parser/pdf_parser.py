from pdfminer.high_level import extract_text

def parse_pdf(file_path):
    try:
        text = extract_text(file_path)
        return text
    except Exception as e:
        print("PDF parsing error:", e)
        return ""