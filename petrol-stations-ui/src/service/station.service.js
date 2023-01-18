import http from "./http-common"

const prefix = '/v1/stations';

export const getStations = () => {
  return http.get(`${prefix}`);
}

export const addStation = data => {
  return http.post(`${prefix}/single-add`, data);
}
