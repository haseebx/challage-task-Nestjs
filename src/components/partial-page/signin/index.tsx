"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import {
  Grid,
  Typography,
  useMediaQuery,
  Paper, 
} from "@mui/material";
import CustomInputField from "@/components/core/inputField";
import Email from "@/assets/img/svgs/email.svg";
import Lock from "@/assets/img/svgs/lock.svg";
import { signInValidation } from "@/validations/signInValidation";
import { signinService } from "@/service";
import { ILoginRequest } from "@/service/service.types";
import { TypographyAccount, BasicButton } from "./index.style";

interface SignInFormValues {
  email: string;
  password: string;
}

const PartialSignInPage = () => {
  const route = useRouter();
  const isLaptop = useMediaQuery("(max-width:1300px) ");

  const formik = useFormik<SignInFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values: ILoginRequest) => {
      console.log({ values });
      if (values) {
        handleLogin(values);
      }
    },
    validationSchema: signInValidation,
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleLogin = async (value: ILoginRequest) => {
    try {
      const resp = await signinService(value);
      if (resp) {
        toast.success(resp.message);
        localStorage.setItem("token", resp.token);
        route.push("/home");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Paper
        elevation={3}
        sx={{ padding: "2rem", width: isLaptop ? "40%" : "20%" }}
      >
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-around",
            rowGap: isLaptop ? "1.5rem" : "2rem",
          }}
        >
          <TypographyAccount>Sign In to your Account</TypographyAccount>
          <Typography
            sx={{
              color: "#64748B",
              fontSize: "14px",
              fontWeight: 400,
              marginTop: isLaptop ? "-1.3rem" : "-2rem",
            }}
          >
            Welcome back! please enter your detail
          </Typography>

          <CustomInputField
            name="email"
            placeholder="Email"
            type="email"
            formik={formik}
            startAdornmentIcon={Email}
            height="3rem"
          />
          <CustomInputField
            name="password"
            placeholder="Password"
            type="password"
            formik={formik}
            startAdornmentIcon={Lock}
            height="3rem"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
              marginTop: isLaptop ? "-1rem" : "-1.5rem",
            }}
          >
            <Typography
              sx={{ color: "#EA5C32", fontSize: "14px", fontWeight: "600" }}
            >
              Forgot Password?
            </Typography>
          </div>
          <BasicButton type="submit">Sign In</BasicButton>
        </form>
      </Paper>
    </Grid>
  );
};

export default PartialSignInPage;
