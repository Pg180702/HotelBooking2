import React from "react";
import { Card, CardMedia, Stack } from "@mui/material";
const Destinations = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 80,
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <h2>Destinations You Would Love</h2>
          {/* First Row */}
          <Stack direction="row" spacing={2}>
            <Card sx={{ maxWidth: 450 }}>
              <div style={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image="https://images.unsplash.com/photo-1593183981460-e9276b5a5587?q=80&w=1902&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  height="300"
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    color: "black",
                    top: 20,
                    left: "10%",
                    transform: "translateX(-50%)",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Shimla
                </div>
              </div>
            </Card>
            <Card sx={{ maxWidth: 450 }}>
              <div style={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image="https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  height="300"
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    color: "black",
                    top: 20,
                    left: "10%",
                    transform: "translateX(-50%)",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Manali
                </div>
              </div>
            </Card>
          </Stack>
          {/* Second Row */}
          <Stack direction="row" spacing={1}>
            <Card sx={{ maxWidth: 300 }}>
              <div style={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  height="200"
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    color: "black",
                    top: 20,
                    left: "20%",
                    transform: "translateX(-50%)",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Bangalore
                </div>
              </div>
            </Card>
            <Card sx={{ maxWidth: 300 }}>
              <div style={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image="https://images.unsplash.com/photo-1648466384289-c11b57eab6e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  height="200"
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    color: "black",
                    top: 20,
                    left: "20%",
                    transform: "translateX(-50%)",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Mumbai
                </div>
              </div>
            </Card>
            <Card sx={{ maxWidth: 300 }}>
              <div style={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image="https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  height="200"
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    color: "black",
                    top: 20,
                    left: "20%",
                    transform: "translateX(-50%)",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Delhi
                </div>
              </div>
            </Card>
          </Stack>
        </Stack>
        <Stack
          direction="column"
          spacing={2}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <Card sx={{ maxWidth: 450 }}>
            <div style={{ position: "relative" }}>
              <CardMedia
                component="img"
                image="https://images.unsplash.com/photo-1682685796063-d2604827f7b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  color: "black",
                  top: 20,
                  left: "10%",
                  transform: "translateX(-50%)",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Delhi
              </div>
            </div>
          </Card>
          <Card sx={{ maxWidth: 450 }}>
            <div style={{ position: "relative" }}>
              <CardMedia
                component="img"
                image="https://images.unsplash.com/photo-1682685796063-d2604827f7b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  color: "black",
                  top: 20,
                  left: "10%",
                  transform: "translateX(-50%)",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Delhi
              </div>
            </div>
          </Card>
          <Card sx={{ maxWidth: 450 }}>
            <div style={{ position: "relative" }}>
              <CardMedia
                component="img"
                image="https://images.unsplash.com/photo-1682685796063-d2604827f7b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  color: "black",
                  top: 20,
                  left: "10%",
                  transform: "translateX(-50%)",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Delhi
              </div>
            </div>
          </Card>
          <Card sx={{ maxWidth: 450 }}>
            <div style={{ position: "relative" }}>
              <CardMedia
                component="img"
                image="https://images.unsplash.com/photo-1682685796063-d2604827f7b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  color: "black",
                  top: 20,
                  left: "10%",
                  transform: "translateX(-50%)",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Delhi
              </div>
            </div>
          </Card>
          <Card sx={{ maxWidth: 450 }}>
            <div style={{ position: "relative" }}>
              <CardMedia
                component="img"
                image="https://images.unsplash.com/photo-1682685796063-d2604827f7b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  color: "black",
                  top: 20,
                  left: "10%",
                  transform: "translateX(-50%)",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Delhi
              </div>
            </div>
          </Card>
        </Stack>
      </div>
    </>
  );
};

export default Destinations;
