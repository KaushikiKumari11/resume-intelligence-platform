from pdf_parser import parse_pdf
from docx_parser import parse_docx
from text_cleaner import clean_text
from section_segmenter import extract_sections
import json

def parse_resume(file_path):
    if file_path.endswith(".pdf"):
        raw_text = parse_pdf(file_path)
    elif file_path.endswith(".docx"):
        raw_text = parse_docx(file_path)
    else:
        return {}

    cleaned_text = clean_text(raw_text)
    sections = extract_sections(cleaned_text)
    return sections


if __name__ == "__main__":
    resume_path = "Kaushiki_resume.pdf"  # keep exact name
    output = parse_resume(resume_path)

    print("\nRESUME OUTPUT \n")
    print(json.dumps(output, indent=4))
    print("\nfrom pdf_parser import parse_pdf")
from docx_parser import parse_docx
from text_cleaner import clean_text
from section_segmenter import extract_sections

def parse_resume(file_path):
    print("Parsing resume:", file_path)

    if file_path.endswith(".pdf"):
        raw_text = parse_pdf(file_path)
    elif file_path.endswith(".docx"):
        raw_text = parse_docx(file_path)
    else:
        print("Unsupported file format")
        return None

    print("\nRAW TEXT LENGTH:", len(raw_text))

    cleaned_text = clean_text(raw_text)
    print("CLEANED TEXT LENGTH:", len(cleaned_text))

    sections = extract_sections(cleaned_text)

    print("\nEXTRACTED SECTIONS:\n")

    print("Skills:\n", sections.get("skills", ""), "\n")
    print("Education:\n", sections.get("education", ""), "\n")
    print("Experience:\n", sections.get("experience", ""), "\n")

    return sections


if __name__ == "__main__":
    resume_path = "Kaushiki_resume.pdf"   # keep same file
    result = parse_resume(resume_path)

    print("\nFINAL OUTPUT:")
    print("Skills:\n", result.get("skills", ""), "\n")
    print("Education:\n", result.get("education", ""), "\n")
    print("Experience:\n", result.get("experience", ""), "\n")
    