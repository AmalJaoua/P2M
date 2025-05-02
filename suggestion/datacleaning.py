import os
import pandas as pd
import numpy as np
import ast
import re
from sklearn.preprocessing import MinMaxScaler

# === STEP 1: Load and Merge All CSVs by Year ===

def load_and_merge_csvs(root_path):
    all_data = []
    for year_folder in sorted(os.listdir(root_path)):
        folder_path = os.path.join(root_path, year_folder)
        if os.path.isdir(folder_path):
            for file in os.listdir(folder_path):
                if file.endswith(".csv") and "merged_movies_data" in file:
                    df = pd.read_csv(os.path.join(folder_path, file))
                    df["Year"] = year_folder  # Add year as a new column
                    all_data.append(df)
    combined_df = pd.concat(all_data, ignore_index=True)
    print(f"Loaded and merged {len(all_data)} CSV files.")
    return combined_df

# === STEP 2: Drop Duplicates Based on Title + Year ===

def drop_duplicates(df):
    before = len(df)
    df = df.drop_duplicates(subset=["Title", "Year"])
    after = len(df)
    print(f"Dropped {before - after} duplicate rows.")
    return df

# === STEP 3: Clean Column Names (strip, lowercase, underscore) ===

def clean_column_names(df):
    df.columns = (
        df.columns.str.strip()
        .str.lower()
        .str.replace(" ", "_")
        .str.replace("-", "_")
    )
    df = df.rename(columns={
        "grossworldwwide": "grossworldwide"
    })
    print("Cleaned and standardized column names.")
    return df

# === STEP 4: Strip Whitespace from All String Columns ===

def strip_whitespace(df):
    for col in df.select_dtypes(include="object"):
        df[col] = df[col].astype(str).str.strip()
    print("Stripped leading/trailing spaces from text columns.")
    return df

# === STEP 5: Fix Column Types: Literal Eval on Lists ===

list_columns = [
    "genres", "directors", "writers", "stars", "languages",
    "countries_origin", "production_company", "filming_locations"
]

def safe_literal_eval(val):
    try:
        if pd.isna(val):
            return []
        result = ast.literal_eval(val)
        return result if isinstance(result, list) else [result]
    except:
        return []

def convert_stringified_lists(df):
    for col in list_columns:
        if col in df.columns:
            df[col] = df[col].apply(safe_literal_eval)
    print("Stringified lists converted to Python lists.")
    return df

# === STEP 6: Convert 'release_date' to datetime ===

def convert_dates(df):
    if 'release_date' in df.columns:
        df['release_date'] = pd.to_datetime(df['release_date'], errors='coerce')
        print("Converted 'release_date' to datetime format.")
    return df

# === STEP 7: Remove Rows Without Title or Year ===

def drop_missing_essentials(df):
    before = len(df)
    df = df.dropna(subset=["title", "year"])
    after = len(df)
    print(f"Removed {before - after} rows with missing title or year.")
    return df

# === STEP 8: Fix Placeholder Values (like 'None', '[]', '') ===

def fix_placeholders(df):
    placeholders = ["None", "none", "[]", "", "['None']", "['none']"]

    # Fix list-type columns
    for col in list_columns:
        if col in df.columns:
            df[col] = df[col].apply(lambda x: [] if str(x).strip() in placeholders else x)

    # Fix string-type columns
    string_columns = [
        "title", "description", "mpa", "movie_link", "budget",
        "opening_weekend_gross", "grossworldwwide", "gross_us_canada"
    ]
    for col in string_columns:
        if col in df.columns:
            df[col] = df[col].replace(placeholders, np.nan)

    print("Cleaned placeholder values in string and list columns.")
    return df

# === STEP 9A: Normalize Ratings and Meta Scores ===

def normalize_ratings(df):
    df['rating'] = pd.to_numeric(df.get('rating'), errors='coerce')
    df['méta_score'] = pd.to_numeric(df.get('méta_score'), errors='coerce')
    df['meta_score_norm'] = df['méta_score'] / 10.0
    df['has_rating'] = df['rating'].notna()
    df['has_meta_score'] = df['meta_score_norm'].notna()
    
    # === CLEAN grossworldwide field ===
    if 'grossworldwide' in df.columns:
        df['grossworldwide'] = df['grossworldwide'].astype(str).str.replace(r'[^0-9]', '', regex=True)
        df['grossworldwide'] = pd.to_numeric(df['grossworldwide'], errors='coerce')
        
        if df['grossworldwide'].notna().sum() == 0:
            print("Warning: 'grossworldwide' has no valid numeric values to normalize.")
            df['grossworldwide_norm'] = np.nan
        else:
            scaler = MinMaxScaler()
            df['grossworldwide_norm'] = scaler.fit_transform(df[['grossworldwide']])
            print("Ratings and Gross Worldwide cleaned and normalized.")
    else:
        print("Warning: 'grossworldwide' column not found.")
        df['grossworldwide_norm'] = np.nan

    return df

# === STEP 9B: Normalize List Text Fields (genres, crew, etc.) ===

def normalize_list_items(df, cols):
    for col in cols:
        if col in df.columns:
            df[col] = df[col].apply(lambda lst: [
                item.strip().lower() for item in lst if isinstance(item, str) and item.strip() != ""
            ])
    print("Normalized text in list columns (genres, cast, crew, etc.).")
    return df

# === STEP 10: Clean IMDb URLs and extract only the IMDb ID ===

def extract_imdb_id(url):
    try:
        match = re.search(r"(tt\d+)", str(url))
        return match.group(1) if match else np.nan
    except:
        return np.nan

def extract_imdb_ids(df):
    imdb_col = "movie_link" if "movie_link" in df.columns else "imdb_id"
    if imdb_col in df.columns:
        df["imdb_id_clean"] = df[imdb_col].apply(extract_imdb_id)
        print("Extracted IMDb IDs into 'imdb_id_clean'.")
    else:
        print("IMDb link column not found.")
    return df

# === MAIN FUNCTION ===

def clean_movie_dataset(root_path):
    df = load_and_merge_csvs(root_path)
    df = drop_duplicates(df)
    df = clean_column_names(df)
    df = strip_whitespace(df)
    df = convert_stringified_lists(df)
    df = convert_dates(df)
    df = drop_missing_essentials(df)
    df = fix_placeholders(df)
    df = normalize_ratings(df)
    df = normalize_list_items(df, list_columns)
    df = extract_imdb_ids(df)
    print("Dataset fully cleaned and ready for processing!")
    print(df.columns)
    return df

clean_movie_dataset( r"C:\Users\amalj\Desktop\SupCom\INDP2\Projets\P2M\Movie DataSet\Data")