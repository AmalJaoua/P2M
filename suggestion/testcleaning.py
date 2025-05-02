from datacleaning import clean_movie_dataset
import pandas as pd
from featureExtraction import extract_genre_features, extract_language_features, extract_crew_features
import seaborn as sns
import matplotlib.pyplot as plt

# STEP 1: Define your dataset path
data_path = r"C:\Users\amalj\Desktop\SupCom\INDP2\Projets\P2M\Movie DataSet\Data"

# STEP 2: Clean the dataset
clean_df = clean_movie_dataset(data_path)

# STEP 3: Print shape and column info
print("\n Cleaned DataFrame shape:", clean_df.shape)
print("\n Columns and non-null counts:")
print(clean_df.info())

# STEP 4: Preview sample rows
print("\n Sample cleaned rows:")
print(clean_df.sample(5).to_string(index=False))

# STEP 5: Preview sample lists and cleaned values
print("\n Sample genres, languages, and stars:")
print(clean_df[["title", "genres", "languages", "stars"]].sample(3).to_string(index=False))

# Apply feature extraction
df_cleaned = extract_genre_features(clean_df)
df_cleaned = extract_language_features(clean_df)
df_cleaned = extract_crew_features(clean_df)

#  missing values
missing_values = df_cleaned.isna().sum()
print("\n Missing values in columns:")
print(missing_values[missing_values > 0])

# STEP 7: Outlier Detection 
print(df_cleaned.get('grossworldwide', 'Column not found'))
Q1 = df_cleaned['grossworldwide'].quantile(0.25)
Q3 = df_cleaned['grossworldwide'].quantile(0.75)
IQR = Q3 - Q1
outliers = df_cleaned[(df_cleaned['grossworldwide'] < (Q1 - 1.5 * IQR)) | (df_cleaned['grossworldwide'] > (Q3 + 1.5 * IQR))]
print("\nDetected Outliers in 'grossworldwide':")
print(outliers)

# More Outliers but Visualization version
sns.boxplot(x=df_cleaned['grossworldwide'])
plt.title('Boxplot for Gross Worldwide Earnings')
plt.show()

sns.boxplot(x=df_cleaned['rating'])
plt.title('Boxplot for Ratings')
plt.show()


