import { Card, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const UserAccount = () => {
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ marginTop: "200px", display: "flex", justifyContent: "center" }}
      >
        <Stack direction="column">
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Your Bookings
          </Typography>
          <Card
            sx={{
              maxWidth: 1000,
              marginTop: 5,
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item sm={4} xs={12}>
                <img
                  src="https://images.unsplash.com/photo-1682687220015-186f63b8850a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"
                  style={{ objectFit: "cover", maxWidth: "100%" }}
                />
              </Grid>
              <Grid item sm={8} xs={12}>
                <Typography variant="p">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  felis nulla, cursus vitae hendrerit eu, ullamcorper quis eros.
                  Duis rutrum commodo sem, ac pharetra elit pretium vel. Fusce
                  condimentum enim nec orci iaculis, ut rutrum nibh sodales.
                  Nunc tristique cursus quam, eu lobortis tortor pharetra et.
                  Integer pharetra eleifend fringilla. Ut eget fermentum augue.
                  Nam sit amet vestibulum sem. Quisque fermentum viverra metus
                  non consequat. Duis quis libero et sem porttitor sagittis.
                  Praesent euismod, tortor sed fringilla mollis, tortor purus
                  lacinia magna, at posuere odio neque vel nulla. Duis
                  ullamcorper, diam venenatis semper accumsan, sem leo aliquet
                  massa, vel molestie nisl dui vel eros. Nunc at finibus dolor.
                  Maecenas mollis nisl ac tincidunt egestas. Praesent vitae
                  lacus tortor.
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Stack>
      </Container>
    </>
  );
};

export default UserAccount;
