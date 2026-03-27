from jd_main import process_jds
from resume_vectorizer import vectorize_resume
from similarity_calculator import calculate_similarity
from scorer import calculate_final_score
from ranker import rank_jobs

# SAMPLE resume data (from resume parser)
resume_text = "python sql excel data analysis"
resume_skills = ["python", "sql", "excel"]
resume_experience = 1
resume_role = "data analyst"


def skill_match_score(resume_skills, jd_skills):
    if not jd_skills:
        return 0
    match = len(set(resume_skills).intersection(set(jd_skills)))
    return match / len(resume_skills)


def experience_match_score(resume_exp, jd_exp_text):
    if not jd_exp_text:
        return 0.5
    if resume_exp <= 2:
        return 1
    return 0.5


def role_match_score(resume_role, jd_role):
    return 1 if resume_role in jd_role else 0


def main():
    jobs, jd_vectors = process_jds()

    # Get TF-IDF vectorizer from JD vectorizer
    from jd_vectorizer import vectorizer
    resume_vector = vectorize_resume(resume_text, vectorizer)

    similarities = calculate_similarity(resume_vector, jd_vectors)

    scored_jobs = []

    for job, sim in zip(jobs, similarities):
        skill_score = skill_match_score(resume_skills, job["skills"])
        exp_score = experience_match_score(resume_experience, job["experience"])
        role_score = role_match_score(resume_role, job["role"])

        final_score = calculate_final_score(
            skill_score,
            exp_score,
            role_score
        )

        scored_jobs.append({
            "job": job["job"],
            "score": round(final_score * 100, 2),
            "link": job["link"]
        })

    top_jobs = rank_jobs(scored_jobs)

    print("\nTOP JOB MATCHES:\n")
    for idx, job in enumerate(top_jobs, 1):
        print(f"{idx}. {job['job']} – {job['score']}%")
        print(f"   Link: {job['link']}\n")


if __name__ == "__main__":
    main()