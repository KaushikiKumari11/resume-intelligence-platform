def rank_jobs(jobs_with_scores, top_n=5):
    ranked = sorted(
        jobs_with_scores,
        key=lambda x: x["score"],
        reverse=True
    )
    return ranked[:top_n]