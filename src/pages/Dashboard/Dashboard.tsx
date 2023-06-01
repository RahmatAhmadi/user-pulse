import { useState, useEffect } from "react";
import { useNameContext } from "../../store/context";
import { Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import format from "date-fns/format";

const convertToPersianNumber = (number: number): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(number).replace(
    /[0-9]/g,
    (digit) => persianDigits[Number(digit)]
  );
};

const Dashboard = (): JSX.Element => {
  const { name, setName } = useNameContext();
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(false);
  const [greeting, setGreeting] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");
  const isFaLanguage = i18n.language === "fa";
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    } else {
      setIsFirstVisit(true);
    }

    const currentTime = format(new Date(), "HH:mm:ss");
    setCurrentTime(currentTime);
    const currentHour = parseInt(currentTime.split(":")[0]);
    let greeting = "";

    switch (true) {
      case currentHour >= 5 && currentHour < 12:
        greeting = t("good morning");
        break;
      case currentHour >= 12 && currentHour < 17:
        greeting = t("good afternoon");
        break;
      case currentHour >= 17 && currentHour < 20:
        greeting = t("good evening");
        break;
      default:
        greeting = t("good night");
        break;
    }

    setGreeting(greeting);

    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedTime = format(now, "HH:mm:ss");
      setCurrentTime(formattedTime);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formatTime = (time: string): string => {
    if (i18n.language === "fa") {
      const [hours, minutes, seconds] = time.split(":");
      return (
        convertToPersianNumber(Number(hours)).padStart(2, "۰") +
        ":" +
        convertToPersianNumber(Number(minutes)).padStart(2, "۰") +
        ":" +
        convertToPersianNumber(Number(seconds)).padStart(2, "۰")
      );
    } else {
      return time;
    }
  };

  const containerStyles = {
    direction: isFaLanguage ? "rtl" : "ltr",
    width: isSmallScreen ? "350px" : "400px",
    margin: "7rem auto 0 auto",
  };

  return (
    <Container sx={containerStyles}>
      {!isFirstVisit ? (
        <Typography variant="h5" align="center" gutterBottom>
          {greeting}, {name}
        </Typography>
      ) : (
        <Typography variant="h5" align="center" gutterBottom>
          {t("welcome")}
        </Typography>
      )}
      <Typography variant="h6" align="center" gutterBottom>
        {t("current time")}: {formatTime(currentTime)}
      </Typography>
    </Container>
  );
};

export default Dashboard;
