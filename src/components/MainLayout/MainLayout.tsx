import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListIcon from "@mui/icons-material/List";
import CloudIcon from "@mui/icons-material/Cloud";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation, initReactI18next } from "react-i18next";
import i18n from "i18next";
import { useNameContext } from "../../store/context";
import translationEN from "../../locales/en.json";
import translationFA from "../../locales/fa.json";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: {
      translation: translationEN,
    },
    fa: {
      translation: translationFA,
    },
  },
});

const MainLayout: React.FC = () => {
  const { name, setName } = useNameContext();
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const isNameStored = localStorage.getItem("name");
  const isFaLanguage = i18n.language === "fa";

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    } else {
      setIsFirstVisit(true);
    }
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem("name", name);
    setIsFirstVisit(false);
    setSubmitted(true);
    navigate("/dashboard");
  };

  const drawerItems = [
    {
      text: t("dashboard"),
      icon: <DashboardIcon color="primary" />,
      path: "/dashboard",
    },
    {
      text: t("todos"),
      icon: <ListIcon color="primary" />,
      path: "/todos",
    },
    {
      text: t("weather"),
      icon: <CloudIcon color="primary" />,
      path: "/weather",
    },
    {
      text: t("profile"),
      icon: <AccountCircleIcon color="primary" />,
      path: "/profile",
    },
  ];

  const containerStyles = {
    width: isSmallScreen ? "350px" : "400px",
    marginTop: "7rem",
    backgroundColor: theme.palette.mode === "dark" ? "#1f1f1f" : "white",
    color: theme.palette.mode === "dark" ? "white" : "inherit",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    padding: "1rem",
  };

  const wrapperStyles = {
    flexGrow: 1,
    direction: i18n.dir(),
  };

  const appBarStyles = {
    position: "fixed",
    direction: "ltr",
    backgroundColor: theme.palette.mode === "dark" ? "#1f1f1f" : null,
    color: theme.palette.mode === "dark" ? "white" : null,
    zIndex: theme.zIndex.drawer + 1,
  };

  const typographyStyles = {
    flexGrow: 1,
    textAlign: "start",
  };

  const drawerPaperStyles = {
    width: 240,
    backgroundColor: theme.palette.mode === "dark" ? "#1f1f1f" : "white",
    color: theme.palette.mode === "dark" ? "white" : "inherit",
    direction: isFaLanguage ? "rtl" : "ltr",
  };

  if (!submitted && !isNameStored) {
    return (
      <Container sx={containerStyles}>
        <form onSubmit={handleFormSubmit}>
          <Typography variant="h6" align="center" gutterBottom>
            {t("enter name")}
          </Typography>
          <TextField
            label={t("name")}
            variant="outlined"
            onChange={handleNameChange}
            fullWidth
            required
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: "1rem" }}
          >
            {t("start")}
          </Button>
        </form>
      </Container>
    );
  }

  return (
    <Container sx={wrapperStyles}>
      <AppBar position="fixed" sx={appBarStyles}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={typographyStyles}>
            {t("user pulse")}
          </Typography>
          <Typography variant="h6" component="div">
            {name && !isFirstVisit && name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        variant={isMediumScreen ? "temporary" : "persistent"}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": drawerPaperStyles,
        }}
        ModalProps={{
          keepMounted: true,
        }}
        classes={{
          paper: "drawerPaper",
        }}
      >
        <Toolbar />
        <IconButton onClick={toggleDrawer} sx={{ ml: "auto" }}>
          <ChevronLeftIcon />
        </IconButton>
        <List>
          {drawerItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                backgroundColor:
                  item.path === currentPath
                    ? (theme) =>
                        theme.palette.mode === "dark" ? "#303030" : "#f5f5f5"
                    : "inherit",
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  textAlign: i18n.language === "fa" ? "right" : "left",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Container>
  );
};

export default MainLayout;
