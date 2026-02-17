import re

ROLE_KEYWORDS = [
    "intern", "junior", "associate", "engineer",
    "developer", "analyst", "senior", "lead", "manager"
]


def extract_roles(text):
    text = text.lower()
    roles_found = []

    for role in ROLE_KEYWORDS:
        if role in text:
            roles_found.append(role)

    return list(set(roles_found))


def extract_experience_years(text):
    """
    Extract experience in years from patterns like:
    - 2 years
    - 18 months
    """
    years = 0.0

    year_matches = re.findall(r'(\d+(?:\.\d+)?)\s+years?', text)
    month_matches = re.findall(r'(\d+(?:\.\d+)?)\s+months?', text)

    for y in year_matches:
        years += float(y)

    for m in month_matches:
        years += float(m) / 12

    return round(years, 2)