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
  const [data, setData] = useState<ICar[]>([]); // Store fetched car data here
  const [loading, setIsLoading] = useState(false);
  const isLaptop = useMediaQuery("(max-width:1300px)");

  const handleInputChange = (field: keyof ICarRequest, value: any) => {
    setAddDetails((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
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
        fetchData(); // Fetch data after submission
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
        setData(resp.data); // Assuming the response data is in `resp.data`
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };


useEffect(()=>{
  fetchData()
},[loading])

  return (
    <Grid container justifyContent="center" marginTop={"5rem"} style={{ minHeight: "40vh", width: "100%" }}>
      {/* Form Section */}
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
              type="text"
              background="rgba(255, 255, 255, 1)"
              height="44px"
              value={addDetails.phoneNumber === 0 ? "" : addDetails.phoneNumber}
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
              value={addDetails.maxPictures === 0 ? "" : addDetails.maxPictures}
              handleChange={(value) => handleInputChange("maxPictures", value)}
            />
          </Grid>
        </CustomFlexGrid>

        <Box sx={{ marginTop: "3rem" }}>
          <BasicButton onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </BasicButton>
        </Box>
      </Paper>

      {/* Displaying Cards for Fetched Cars */}
      <Grid container spacing={2} justifyContent="center" sx={{ marginTop: "4rem" , marginInline:'10rem'}}>
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
