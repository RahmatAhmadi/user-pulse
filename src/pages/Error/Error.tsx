import MainLayout from "../../components/MainLayout/MainLayout";
import { Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const Error = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
 
  const containerStyles = {
    width: isSmallScreen ? "350px" : "400px",
    margin: "5rem auto 0 auto",
  };

  return (
    <>
      <MainLayout />
      <main>
        <Container sx={containerStyles}>
          <Typography variant="h5" align="center" gutterBottom>
            {t("an error occoured!")}
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            {t("could not find this page.")}
          </Typography>
        </Container>
      </main>
    </>
  );
};
export default Error;
