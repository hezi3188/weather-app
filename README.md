# Weather App

This is a simple Weather & Time application built with Next.js, TypeScript, Mantine, and Tailwind CSS. It fetches weather data from the OpenWeatherMap API and displays:

- The local time and weather conditions of a searched city.
- The temperature in Celsius or Fahrenheit (toggle).
- The time difference between the user’s local time and the city.

## How to Run Locally

To run the Weather App locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/hezi3188/weather-app.git
   cd weather-app
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:

   ```plaintext
   WEATHER_API_KEY=your_api_key_here
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Live Demo

You can also see the live demo of the Weather App [here](https://weather-app-five-nu-16.vercel.app/).
