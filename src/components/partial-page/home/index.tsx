"use client";
import CustomInputField from "@/components/core/inputField";
import { Box, Grid, Paper, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { BasicButton, CustomFlexGrid, LabelTypo } from "./index.style";
import { ICarRequest } from "@/service/service.types";
import { toast } from "react-toastify";
import { addCarsService } from "@/service";

const PartialHomePage = () => {
  const [addDetails, setAddDetails] = useState<ICarRequest>({
    carModel: "",
    price: 0,
    phoneNumber: 0,
    city: "",
    maxPictures: 0,
    pictures: ['abc'],
  });
  const isLaptop = useMediaQuery("(max-width:1300px) ");


  const handleInputChange = (field: keyof ICarRequest, value: any) => {
    setAddDetails((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const resp = await addCarsService(addDetails)
      if (resp) {
        toast.success(resp.message);
        setAddDetails({
          carModel: "",
          price: 0,
          phoneNumber: 0,
          city: "",
          maxPictures: 0,
          pictures: ['abc'],
        })
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <Grid
      container
      justifyContent="center"
      marginTop={"5rem"}
      style={{ minHeight: "50vh", width: "100%" }}
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
              value={addDetails.carModel}
              handleChange={(value) => handleInputChange("carModel", value)}
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
              type="number"
              background="rgba(255, 255, 255, 1)"
              height="44px"
              value={addDetails.price == 0 ? '' : addDetails.price}
              handleChange={(value) => handleInputChange("price", value)}
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
              value={addDetails.phoneNumber === 0 ? '' : addDetails.phoneNumber}
              handleChange={(value) => handleInputChange("phoneNumber", value)}
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
              value={addDetails.city}
              handleChange={(value) => handleInputChange("city", value)}
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
              type="number"
              background="rgba(255, 255, 255, 1)"
              height="44px"
              value={addDetails.maxPictures === 0 ? '' : addDetails.maxPictures}
              handleChange={(value) => handleInputChange("maxPictures", value)}
            />
          </Grid>
        </CustomFlexGrid>
        <Box sx={{ marginBlock: "5rem" }}>
          <BasicButton onClick={handleSubmit}>Submit</BasicButton>
        </Box>
      </Paper>
    </Grid>
  );
};

export default PartialHomePage;
