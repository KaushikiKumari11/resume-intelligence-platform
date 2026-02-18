from sklearn.feature_extraction.text import TfidfVectorizer

vectorizer = TfidfVectorizer(stop_words="english")

def vectorize_jds(jd_texts):
    return vectorizer.fit_transform(jd_texts)