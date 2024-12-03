import { Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";

export const StyledToastContainer = styled(ToastContainer)`
  font-size: 15px;
  @media (max-height: 800px) {
    font-size: 14px;
  }
`;
export const Label = styled(Typography)`
  font-size: 0.9rem;
  font-weight: 600;
  text-align: left;
  color: #000000;
  margin-bottom: 0.2rem;
`;
