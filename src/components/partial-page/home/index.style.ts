import styled from "@emotion/styled";
import { Button, Grid, TextareaAutosize, Typography } from "@mui/material";

export const CustomFlexGrid = styled(Grid)`
  display: flex;
  align-items: center;
`;
export const LabelTypo = styled(Typography)`
  font-size: 14px;
  font-weight: 500;
  color: #414651;
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