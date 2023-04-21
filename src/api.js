import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://nc-games-m65q.onrender.com/api",
});

export function getReviews({ category, sort_by, order }) {
  return gamesApi
    .get(`/reviews/`, { params: { category, sort_by, order } })
    .then((response) => {
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

export function postComment(id, commentText) {
  return gamesApi
    .post(`/reviews/${id}/comments`, {
      username: "grumpy19",
      body: commentText,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

export function fetchCategories() {
  return gamesApi
    .get(`/categories`)
    .then((response) => {
      return response.data.categoryObj;
    })
    .catch((error) => {
      console.log("Error: ", error);
      return error;
    });
}
