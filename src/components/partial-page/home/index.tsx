"use client";
import CustomInputField from "@/components/core/inputField";
import { Box, Grid, Paper, useMediaQuery, Card, CardContent, Typography, CardActions } from "@mui/material";
import React, { useState, useEffect } from "react";
import { BasicButton, CustomFlexGrid, LabelTypo } from "./index.style";
import { ICarRequest, ICar } from "@/service/service.types"; // Assuming ICar is the type for the fetched car data
import { toast } from "react-toastify";
import { addCarsService, getCarsService } from "@/service";

const PartialHomePage = () => {
  const [addDetails, setAddDetails] = useState<ICarRequest>({
    carModel: "",
    price: 0,
    phoneNumber: 0,
    city: "",
    maxPictures: 0,
    pictures: ['abc'],
  });
  const [data, setData] = useState<ICar[]>([]);
  const [loading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<string>('');
  const [carModelError, setCarModelError] = useState<string>('');
  const [maxPicturesError, setMaxPicturesError] = useState<string>('');
  const isLaptop = useMediaQuery("(max-width:1300px)");

  const handleInputChange = (field: keyof ICarRequest, value: any) => {
    if (field === "phoneNumber") {
      if (value.length > 11) {
        setPhoneError("Phone number cannot be more than 11 digits.");
      } else {
        setPhoneError("");
      }
    }

    if (field === "carModel") {
      if (value.length < 3) {
        setCarModelError("Car model must have at least 2 characters.");
      } else {
        setCarModelError("");
      }
    }

    if (field === "maxPictures") {
      if (value > 10) {
        setMaxPicturesError("Max pictures cannot be more than 10.");
      } else {
        setMaxPicturesError("");
      }
    }

    setAddDetails((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Submit the form
  const handleSubmit = async () => {
    // Check if any field has an error
    if (phoneError || carModelError || maxPicturesError) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      const resp = await addCarsService(addDetails);
      if (resp) {
        toast.success(resp.message);
        setAddDetails({
          carModel: "",
          price: 0,
          phoneNumber: 0,
          city: "",
          maxPictures: 0,
          pictures: ['abc'],
        });
        setIsLoading(true);
        fetchData();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const fetchData = async () => {
    try {
      const resp = await getCarsService();
      if (resp && resp.data) {
        setData(resp.data);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [loading]);

  return (
    <Grid container justifyContent="center" marginTop={"5rem"} style={{ minHeight: "40vh", width: "100%" }}>
      <Paper elevation={3} sx={{ padding: "2rem", width: isLaptop ? "90%" : "30%" }}>
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
            {carModelError && (
              <Typography variant="body2" color="error" sx={{ marginTop: "0.5rem" }}>
                {carModelError}
              </Typography>
            )}
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
              value={addDetails.price === 0 ? "" : addDetails.price}
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
              type="number"
              background="rgba(255, 255, 255, 1)"
              height="44px"
              value={addDetails.phoneNumber === 0 ? "" : addDetails.phoneNumber}
              handleChange={(value) => handleInputChange("phoneNumber", value)}
            />
            {phoneError && (
              <Typography variant="body2" color="error" sx={{ marginTop: "0.5rem" }}>
                {phoneError}
              </Typography>
            )}
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
            <LabelTypo>Max Pictures*</LabelTypo>
          </Grid>
          <Grid item xs={12} md={8}>
            <CustomInputField
              name="maxPictures"
              placeholder="e.g 1-10"
              type="number"
              background="rgba(255, 255, 255, 1)"
              height="44px"
              value={addDetails.maxPictures === 0 ? "" : addDetails.maxPictures}
              handleChange={(value) => handleInputChange("maxPictures", value)}
            />
            {maxPicturesError && (
              <Typography variant="body2" color="error" sx={{ marginTop: "0.5rem" }}>
                {maxPicturesError}
              </Typography>
            )}
          </Grid>
        </CustomFlexGrid>

        <Box sx={{ marginTop: "3rem" }}>
          <BasicButton onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </BasicButton>
        </Box>
      </Paper>

      <Grid container spacing={2} justifyContent="center" sx={{ marginTop: "4rem", marginInline: '10rem' }}>
        {data.length > 0 ? (
          data.map((car, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {car.carModel}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Price:</strong> {car.price} <br />
                    <strong>Contact:</strong> {car.phoneNumber} <br />
                    <strong>City:</strong> {car.city} <br />
                    <strong>Max Pictures:</strong> {car.maxPictures}
                  </Typography>
                </CardContent>
                <CardActions>
                  <BasicButton size="small">View Details</BasicButton>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="text.secondary">
            No cars available at the moment.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default PartialHomePage;
