import {
  Button,
  Card,
  Loader,
  SegmentedControl,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

import { useState } from "react";
import { WeatherResult } from "../enums/WeatherResult";
import { getTimeDifference } from "../utils/datesUtils";

const TITLE = "Weather App";
const LABEL = "Enter city name";
const PLACEHOLDER = "Search...";
const BUTTON_LABEL = "Get Weather";
const ERROR_MESSAGE = "The city does not exist, or an error has occurred!";
const CELIUS = "°C";
const FAHRENHEIT = "°F";
const TIME_TITLE = "Local time: ";
const DIFFER_TITLE = "Time difference: ";

type Mode = typeof CELIUS | typeof FAHRENHEIT;

const Home = () => {
  const [city, setCity] = useState<string>("");
  const [mode, setMode] = useState<Mode>(CELIUS);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [weatherResult, setWeatherResult] = useState<WeatherResult | null>(
    null
  );
  const temp =
    mode === CELIUS
      ? `${weatherResult?.temp_c} ${CELIUS}`
      : `${weatherResult?.temp_f} ${FAHRENHEIT}`;
  const tempText = `The temperature in ${selectedCity}: ${temp}`;
  const handleSearch = async () => {
    try {
      setIsLoading(true);
      setSelectedCity(city);
      const response = await fetch(`/api/weather?city=${city}`);
      if (!response.ok) {
        setError(true);
        setWeatherResult(null);
        setIsLoading(false);
        return;
      }
      const data: WeatherResult = await response.json();
      setWeatherResult(data);
      setError(false);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(true);
      setWeatherResult(null);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6">
      <Title order={1} className="mb-8 text-4xl pl- text-gray-800">
        {TITLE}
      </Title>
      <div className="flex flex-row items-end gap-2 justify-center">
        <TextInput
          value={city}
          onChange={(event) => setCity(event.currentTarget.value)}
          classNames={{
            root: "relative ",
            input: "h-[154px] pt-[18px] ",
          }}
          label={LABEL}
          placeholder={PLACEHOLDER}
        />

        <Button disabled={!city} onClick={() => handleSearch()}>
          {BUTTON_LABEL}
        </Button>
      </div>

      {error && <Text color="red">{ERROR_MESSAGE}</Text>}
      {isLoading && <Loader className="mt-5" color="blue" />}

      {!!weatherResult && (
        <Card className="m-20" withBorder radius="md" padding="xl">
          <Text fz="lg" fw={500}>
            {tempText}
          </Text>
          <Text fz="lg" fw={500}>
            {TIME_TITLE} {weatherResult?.time}
          </Text>
          <Text fz="lg" fw={500}>
            {DIFFER_TITLE} {getTimeDifference(weatherResult?.time)}
          </Text>
          <SegmentedControl
            className="mt-4"
            value={mode}
            onChange={(value) =>
              setMode(value === CELIUS ? CELIUS : FAHRENHEIT)
            }
            radius="xl"
            size="md"
            data={[CELIUS, FAHRENHEIT]}
          />
        </Card>
      )}
    </div>
  );
};
export default Home;
