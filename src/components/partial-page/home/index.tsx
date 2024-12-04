"use client";
import CustomInputField from "@/components/core/inputField";
import { Box, Grid, Paper, useMediaQuery } from "@mui/material";
import React from "react";
import { BasicButton, CustomFlexGrid, LabelTypo } from "./index.style";

const PartialHomePage = () => {
  const isLaptop = useMediaQuery("(max-width:1300px) ");
  return (
    <Grid
      container
      justifyContent="center"
      marginTop={'5rem'}
      style={{ minHeight: "50vh", width: '100%' }}
    >
      {/* Wrap the form content in the Paper component */}
      <Paper
        elevation={3}
        sx={{ padding: "2rem", width: isLaptop ? "40%" : "40%" }}
      >
        <CustomFlexGrid container mt={3}>
          <Grid item xs={12} md={4}>
            <LabelTypo>Car Model*</LabelTypo>
          </Grid>
          <Grid item xs={12} md={8}>
            <CustomInputField
              name="name"
              placeholder="e.g. Example"
              type="text"
              background="rgba(255, 255, 255, 1)"
              height="44px"
              value={""}
            // handleChange={(value) => handleInputChange("name", value)}
            />
          </Grid>
        </CustomFlexGrid>

        <CustomFlexGrid container mt={3}>
          <Grid item xs={12} md={4}>
            <LabelTypo>Price*</LabelTypo>
          </Grid>
          <Grid item xs={12} md={8}>
            <CustomInputField
              name="price"
              placeholder="0"
              type="text"
              background="rgba(255, 255, 255, 1)"
              height="44px"
              value={""}
            // handleChange={(value) => handleInputChange("website_url", value)}
            />
          </Grid>
        </CustomFlexGrid>
        <CustomFlexGrid container mt={3}>
          <Grid item xs={12} md={4}>
            <LabelTypo>Contact No*</LabelTypo>
          </Grid>
          <Grid item xs={12} md={8}>
            <CustomInputField
              name="phoneNumber"
              placeholder="e.g 03xxx"
              type="text"
              background="rgba(255, 255, 255, 1)"
              height="44px"
              value={""}
            // handleChange={(value) => handleInputChange("website_url", value)}
            />
          </Grid>
        </CustomFlexGrid>

        <CustomFlexGrid container mt={3}>
          <Grid item xs={12} md={4}>
            <LabelTypo>City*</LabelTypo>
          </Grid>
          <Grid item xs={12} md={8}>
            <CustomInputField
              name="city"
              placeholder="e.g lhr"
              type="text"
              background="rgba(255, 255, 255, 1)"
              height="44px"
              value={""}
            // handleChange={(value) => handleInputChange("website_url", value)}
            />
          </Grid>
        </CustomFlexGrid>
        <CustomFlexGrid container mt={3}>
          <Grid item xs={12} md={4}>
            <LabelTypo>maxPictures*</LabelTypo>
          </Grid>
          <Grid item xs={12} md={8}>
            <CustomInputField
              name="maxPictures"
              placeholder="e.g 1-10"
              type="text"
              background="rgba(255, 255, 255, 1)"
              height="44px"
              value={""}
            // handleChange={(value) => handleInputChange("website_url", value)}
            />
          </Grid>
        </CustomFlexGrid>
        <Box sx={{ marginBlock: '5rem' }}>

          <BasicButton>Submit</BasicButton>
        </Box>
      </Paper>
    </Grid>
  )
};

export default PartialHomePage;
