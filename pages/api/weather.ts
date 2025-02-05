import type { NextApiRequest, NextApiResponse } from "next";
import { WeatherResult } from "../../enums/WeatherResult";

/**
 * Handles the weather API request and response.
 * @param req - The incoming request object containing query parameters.
 * @param res - The outgoing response object used to send the result.
 * @returns - A JSON response with the weather data or an error message.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { city } = req.query;

    if (!city || typeof city !== "string") {
      return res.status(400).json({ error: "City is required." });
    }

    const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=no`;

    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: response.statusText });
    }

    const data = await response.json();

    const result: WeatherResult = {
      temp_c: data.current.temp_c,
      temp_f: data.current.temp_f,
      time: data.location.localtime,
    };

    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred." });
  }
}
