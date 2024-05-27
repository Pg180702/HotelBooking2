import { Stack, TextField, Button, Card, CardContent } from "@mui/material";
import React, { useState } from "react";

const AddHotel = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [pricePerNight, setpricePerNight] = useState("");
  const [adultCount, setAdultCount] = useState("");
  const [childCount, setChildCount] = useState("");
  const [facilities, setFacilities] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("pricePerNight", pricePerNight);
    formData.append("adultCount", adultCount);
    formData.append("childCount", childCount);
    formData.append("facilities", facilities);
    const fileInput = document.getElementById("imageInput");
    const selectedFiles = fileInput.files;
    if (selectedFiles.length === 0) {
      alert("At least Upload One picture");
      return;
    }
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images[]", selectedFiles[i]);
    }
    console.log(formData);
    const response = await fetch(
      "https://hotelbooking2-9b1p.onrender.com/api/v1/users/add-hotel",
      {
        method: "POST",
        body: formData,
      }
    );
    if (response.ok) {
      alert("Hotel Created Successfully");
    } else alert("Problem in creating Hotel");
  };
  return (
    <div
      style={{
        marginTop: 100,
        maxWidth: 2000,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
          <TextField
            variant="outlined"
            label="Name"
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <TextField
              variant="outlined"
              label="City"
              fullWidth
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Country"
              fullWidth
              onChange={(e) => setCountry(e.target.value)}
            />
          </Stack>
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={10}
            defaultValue="Description"
            fullWidth
            onChange={(e) => setDescription(e.target.value)}
          />
          <Stack direction="row" spacing={2}>
            <TextField
              variant="outlined"
              label="Type"
              fullWidth
              onChange={(e) => setType(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="PricePerNight"
              fullWidth
              onChange={(e) => setpricePerNight(e.target.value)}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              variant="outlined"
              label="Adult Count"
              fullWidth
              onChange={(e) => setAdultCount(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Child Count"
              fullWidth
              onChange={(e) => setChildCount(e.target.value)}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              variant="outlined"
              label="Facilities"
              fullWidth
              onChange={(e) => setFacilities(e.target.value)}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <input
              type="file"
              id="imageInput"
              name="images[]"
              multiple
              accept="image/*"
              fullWidth
            />
          </Stack>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ backgroundColor: "#284b63" }}
          >
            Create Hotel
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default AddHotel;
