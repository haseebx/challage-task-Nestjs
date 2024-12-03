"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  mixins: {
    toolbar: {
      minHeight: 48,
      maxHeight: 48,
      height: 48,
    },
  },
  spacing: [0, 4, 8, 16, 30, 32, 64],
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    grey: {
      A100: "#24202B",
      900: "#5A575F",
      800: "#8E8C92",
      700: "#C4C3C6",
      600: "#EFEFEF",
      500: "#FFFFFF",
    },
    secondary: {
      main: "#C3025F",
      900: "#D14185",
      800: "#DE7DAC",
      700: "#ECBCD3",
    },
    primary: {
      main: "#440099",
      900: "#7140AF",
      800: "#9E7CC9",
      700: "#CCBBE1",
    },
    success: {
      main: "#66BC53",
      900: "#8BCB7D",
      800: "#AFDAA6",
      700: "#D6EAD0",
      600: "#F1FAEF",
    },
    warning: {
      main: "#E2B100",
      900: "#E9C33F",
      800: "#EDD57C",
      700: "#F4E7BB",
      600: "#F9F5DF",
    },
    info: {
      main: "#2A96F3",
      900: "#70B5FA",
      800: "#9FCCFA",
      700: "#CDE3FA",
      600: "#E7F0F9",
    },
    error: {
      main: "#F44336",
      900: "#F67B70",
      800: "#F8A9A2",
      700: "#FBD5D2",
      600: "#F8E9E7",
    },
  },
});
export default theme;
