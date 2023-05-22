# leaflet-challenge
This project is a web-based visualization of earthquakes using Leaflet.js and D3.js. It retrieves earthquake data from the USGS (United States Geological Survey) API and displays it on an interactive map. Each earthquake is represented by a circle marker with varying size and color based on its magnitude and depth.

Getting Started
To run the application, follow these steps:

Open the index.html file in a web browser.
The map will be displayed on the page, showing the locations of recent earthquakes.
Dependencies
The project relies on the following libraries:

Leaflet.js (v1.6.0): An open-source JavaScript library for interactive maps.
Leaflet CSS
Leaflet JS
D3.js (v5): A powerful JavaScript library for data visualization.
D3 JavaScript
Code Overview
The main functionality of the project is implemented in the static/js/logic.js file. Here is an overview of the code:

Data Loading:
The earthquake data is loaded using D3's d3.json function, fetching the GeoJSON file from the USGS API.

Map Creation:
The Leaflet map is created using the L.map function and set to the initial view coordinates.
A tile layer from OpenStreetMap is added to the map using the L.tileLayer function.

Visualization:
The color and radius of each circle marker representing an earthquake are determined based on its magnitude and depth.
For each earthquake feature in the data, a circle marker is created using L.circleMarker and added to the map.
A popup with information about each earthquake is bound to the marker using the bindPopup function.

Legend:
A legend is added to the bottom right of the map using the L.control function.
The legend displays color-coded ranges of depths and their corresponding labels.
CSS Styling
The project includes a custom CSS file (static/css/style.css) to define styles for the HTML elements used in the application.

Acknowledgments
This project was created as a demonstration of using Leaflet.js and D3.js for interactive data visualization. The earthquake data is sourced from the USGS API.
