// api.js
import axios from "axios";

const BASE_URL = "http://20.244.56.144";

export const registerCompany = async (companyData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/train/register`,
      companyData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAccessToken = async (authData) => {
  try {
    const response = await axios.post(`${BASE_URL}/train/auth`, authData);
    return response.data.access_token;
  } catch (error) {
    throw error;
  }
};

export const getAllTrains = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/train/trains`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTrainDetails = async (accessToken, trainNumber) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/train/trains/${trainNumber}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
