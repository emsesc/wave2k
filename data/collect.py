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

# Create Spotify API client
sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id=spotify_client_id,
                                                                       client_secret=spotify_client_secret))

# Function to fetch playlists
def fetch_playlists(years):
    playlists = []
    for year in years:
        print(year)
        playlist_name = f"Top Hits of {year}"
        results = sp.search(q=playlist_name, type="playlist", limit=1)
        for playlist in results["playlists"]["items"]:
            playlists.append(playlist)
    return playlists

# Function to get track details and check lyrics
def get_track_details(playlist_id):
    results = sp.playlist_tracks(playlist_id)
    tracks = results["items"]

    track_details = []
    for track in tracks:
        song_name = track["track"]["name"]
        artist = ", ".join([artist["name"] for artist in track["track"]["artists"]])
        song_link = track["track"]["external_urls"]["spotify"]
        print(song_name)

        # Fetch and check lyrics
        lyrics = fetch_lyrics(song_name, artist)

        # Check if lyrics contain specified terms
        cd = False
        holla = False
        crunk = False

        if lyrics != None:
            if "CD" in lyrics:
                cd = True
                print("Found CD")
            if "holla" in lyrics:
                holla = True
                print("Found holla")
            if "crunk" in lyrics:
                crunk = True
                print("Found crunk")
        
        cd = "CD" in lyrics if lyrics else False
        holla = "holla" in lyrics.lower() if lyrics else False
        crunk = "crunk" in lyrics.lower() if lyrics else False

        track_details.append({
            "Song Name": song_name,
            "Song Link": song_link,
            "Artist": artist,
            "CD": cd,
            "holla": holla,
            "crunk": crunk
        })

    return track_details

# Function to fetch lyrics from Genius API
def fetch_lyrics(song_name, artist):
    try:
        song = genius.search_song(song_name, artist)
        return song.lyrics
    except:
        return None

# Main function
def main():
    # Define the years for which you want to fetch playlists
    years = range(2000, 2011)
    
    # Fetch playlists for the specified years
    playlists = fetch_playlists(years)

    # Write the track details to a CSV file
    with open("spotify_track_details.csv", "w", newline="") as csvfile:
        fieldnames = ["Song Name", "Song Link", "Artist", "CD", "holla", "crunk"]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()

        for playlist in playlists:
            track_details = get_track_details(playlist["id"])
            writer.writerows(track_details)

if __name__ == "__main__":
    main()