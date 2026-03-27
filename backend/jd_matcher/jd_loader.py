import json

def load_jd_dataset(path):
    jobs = []
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            if line.strip():
                jobs.append(json.loads(line))
    return jobs