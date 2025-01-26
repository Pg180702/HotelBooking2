import {
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Modal,
  Pagination,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { UserContext } from "./UserContext";

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const UserReviews = ({ hotelId }) => {
  const { userInfo } = useContext(UserContext);
  const [openReview, setOpenReview] = useState(false);
  const [ratingValue, setRatingValue] = useState(2);
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const username = userInfo.id;
  const [reviewText, setReviewText] = useState("");
  const handleOpenReview = () => setOpenReview(true);
  const handleCloseReview = () => setOpenReview(false);
  const [reviewStats, setReviewStats] = useState(null);
  const fetchReviews = async () => {
    const res = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/reviews/fetchReviews?pageIndex=${currentIndex}&pageSize=10&hotelId=${hotelId}`
    );
    const data = await res.json();
    console.log(data);
    setReviews(data.reviews);
    setTotalPages(data.totalPages);
    setReviewStats(data.stats);
  };
  const handlePageChange = (event, value) => {
    setCurrentIndex(value);
  };
  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!username) {
      alert("please login first");
      return;
    }
    const review = {
      username: username,
      rating: ratingValue,
      description: reviewText,
      hotelId: hotelId,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/reviews/addReview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(review),
        }
      );

      if (response.ok) {
        setOpenReview(false);
        setRatingValue(2);
        setReviewText("");
        fetchReviews();
      } else {
        const errorData = await response.json();
        console.error("Error adding review:", errorData.message);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, [currentIndex]);
  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
        User Ratings & Reviews
      </Typography>
      <div>
        <Grid container spacing={2}>
          {/* hotel reviews-will be mapping reviews here */}
          {/* mistake i was making here is on mapping or connditional jsx wasn't returning jsx
          i was using {} but these dont render anything to render or return jsx need to use () */}
          <Grid item xs={12} sm={8}>
            {reviews.map((review, index) => (
              <>
                <Stack direction="column" spacing={3} key={index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "3rem",
                      }}
                    >
                      <Typography
                        variant="p"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <AccountCircleIcon />
                        {review.user.firstName + " " + review.user.lastName}
                      </Typography>
                      <Typography
                        variant="p"
                        sx={{ marginTop: "1px", marginLeft: "2rem" }}
                      >
                        {new Date(review.createdAt).toLocaleDateString()}
                      </Typography>
                    </div>
                    <div style={{ marginRight: "3rem" }}>
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 50,
                          height: 50,
                          borderRadius: "8px",
                          backgroundColor: "#81929e",
                          boxShadow:
                            "box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;",
                          color: "#333",
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                        }}
                      >
                        {review.rating} <StarBorderIcon fontSize="small" />
                      </Box>
                    </div>
                  </div>
                  <div>
                    <Typography variant="p" style={{ marginLeft: "5rem" }}>
                      {review.reviewText}
                    </Typography>
                  </div>
                </Stack>
                <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
              </>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2rem",
              }}
            >
              {totalPages > 0 ? (
                <Pagination
                  count={totalPages}
                  page={currentIndex}
                  variant="outlined"
                  shape="rounded"
                  onChange={handlePageChange}
                />
              ) : (
                <Typography variant="body2">No reviews available.</Typography>
              )}
            </div>
          </Grid>
          {/* rating overview-beforehand calculations for this */}
          {reviews.length > 0 ? (
            <Grid item xs={12} sm={4}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginLeft: "1rem",
                }}
              >
                {/* left  */}

                <div>
                  <Typography>Overall rating</Typography>
                  <Typography>
                    Number of reviews: {reviewStats.totalReviews}
                  </Typography>
                </div>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 80,
                    height: 50,
                    borderRadius: "6px",
                    backgroundColor: "#81929e",
                    boxShadow:
                      "box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;",
                    color: "#333",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  {reviewStats.overallRating}{" "}
                  <StarBorderIcon fontSize="small" />
                </Box>
              </div>
              <div style={{ marginLeft: "1rem", marginTop: "1rem" }}>
                <Stack direction="column">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography width="40%">Excellent</Typography>
                    <LinearProgressWithLabel
                      value={reviewStats.ratingsDistribution[5]}
                    />
                  </Box>

                  {/* Second Rating */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "0.5rem",
                    }}
                  >
                    <Typography width="40%">Very Good</Typography>
                    <LinearProgressWithLabel
                      value={reviewStats.ratingsDistribution[4]}
                    />
                  </Box>

                  {/* Third Rating */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "0.5rem",
                    }}
                  >
                    <Typography width="40%">Above Average</Typography>
                    <LinearProgressWithLabel
                      value={reviewStats.ratingsDistribution[3]}
                    />
                  </Box>

                  {/* Fourth Rating */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "0.5rem",
                    }}
                  >
                    <Typography width="40%">Below Average</Typography>
                    <LinearProgressWithLabel
                      value={reviewStats.ratingsDistribution[2]}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "0.5rem",
                    }}
                  >
                    <Typography width="40%">Poor</Typography>
                    <LinearProgressWithLabel
                      value={reviewStats.ratingsDistribution[1]}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    onClick={handleOpenReview}
                    sx={{ backgroundColor: "#284b63", marginTop: "2rem" }}
                  >
                    Add A Review
                  </Button>
                </Stack>
              </div>
            </Grid>
          ) : null}
        </Grid>
      </div>
      <Modal
        open={openReview}
        onClose={handleCloseReview}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <Stack direction="column" spacing={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Leave Us A Rating
            </Typography>
            <TextField
              multiline
              fullWidth
              placeholder="Please Provide Us With A Review"
              value={reviewText} // Bind the state to the TextField
              onChange={(e) => setReviewText(e.target.value)}
            />
            <Box>
              <Rating
                name="simple-controlled"
                value={ratingValue}
                onChange={(event, newValue) => {
                  setRatingValue(newValue);
                }}
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleSubmitReview}
              sx={{ backgroundColor: "#284b63", marginTop: "2rem" }}
            >
              Submit Review
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default UserReviews;
