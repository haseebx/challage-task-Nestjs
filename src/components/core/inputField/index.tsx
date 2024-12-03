"use client";
import Image from "next/image";
import React, { KeyboardEvent, useState } from "react";
import { Box, IconButton, InputAdornment } from "@mui/material";

import { ErrorTypography, StyledOutlinedInput } from "./index.styles";
import eyeHidden from "@/assets/img/svgs/eye-off.svg";
import eyeVisible from "@/assets/img/svgs/eyeVisible.svg";
import { Label } from "@/styles/global/index.styles";

interface ICustomField {
  name: string;
  placeholder: string;
  type: string;
  label?: string;
  labelSize?: string;
  background?: string;
  value?: number | string;
  handleChange?: (e: string) => void;
  icon?: string | any;
  sxStyle?: string;
  handleKeyDown?: (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  height?: string;
  formik?: {
    values: Record<string, any>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    errors: Record<string, string>;
  };
  disabledTextField?: boolean;
  startAdornmentIcon?: string | any;
  min?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // Add onBlur prop
}

const CustomInputField = ({
  name,
  placeholder,
  type,
  label,
  formik,
  background,
  height,
  value,
  icon,
  handleChange,
  handleKeyDown,
  sxStyle,
  disabledTextField = false,
  startAdornmentIcon = "",
  min,
  onBlur, // Use the onBlur prop here
}: ICustomField) => {
  const [showPassword, setShowPassword] = useState(false); // Initialize with hidden password
  const handleClickShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  return (
    <Box sx={{ width: "100%", height: sxStyle }}>
      <Label>{label}</Label>
      <StyledOutlinedInput
        id="outlined-adornment-weight"
        aria-describedby="outlined-weight-helper-text"
        name={name}
        placeholder={placeholder}
        {...(type === "number" && { min })}
        startAdornment={
          startAdornmentIcon ? (
            <Image
              src={startAdornmentIcon}
              alt="icon"
              style={{ padding: "0 7px" }}
            />
          ) : (
            ""
          )
        }
        disabled={disabledTextField}
        endAdornment={
          type === "password" ? (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? (
                  <Image src={eyeHidden} height={20} width={20} alt="eye" />
                ) : (
                  <Image src={eyeVisible} height={22} width={22} alt="eye" />
                )}
              </IconButton>
            </InputAdornment>
          ) : (
            <InputAdornment position="end">
              <IconButton>{icon && <Image src={icon} alt="icon" />}</IconButton>
            </InputAdornment>
          )
        }
        value={formik ? formik.values[name] : value} // Source value from Formik or fallback to prop
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        onChange={
          formik
            ? formik.handleChange // Use Formik's handler if available
            : (e) => handleChange?.(e.target.value) // Otherwise, use custom handler
        }
        onKeyDown={(e) => handleKeyDown && handleKeyDown(e)}
        onBlur={onBlur} // Apply the onBlur prop to the input
        error={formik?.errors[name] ? true : false}
        sx={{
          backgroundColor: background ? background : "rgba(252, 252, 252, 0.0)",
        }}
        height={height}
      />
      {formik?.errors[name] && (
        <ErrorTypography>{formik.errors[name]}</ErrorTypography>
      )}
    </Box>
  );
};


export default CustomInputField;
