import axios from 'axios';
import {  Coord } from '../Types/weatherTypes';


export const getWeatherData = async (city : string | null) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}&lang=pt_br`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
