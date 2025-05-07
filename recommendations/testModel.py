import pandas as pd
import numpy as np
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
from sklearn.metrics.pairwise import cosine_similarity

# === Load and clean dataset ===
df = pd.read_csv("cleaned_movie_data.csv")

# Function to clean text
def clean_text(text):
    if pd.isna(text):
        return ''
    text = str(text).lower()
    text = re.sub(r'[^a-z0-9\s]', '', text)
    return text

# Clean description and other columns
df['description'] = df['description'].astype(str).apply(clean_text)

# Clean genres, directors, writers, stars
for col in ['genres', 'directors', 'writers', 'stars']:
    if col in df.columns:
        df[col] = df[col].apply(lambda x: ' '.join(eval(x)) if isinstance(x, str) else '')
    else:
        df[col] = ''

# Combine all text features into a single column
df['combined_text'] = (
    df['description'] + ' ' +
    df['genres'] + ' ' +
    df['directors'] + ' ' +
    df['writers'] + ' ' +
    df['stars']
)

# === TF-IDF vectorization ===
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(df['combined_text'])

# === Fit Nearest Neighbors model (fast and memory-efficient) ===
model = NearestNeighbors(metric='cosine', algorithm='brute')
model.fit(tfidf_matrix)

# === Helper function to clean and get index of a title ===
def clean_title(title):
    if pd.isna(title):
        return ''
    title = str(title).strip().lower()  # Convert to lowercase and strip spaces
    title = re.sub(r'[^a-z0-9\s]', '', title)  # Remove special characters
    return title

# Helper function to get index of the closest title using cosine similarity
def find_title_index(title):
    title = clean_title(title)  # Clean the input title
    if title == '':
        return None

    # Compute TF-IDF for the input title
    title_vector = tfidf.transform([title])

    # Calculate cosine similarity between the input title and all movie titles in the dataset
    similarities = cosine_similarity(title_vector, tfidf_matrix)
    
    # Get the index of the most similar movie (the closest match)
    closest_index = similarities.argmax()

    # Return the index of the closest title
    return closest_index

# === Recommendation function using Nearest Neighbors ===
def recommend_movies(input_titles, top_n=10):
    indices = [find_title_index(t) for t in input_titles]
    indices = [i for i in indices if i is not None]

    if not indices:
        print("None of the given titles were found.")
        return pd.DataFrame()

    input_vectors = tfidf_matrix[indices]
    distances, neighbors = model.kneighbors(input_vectors, n_neighbors=top_n + len(indices))
    
    # Flatten and filter out original input indices
    all_neighbors = set(neighbors.flatten()) - set(indices)
    top_indices = list(all_neighbors)[:top_n]

    return df.iloc[top_indices][['title', 'genres', 'description']]
import time

# Record the start time
start_time = time.time()
# === Example usage ===
print(recommend_movies(["Avengers"], top_n=5))
# Record the end time
end_time = time.time()

# Calculate the elapsed time
elapsed_time = end_time - start_time
print(f"Execution time: {elapsed_time} seconds")