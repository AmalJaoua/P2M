import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

# === STEP 1: Extract Binary Features for Genres ===
def extract_genre_features(df):
    if "genres" not in df.columns:
        return df

    all_genres = set(genre.strip().lower() for sublist in df["genres"] for genre in sublist if isinstance(sublist, list))
    for genre in all_genres:
        df[f"genre_{genre}"] = df["genres"].apply(lambda x: 1 if isinstance(x, list) and genre in [g.lower() for g in x] else 0)

    print("Extracted binary genre features.")
    return df

# === STEP 2: Extract Binary Features for Languages ===
def extract_language_features(df, top_k=5):
    if "languages" not in df.columns:
        return df

    all_languages = [lang.strip().lower() for sublist in df["languages"] for lang in sublist if isinstance(sublist, list)]
    top_languages = pd.Series(all_languages).value_counts().head(top_k).index.tolist()

    for lang in top_languages:
        df[f"lang_{lang}"] = df["languages"].apply(lambda x: 1 if isinstance(x, list) and lang in [l.lower() for l in x] else 0)

    print(f"Extracted binary features for top {top_k} languages.")
    return df

# === STEP 3: Extract Binary Features for Crew ( for now Directors , we could add writers later) ===
def extract_crew_features(df, crew_column="directors", top_k=5):
    if crew_column not in df.columns:
        return df

    all_people = [person.strip().lower() for sublist in df[crew_column] for person in sublist if isinstance(sublist, list)]
    top_people = pd.Series(all_people).value_counts().head(top_k).index.tolist()

    for person in top_people:
        df[f"{crew_column}_is_{person.replace(' ', '_')}"] = df[crew_column].apply(
            lambda x: 1 if isinstance(x, list) and person in [p.lower() for p in x] else 0
        )

    print(f"Extracted binary features for top {top_k} from '{crew_column}' column.")
    return df

# === STEP 4: TF-IDF Vectorization for Actors ===
def vectorize_actors_tfidf(df, column='stars', max_features=100):
    if column not in df.columns:
        return pd.DataFrame(index=df.index), None

    actor_strings = df[column].apply(lambda actors: " ".join(actors) if isinstance(actors, list) else "")
    vectorizer = TfidfVectorizer(
        max_features=max_features,
        token_pattern=r"(?u)\b\w[\w.]+\b"
    )
    tfidf_matrix = vectorizer.fit_transform(actor_strings)
    tfidf_df = pd.DataFrame(tfidf_matrix.toarray(), columns=[f"actor_tfidf_{a}" for a in vectorizer.get_feature_names_out()])
    tfidf_df.index = df.index
    print(f"TF-IDF vectorization complete for actors. Features: {len(tfidf_df.columns)}")
    return tfidf_df, vectorizer

# === STEP 6: Extract Binary Features for Countries of Origin ===
def extract_country_origin_features(df, top_k=5):
    if "countries_origin" not in df.columns:
        return df

    all_countries = [country.strip().lower() for sublist in df["countries_origin"] for country in sublist if isinstance(sublist, list)]
    top_countries = pd.Series(all_countries).value_counts().head(top_k).index.tolist()

    for country in top_countries:
        df[f"country_origin_{country}"] = df["countries_origin"].apply(
            lambda x: 1 if isinstance(x, list) and country in [c.lower() for c in x] else 0
        )

    print(f"Extracted binary features for top {top_k} countries of origin.")
    return df

# === STEP 7: Extract Binary Features for Filming Locations ===
def extract_filming_location_features(df, top_k=5):
    if "filming_locations" not in df.columns:
        return df

    all_locations = [location.strip().lower() for sublist in df["filming_locations"] for location in sublist if isinstance(sublist, list)]
    top_locations = pd.Series(all_locations).value_counts().head(top_k).index.tolist()

    for location in top_locations:
        df[f"filming_location_{location}"] = df["filming_locations"].apply(
            lambda x: 1 if isinstance(x, list) and location in [l.lower() for l in x] else 0
        )

    print(f"Extracted binary features for top {top_k} filming locations.")
    return df

# === STEP 8: Extract Binary Features for Production Company ===
def extract_production_company_features(df, top_k=5):
    if "production_company" not in df.columns:
        return df

    all_companies = [company.strip().lower() for sublist in df["production_company"] for company in sublist if isinstance(sublist, list)]
    top_companies = pd.Series(all_companies).value_counts().head(top_k).index.tolist()

    for company in top_companies:
        df[f"production_company_{company}"] = df["production_company"].apply(
            lambda x: 1 if isinstance(x, list) and company in [c.lower() for c in x] else 0
        )

    print(f"Extracted binary features for top {top_k} production companies.")
    return df

#Still didn't add the NLP description logic 

# === STEP 9: Combine All Feature Extraction Steps ===
def extract_all_features(df, actor_tfidf_max_features=100, top_k=5):
    df = extract_genre_features(df)
    df = extract_language_features(df, top_k=top_k)
    df = extract_crew_features(df, crew_column="directors", top_k=top_k)
    tfidf_actors_df, _ = vectorize_actors_tfidf(df, column="stars", max_features=actor_tfidf_max_features)
    df = pd.concat([df, tfidf_actors_df], axis=1)
    df = extract_country_origin_features(df, top_k=top_k)
    df = extract_filming_location_features(df, top_k=top_k)
    df = extract_production_company_features(df, top_k=top_k)

    print("Finished extracting all features.")
    return df
