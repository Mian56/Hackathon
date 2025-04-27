import pandas as pd
from geopy.distance import geodesic
from geopy.geocoders import Nominatim
import json
import os
import time  # Add delay to respect geocoding rate limits

# --- Load JSON files ---
crime_df = pd.read_json('analysis/incident_reports.json')
pings_df = pd.read_json('analysis/phone_pings.json')
suspects_df = pd.read_json('analysis/suspects.json')


# --- Convert time fields ---
crime_df['entry_time'] = pd.to_datetime(crime_df['entry_time'])
crime_df['exit_time'] = pd.to_datetime(crime_df['exit_time'])
pings_df['timestamp'] = pd.to_datetime(pings_df['timestamp'])

# --- Geocode the crime scene addresses ---
geolocator = Nominatim(user_agent="crime_analysis")

def geocode_address(address):
    try:
        location = geolocator.geocode(address)
        if location:
            return pd.Series([location.latitude, location.longitude])
    except Exception as e:
        print(f"Error geocoding {address}: {e}")
    return pd.Series([None, None])

crime_df[['lat', 'lon']] = crime_df['address'].apply(geocode_address)
print("Geocoding complete!")

# --- Filter suspects of interest (Ruth, Kevin, Jamal) ---
suspects_of_interest = suspects_df[suspects_df['name'].isin(['Ruth Chen', 'Kevin Ortega', 'Jamal Reyes'])]

# --- Analysis ---
results = []

for _, crime in crime_df.iterrows():
    print(f"\nAnalyzing crime scene at {crime['address']} ({crime['entry_time']} - {crime['exit_time']})")

    for _, ping in pings_df.iterrows():
        suspect = suspects_of_interest[suspects_of_interest['phone_id'] == ping['device_id']]
        if suspect.empty:
            continue

        # Debug ping info
        print(f"Checking ping from {suspect.iloc[0]['name']} at {ping['timestamp']}")

        if crime['entry_time'] <= ping['timestamp'] <= crime['exit_time']:
            distance = geodesic((crime['lat'], crime['lon']), (ping['lat'], ping['lon'])).meters
            print(f"  Time matches! Distance: {distance:.2f} meters")

            if distance <= 1200:
                print(f"  🚨 ADDING TO RESULTS: {suspect.iloc[0]['name']} near {crime['address']} at {distance:.2f} meters")

                print(f"  → Match found! {suspect.iloc[0]['name']} was within {distance:.2f} meters.")
                results.append({
                    'suspect': suspect.iloc[0]['name'],
                    'crime_scene': crime['address'],
                    'distance_meters': round(distance, 2),
                    'ping_time': ping['timestamp'].strftime('%Y-%m-%d %H:%M:%S')
                })


# After building results
print(f"Results to write: {results}")
# --- Output results to JSON ---
output_path = os.path.join(os.path.dirname(__file__), 'analysis_results.json')
with open(output_path, 'w') as f:
    json.dump(results, f, indent=4)

print("Analysis complete! Results saved to analysis_results.json.")
