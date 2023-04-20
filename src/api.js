import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://nc-games-m65q.onrender.com/api",
});

export function getReviews() {
  return gamesApi.get("/reviews").then((response) => {
    return response.data.reviews;
  });
}

export function getReview(id) {
  return gamesApi.get(`/reviews/${id}`).then((response) => {
    return response.data.review;
  });
}

export function getReviewComments(id) {
  return gamesApi.get(`/reviews/${id}/comments`).then((response) => {
    return response.data.comments;
  });
}

export function updateVote(id, vote) {
  return gamesApi
    .patch(`/reviews/${id}`, { inc_votes: vote })
    .then((response) => {
      return response.data.review;
    });
}
