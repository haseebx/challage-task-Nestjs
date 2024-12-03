import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import styled from "styled-components";

export const TypographyAccount = styled(Typography)`
  font-size: 26px;
  font-weight: 700;
  color: black;
`;

export const MainContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
`;

export const BasicButton = styled(Button)`
  height: 44px;
  width: 100%;
  padding: 25px 18px 25px 18px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff !important;
  text-transform: capitalize;
  background-color: #ea5c32 !important;
  @media (max-width: 1200px) and (max-height: 800px) {
    height: 30px;
  }
  &:hover {
    color: #ffffff;
    background-color: #ea5c32;
  }
  &:disabled {
    background-color: #f5f5f5; /* Light background color when disabled */
    color: #c0c0c0; /* Light text color when disabled */
  }
`;
