from jd_loader import load_jd_dataset
from jd_cleaner import clean_jd_text
from jd_segmenter import segment_jd
from jd_vectorizer import vectorize_jds

def process_jds():
    jobs = load_jd_dataset("../../data/naukri_jobs.ldjson")

    cleaned_texts = []
    structured_jobs = []

    for job in jobs:
        jd_text = job.get("job_description", "")
        if not jd_text:
            continue

        cleaned = clean_jd_text(jd_text)
        segmented = segment_jd(cleaned)

        structured_jobs.append({
            "job": job.get("job_title", "Unknown"),
            "skills": segmented["skills"],
            "experience": segmented["experience"],
            "role": segmented["role"],
            "link": job.get("job_link", "")
        })

        cleaned_texts.append(cleaned)

    vectors = vectorize_jds(cleaned_texts)
    return structured_jobs, vectors


if __name__ == "__main__":
    jobs, vectors = process_jds()
    print("Processed", len(jobs), "job descriptions")