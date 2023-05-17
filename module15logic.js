import json
import folium
import requests

# Get earthquake data
url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
response = requests.get(url)
data = response.json()

earthquakes = data['features']
magnitudes = []
longitudes = []
latitudes = []

for earthquake in earthquakes:
    magnitude = earthquake['properties']['mag']
    longitude = earthquake['geometry']['coordinates'][0]
    latitude = earthquake['geometry']['coordinates'][1]
    magnitudes.append(magnitude)
    longitudes.append(longitude)
    latitudes.append(latitude)

# Create dictionary to hold the data
output_data = {
    'magnitudes': magnitudes,
    'longitudes': longitudes,
    'latitudes': latitudes
}

# Save the data to a JSON file
with open('earthquake_data.json', 'w') as json_file:
    json.dump(output_data, json_file)

# Get earthquake data
url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
response = requests.get(url)
data = response.json()
earthquakes = data['features']

# Create a map centered at (0, 0)
map_center = [0, 0]
zoom_level = 2
map_osm = folium.Map(location=map_center, zoom_start=zoom_level)

# Define marker colors based on depth
def get_marker_color(depth):
    if depth < 10:
        return 'green'
    elif depth < 50:
        return 'orange'
    else:
        return 'red'

# Add markers for each earthquake
for earthquake in earthquakes:
    magnitude = earthquake['properties']['mag']
    depth = earthquake['geometry']['coordinates'][2]
    latitude = earthquake['geometry']['coordinates'][1]
    longitude = earthquake['geometry']['coordinates'][0]
    marker_color = get_marker_color(depth)
    
    popup_text = f"Magnitude: {magnitude}<br>Depth: {depth} km"
    marker = folium.CircleMarker(
        location=[latitude, longitude],
        radius=magnitude * 3,
        color=marker_color,
        fill=True,
        fill_color=marker_color,
        fill_opacity=0.7,
        popup=popup_text
    )
    marker.add_to(map_osm)

# Add legend
legend_html = '''
    <div style="position: fixed; bottom: 50px; left: 50px; z-index:9999; font-size: 14px;">
    <p><strong>Legend:</strong></p>
    <p><span style="background:green; padding: 3px 6px;"></span> Depth < 10 km</p>
    <p><span style="background:orange; padding: 3px 6px;"></span> Depth 10-50 km</p>
    <p><span style="background:red; padding: 3px 6px;"></span> Depth > 50 km</p>
    </div>
    '''
map_osm.get_root().html.add_child(folium.Element(legend_html))

# Save the map to an HTML file
map_osm.save('earthquake_map.html')