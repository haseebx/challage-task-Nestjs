"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import { Box, Grid, Paper, useMediaQuery, Card, CardContent, Typography, CardActions } from "@mui/material";
import CustomInputField from "@/components/core/inputField";
import { ICarRequest, ICar } from "@/service/service.types";
import { addCarsService, getCarsService } from "@/service";
import UploadIcon from "@/assets/img/svgs/uploadIcon.svg";
import { BasicButton, CustomFlexGrid, LabelTypo } from "./index.style";

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
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false); // Track upload state
  const [image, setImage] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
    // const image = await HandleuploadImage(selectedFile)
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

  const HandleuploadImage = async (selectedFile: File | null) => {
    if (!file) return; // Exit if no file is selected

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Authorization token not found. Please log in.");
      setIsUploading(false);
      return;
    }

    try {
      const resp = await axios.post(
        "https://nodejs-backend-task-gamma.vercel.app/api/users/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      if (resp) {
        toast.success("Photo uploaded successfully");
        const newImage = resp.data.url;
        setImage(newImage);

      }
    } catch (error) {
      toast.error(
        axios.isAxiosError(error) && error.response
          ? error.response.data.message || "An error occurred"
          : "An unknown error occurred"
      );
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };
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

        <CustomFlexGrid container mt={3}>
          <Grid item xs={12} md={4}>
            <LabelTypo>Picture*</LabelTypo>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px dashed #ccc",
                borderRadius: "10px",
                padding: "16px",
                backgroundColor: "#f9f9f9",
                textAlign: "center",
                flexDirection: "column",
                cursor: "pointer",
                width: "92%",
                height: "auto", 
                "&:hover": {
                  borderColor: "#007bff",
                },
                position: "relative",
              }}
            >
              {preview ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%", 
                    maxWidth: "250px", 
                  }}
                >
                  <Image
                    src={preview}
                    alt="Uploaded Preview"
                    width={100}
                    height={100}

                    style={{
                      objectFit: "contain", 
                      borderRadius: "8px",
                      width: "100%", 
                      maxWidth: "200px", 
                      height: "auto",
                    }}
                  />

                </Box>
              ) : (
                <>
                  <Image
                    src={UploadIcon}
                    alt="Upload Icon"
                    width={50}
                    height={50}
                  />
                  <Typography
                    sx={{
                      color: "#e91e63",
                      fontWeight: "bold",
                      marginTop: "8px",
                    }}
                  >
                    Click to upload or drag and drop
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#757575" }}>
                    SVG, PNG, JPG, or GIF (max. 800×400px)
                  </Typography>
                </>
              )}
              <input
                type="file"
                accept=".svg,.png,.jpg,.gif"
                style={{
                  opacity: 0,
                  position: "absolute",
                  inset: 0,
                  cursor: "pointer",
                }}
                onChange={handleFileChange}
              />
            </Box>
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
