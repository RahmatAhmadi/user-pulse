import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Container,
  useMediaQuery,
  useTheme,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import SnowIcon from "@mui/icons-material/AcUnit";
import SunIcon from "@mui/icons-material/WbSunny";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import axios from "axios";
import citiesData from "../../data/ir.json";

const Weather = () => {
  const [selectedCity, setSelectedCity] = useState<any>("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFaLanguage = i18n.language === "fa";
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedCity) {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.lng}&current_weather=true`
        );
        if (response.status === 200) {
          const data = response.data;
          setWeatherData({ ...data, cityName: selectedCity.city });
          setWeatherError(null);
        } else {
          setWeatherError(t("Retrieving weather data failed"));
        }
      } catch (error) {
        setWeatherError(t("Retrieving weather data failed"));
      }
      setIsLoading(false);
    } else {
      setWeatherError(t("City not selected"));
    }
  };

  const getTemperatureIcon = (temperature: number) => {
    if (temperature < 10) {
      return (
        <SnowIcon
          sx={{
            color: "cyan",
            fontSize: 100,
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        />
      );
    } else {
      return (
        <SunIcon
          sx={{
            color: "#ffeb3b",
            fontSize: 100,
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        />
      );
    }
  };

  const handleCityChange = (
    event: SelectChangeEvent<any>,
    child: React.ReactNode
  ) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
  };

  const containerStyles = {
    direction: isFaLanguage ? "rtl" : "ltr",
    width: isSmallScreen ? "350px" : "400px",
    marginTop: "7rem",
    backgroundColor: theme.palette.mode === "dark" ? "#1f1f1f" : "white",
    color: theme.palette.mode === "dark" ? "white" : "inherit",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    padding: "1rem",
  };

  const textStyles = {
    marginBottom: "2rem",
  };

  const buttonStyles = {
    marginTop: "1rem",
    width: isSmallScreen ? "100%" : "130px",
    direction: i18n.language === "fa" ? "rtl" : "ltr",
  };

  const temperatureStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "2rem",
  };

  const dropdownStyles = {
    maxHeight: isSmallScreen ? "300px" : "400px",
    direction: i18n.language === "fa" ? "rtl" : "ltr",
  };

  return (
    <Container sx={containerStyles}>
      <Typography variant="h6" align="center" sx={textStyles}>
        {t("search weather")}
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <FormControl fullWidth required>
          <InputLabel>{t("city")}</InputLabel>
          <Select
            variant="outlined"
            label={t("city")}
            value={selectedCity}
            onChange={handleCityChange}
            fullWidth
            required
            MenuProps={{
              sx: dropdownStyles,
            }}
          >
            {citiesData.map((city: any, index: number) => (
              <MenuItem key={index} value={city}>
                {city.city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isLoading}
          sx={buttonStyles}
        >
          {isLoading ? t("loading") : t("search")}
        </Button>
      </form>
      {weatherData && (
        <Box sx={temperatureStyles}>
          <Typography variant="h5" gutterBottom>
            {weatherData.cityName}
          </Typography>
          {getTemperatureIcon(weatherData.current_weather.temperature)}
          <Typography variant="h6" gutterBottom>
            {weatherData.current_weather.temperature}°C
          </Typography>
        </Box>
      )}
      {weatherError && (
        <Typography variant="body1" align="center" gutterBottom color="error">
          {weatherError}
        </Typography>
      )}
    </Container>
  );
};

export default Weather;
