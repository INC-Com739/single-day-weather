Objective
Learn how to fetch data in React using useEffect.
Practice displaying and updating state with real-time weather data.
Strengthen understanding of component lifecycle in a functional React component.

Part 1: Project Setup
Create a fresh project

npx react-webpack-codex single-day-weather && cd single-day-weather && code .
Clean the scaffold

Empty / delete starter CSS in style.css.
Remove default component code in App.jsx, index.jsx, and any sample components.
Part 2: Implement useEffect for Weather Data
Choose an API
For example, the OpenWeatherMap API.
Get an API key if required.
Install dotenv-webpack with: npm install dotenv-webpack --save-dev
Add the plugin to your webpack config in the plugins array like this: 
plugins:

Add the plugin to your webpack.config.js inside the plugins array:

plugins: [ new DotenvWebpackPlugin(), new HtmlWebpackPlugin({ template: "public/index.html" }), !prod && new ReactRefreshWebpackPlugin(),  ].filter(Boolean);
🔧 Make sure this goes inside the export default section where the rest of your config is defined.
Create a Component
Could be named Weather, WeatherApp, or something similar.
Inside, use:
useState for storing weather data and any potential errors.
useEffect to fetch the weather data when the component mounts or when a specific city name changes.
Part 3: Display the Weather
Render Basic Information
For instance, show the city name, temperature, weather description, and an icon (if desired).
Handle Loading & Errors
Consider showing a “Loading…” message or a simple indicator while fetching data.
Display a friendly message if the user enters an invalid city or if the fetch call fails.
Part 4: Test the App
Run Your App and open it in a browser.
Verify the weather data displays and updates correctly when you change the city.