# NY Times Article Search

A web application that combines the New York Times Article Search API with real-time weather data to create an interactive news searching experience.

## Video Demo
https://iiithydstudents-my.sharepoint.com/:v:/g/personal/virat_garg_students_iiit_ac_in/EbAcG_drsilFuBa2aYUbN8gBk4VQZUssRK0414FgGuc2dg?e=JQrcTf&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D

## Features

### Article Search
- Search articles from the NY Times archive
- Filter by date range 
- Sort results by newest, oldest, or relevance
- View article snippets, headlines, and thumbnails
- Pagination support for browsing multiple results
- Click-through links to full articles

### Weather Integration
- Real-time local temperature display
- Current humidity levels
- Automatic updates every minute
- City-based weather lookup
- Fahrenheit to Celsius conversion

## Technologies Used

### APIs
- New York Times Article Search API
- Visual Crossing Weather API

### Frontend
- HTML5 & CSS3
- Vanilla JavaScript
- Custom SVG icons
- Responsive design with flexbox

### Notable Components
- Custom loader animation
- Dynamic content generation
- Error handling
- Date formatting
- Async/await API calls

## Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/nytimes-weather-search.git
```

2. Insert your API keys in script.js:
```javascript
const key = "YOUR_NYTIMES_API_KEY";
const weatherKey = "YOUR_VISUALCROSSING_API_KEY";
```

3. Open index.html in a web browser or serve with a local server

## Usage

1. Enter your city when prompted for local weather
2. Type a search term in the search box
3. Optionally set date range and sort preferences
4. Click submit to view article results
5. Use next/previous buttons to navigate pages
6. Click article headlines to read full stories

## Demo Video

[Add link to your demo video here]

## API Documentation

- [NY Times Article Search API](https://developer.nytimes.com/docs/articlesearch-product/1/overview)
- [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api)

## License

[Add your chosen license]

## Project Structure

```
├── index.html         # Main HTML file
├── style.css         # Styles and animations
├── script.js         # Core application logic
└── assets/          # Images and SVGs
    ├── Asset_1.png
    ├── bg.png
    ├── humidity.svg
    ├── next.svg
    ├── prev.svg
    └── temp.svg
```