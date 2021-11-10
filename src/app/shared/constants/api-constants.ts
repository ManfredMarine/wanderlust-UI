export const APIMethods = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE'
}

// USe below for Prod
const API_GATEWAY_PROD = '/api';

// Use below for dev
const API_GATEWAY_DEV = 'http://localhost:3000';

export const APIUrl = {
  getDestinations: `${API_GATEWAY_DEV}/destination`,
  searchDestination: `${API_GATEWAY_DEV}/destination/search`,
  login: `${API_GATEWAY_DEV}/user/login`,
  register: `${API_GATEWAY_DEV}/user/register`,
  bookDestination: `${API_GATEWAY_DEV}/booking`,
  getBookings: `${API_GATEWAY_DEV}/booking`
}