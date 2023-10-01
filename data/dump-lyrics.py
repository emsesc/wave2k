import requests
import csv
import spotipy
import os
from dotenv import load_dotenv
from spotipy.oauth2 import SpotifyClientCredentials
from lyricsgenius import Genius

load_dotenv()

# Spotify API credentials
spotify_client_id = os.environ.get('CLIENT_ID')
spotify_client_secret = os.environ.get('CLIENT_SECRET')

# Genius API credentials
genius = Genius(os.environ.get('GENIUS_API_TOKEN'))

# Set up Spotify client
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=spotify_client_id, client_secret=spotify_client_secret))

# Function to get track details and check lyrics
# Credit to ChatGPT
def get_track_details(playlist_id, year):
    results = sp.playlist_tracks(playlist_id)
    tracks = results["items"]

    lyrics_by_year = {}
    for track in tracks:
        song_name = track["track"]["name"]
        artist = ", ".join([artist["name"] for artist in track["track"]["artists"]])

        # Fetch and check lyrics
        lyrics = fetch_lyrics(song_name, artist)

        if lyrics:
            if year not in lyrics_by_year:
                lyrics_by_year[year] = []

            lyrics_by_year[year].append(f"{song_name} by {artist}\n\n{lyrics}\n\n{'='*50}\n\n")

    return lyrics_by_year

def fetch_lyrics(song_name, artist):
    try:
        song = genius.search_song(song_name, artist)
        return song.lyrics
    except:
        return None

# Function to save lyrics for each year to a single text file
# Credit to ChatGPT
def save_lyrics_to_file(lyrics_by_year):
    for year, lyrics_list in lyrics_by_year.items():
        year_directory = f"lyrics/{year}"
        os.makedirs(year_directory, exist_ok=True)

        file_path = os.path.join(year_directory, f"lyrics_{year}.txt")

        with open(file_path, "w", encoding="utf-8") as file:
            file.writelines(lyrics_list)

# Main function
def main():
    # Fetch playlists for the specified years
    # playlists = ['37i9dQZF1DX9Ol4tZWPH6V', '37i9dQZF1DX0P7PzzKwEKl', '37i9dQZF1DXaW8fzPh9b08', '37i9dQZF1DWTWdbR13PQYH', '37i9dQZF1DWWzQTBs5BHX9', '37i9dQZF1DX1vSJnMeoy3V', '37i9dQZF1DX3j9EYdzv2N9', '37i9dQZF1DWYuGZUE4XQXm', '37i9dQZF1DX4UkKv8ED8jp', '37i9dQZF1DXc6IFF23C9jj']
    playlists = ['37i9dQZF1DWUZv12GM5cFk']

    # Get and accumulate lyrics for each year
    lyrics_by_year = {}
    count = 0
    for playlist in playlists:
        year = str(2000 + count)
        year_lyrics = get_track_details(playlist, year)

        for year, lyrics_list in year_lyrics.items():
            if year not in lyrics_by_year:
                lyrics_by_year[year] = []

            lyrics_by_year[year].extend(lyrics_list)
        
        count += 1
        print(year)

    # Save accumulated lyrics to text files for each year
    save_lyrics_to_file(lyrics_by_year)

if __name__ == "__main__":
    main()
