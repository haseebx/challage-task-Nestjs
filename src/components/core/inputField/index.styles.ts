import { OutlinedInput, Typography } from "@mui/material";
import styled from "@emotion/styled";

interface StyledOutlinedInputProps {
  height?: string;
}

// Use the interface as the type for the styled component
export const StyledOutlinedInput = styled(
  OutlinedInput
)<StyledOutlinedInputProps>`
  width: 100%;
  height: ${({ height }) => (height ? height : "44px")};
  padding: 10px 5px;
  border-radius: 10px;
  input#outlined-adornment-weight {
    height: ${({ height }) => (height ? height : "0.5rem")};
  }
  @media (max-height: 800px) {
    height: ${({ height }) => (height ? height : "34px")};
  }
`;

export const ErrorTypography = styled(Typography)`
  color: red;
  font-size: 0.8rem;
`;
