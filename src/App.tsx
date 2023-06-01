import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import type { PaletteMode } from "@mui/material";
import Dashboard from "./pages/Dashboard/Dashboard";
import Todos from "./pages/Todos/Todos";
import Weather from "./pages/Weather/Weather";
import Profile from "./pages/Profile/Profile";
import { useState, useEffect } from "react";
import i18n from "i18next";
import { Box } from "@mui/system";
import Error from "./pages/Error/Error";

const App = () => {
  const [selectedTheme, setSelectedTheme] = useState<PaletteMode>("light");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  useEffect(() => {
    const storedThemeMode = localStorage.getItem("themeMode");
    if (storedThemeMode) {
      setSelectedTheme(storedThemeMode as PaletteMode);
    }

    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  const handleThemeChange = (theme: PaletteMode) => {
    setSelectedTheme(theme);
  };

  const theme = createTheme({
    palette: {
      mode: selectedTheme,
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/todos",
          element: <Todos />,
        },
        {
          path: "/weather",
          element: <Weather />,
        },
        {
          path: "/profile",
          element: <Profile handleThemeChange={handleThemeChange} />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ direction: i18n.language === "fa" ? "rtl" : "ltr" }}>
        <RouterProvider router={router} />
      </Box>
    </ThemeProvider>
  );
};

export default App;
