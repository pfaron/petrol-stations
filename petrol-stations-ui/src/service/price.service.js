import http from "./http-common"

const prefix = '/v1/prices';

export const setPrice = data => {
  return http.post(`${prefix}/set`, data);
}

export const addPrice = data => {
  return http.post(`${prefix}/add`, data);
}

export const upVote = id => {
  return http.post(`${prefix}/${id}/upvote`)
}

export const downVote = id => {
  return http.post(`${prefix}/${id}/downvote`)
}

export const getPrices = () => {
  return http.get(`${prefix}`)
}

export const getPricesForStation = (id) => {
  return http.get(`${prefix}/${id}`)
}
