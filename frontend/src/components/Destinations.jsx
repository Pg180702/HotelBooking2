import React from "react";
import { Card, CardMedia, Stack } from "@mui/material";
import { Link } from "react-router-dom";
const Destinations = () => {
  const data = ["Shimla", "Manali", "Bangalore", "mumbai", "delhi"];
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
            <Link to={`/search-items/${data[0]}`}>
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
            </Link>
            <Link to={"/search-items/Manali"}>
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
            </Link>
          </Stack>
          {/* Second Row */}
          <Stack direction="row" spacing={1}>
            <Link to={"/search-items/Bangalore"}>
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
            </Link>
            <Link to={"/search-items/Mumbai"}>
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
            </Link>
            <Link to={`/search-items/delhi`}>
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
            </Link>
          </Stack>
        </Stack>
        <Stack
          direction="column"
          spacing={2}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <Link to={"/search-items/Shimla"}>
            <Card sx={{ maxWidth: 450, marginBottom: "1rem" }}>
              <div style={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image="https://images.unsplash.com/photo-1593183981460-e9276b5a5587?q=80&w=1902&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    color: "black",
                    top: 20,
                    left: "15%",
                    transform: "translateX(-50%)",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Shimla
                </div>
              </div>
            </Card>
          </Link>
          <Link to={"/search-items/Manali"}>
            <Card sx={{ maxWidth: 450, marginBottom: "1rem" }}>
              <div style={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image="https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    color: "black",
                    top: 20,
                    left: "15%",
                    transform: "translateX(-50%)",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Manali
                </div>
              </div>
            </Card>
          </Link>
          <Link to={"/search-items/Bangalore"}>
            <Card sx={{ maxWidth: 450, marginBottom: "1rem" }}>
              <div style={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
          </Link>
          <Link to={"/search-items/Mumbai"}>
            <Card sx={{ maxWidth: 450, marginBottom: "1rem" }}>
              <div style={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image="https://images.unsplash.com/photo-1648466384289-c11b57eab6e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    color: "black",
                    top: 20,
                    left: "18%",
                    transform: "translateX(-50%)",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Mumbai
                </div>
              </div>
            </Card>
          </Link>
          <Link to={"/search-items/delhi"}>
            <Card sx={{ maxWidth: 450 }}>
              <div style={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image="https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
          </Link>
        </Stack>
      </div>
    </>
  );
};

export default Destinations;
