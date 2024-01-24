// src/services/weatherStore.ts
import { create }  from 'zustand';
import { getWeatherData } from '../Services/weatherService';
import { WeatherData, Coord } from '../Types/weatherTypes';

interface WeatherStore {
  searchTerm: string | null;
  weatherData: WeatherData | null;
  setSearchTerm: (term: string) => void;
  searchWeather: () => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
 
  searchTerm: '',
  weatherData: null,
  setSearchTerm: (term) => set({ searchTerm: term }),
  searchWeather: async () => {
    try {
      console.log("sdds",useWeatherStore.getState().searchTerm);
      const data = await getWeatherData(useWeatherStore?.getState()?.searchTerm);
      set({ weatherData: data });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('This place does not exist')
    }
  },
}));
