import React, { useState, useEffect } from "react";
import { useNameContext } from "../../store/context";
import {
  Typography,
  Container,
  TextField,
  Button,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { SxProps } from "@mui/system";

interface ProfileProps {
  handleThemeChange: (theme: "light" | "dark") => void;
}

const Profile: React.FC<ProfileProps> = ({ handleThemeChange }) => {
  const { name, setName } = useNameContext();
  const [updatedName, setUpdatedName] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const isFaLanguage = i18n.language === "fa";
  const [selectedThemeMode, setSelectedThemeMode] = useState<string>(
    localStorage.getItem("themeMode") || "light"
  );
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setUpdatedName(storedName);
      setName(storedName);
    }
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }
  }, []);
 
  useEffect(() => {
    if (isFormSubmitted) {
      i18n.changeLanguage(selectedLanguage);
      handleThemeChange(selectedThemeMode as "light" | "dark");
      document.body.dir = selectedLanguage === "fa" ? "rtl" : "ltr";
      setIsFormSubmitted(false);
    }
  }, [isFormSubmitted, selectedLanguage, selectedThemeMode, handleThemeChange]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedName(event.target.value);
  };

  const handleLanguageChange = (lng: string) => {
    setSelectedLanguage(lng);
  };

  const handleThemeModeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedTheme = event.target.value as "light" | "dark";
    setSelectedThemeMode(selectedTheme);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem("name", updatedName);
    setName(updatedName);
    localStorage.setItem("language", selectedLanguage);
    localStorage.setItem("themeMode", selectedThemeMode);
    setIsFormSubmitted(true);
  };

  const containerStyles: SxProps = {
    direction: isFaLanguage ? "rtl" : "ltr",
    width: isSmallScreen ? "350px" : "400px",
    marginTop: "7rem",
    backgroundColor: theme.palette.mode === "dark" ? "#1f1f1f" : "white",
    color: theme.palette.mode === "dark" ? "white" : "inherit",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    padding: "1rem",
  };

  const textStyles: SxProps = {
    marginBottom: "2rem",
  };

  const menuItemStyles: SxProps = {
    textAlign: i18n.language === "fa" ? "right" : "left",
    direction: i18n.language === "fa" ? "rtl" : "ltr",
  };

  const buttonStyles = {
    width: isSmallScreen ? "100%" : "100px",
    marginTop: "1rem",
  };

  return (
    <Container sx={containerStyles}>
      <Typography variant="h6" align="center" sx={textStyles}>
        {t("settings")}
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <TextField
          label={t("name")}
          variant="outlined"
          value={updatedName}
          onChange={handleNameChange}
          fullWidth
          inputProps={{
            placeholder: name,
          }}
          sx={textStyles}
        />
        <TextField
          select
          label={t("theme")}
          value={selectedThemeMode}
          onChange={handleThemeModeChange}
          variant="outlined"
          fullWidth
          sx={textStyles}
        >
          <MenuItem sx={menuItemStyles} value="light">
            {t("light")}
          </MenuItem>
          <MenuItem sx={menuItemStyles} value="dark">
            {t("dark")}
          </MenuItem>
        </TextField>
        <TextField
          select
          label={t("language")}
          value={selectedLanguage}
          onChange={(event) =>
            handleLanguageChange(event.target.value as string)
          }
          variant="outlined"
          fullWidth
        >
          <MenuItem sx={menuItemStyles} value="en">
            {t("english")}
          </MenuItem>
          <MenuItem sx={menuItemStyles} value="fa">
            {t("farsi")}
          </MenuItem>
        </TextField>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={buttonStyles}
        >
          {t("save")}
        </Button>
      </form>
    </Container>
  );
};

export default Profile;
