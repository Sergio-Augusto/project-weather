import React, { useEffect, useState } from 'react';
import { useWeatherStore } from '../Store/WeatherStore';

// Images
import Clear from '../assets/images/Clear.jpg';
import Fog from '../assets/images/fog.png';
import Cloudy from '../assets/images/Cloudy.jpg';
import Rainy from '../assets/images/Rainy.jpg';
import Snow from '../assets/images/snow.jpg';
import Stormy from '../assets/images/Stormy.jpg';
import Sunny from '../assets/images/Sunny.jpg';

interface ImageMap {
  [key: string]: string;
}

const imageMap: ImageMap = {
  clear: Clear,
  cloud: Cloudy,
  rain: Rainy,
  shower: Rainy,
  snow: Snow,
  fog: Fog,
  thunder: Stormy,
  storm: Stormy,
};

const getImageForWeather = (weather: string) => {
  const lowercaseWeather = weather.toLowerCase();

  for (const key in imageMap) {
    if (lowercaseWeather.includes(key)) {
      return imageMap[key];
    }
  }

  return Clear;
};

const BackgroundLayout = () => {
  const { weatherData } = useWeatherStore();
  const [image, setImage] = useState<string | undefined>(Clear);

  useEffect(() => {
    if (weatherData?.weather != null) {
      const weatherCondition = weatherData?.weather[0]?.main;
      if (weatherCondition!=null) {
        const newImage = getImageForWeather(weatherCondition);
        setImage(newImage);
      }
    }
  }, [weatherData]);

  return <img src={image} alt="weather_image" className='h-screen w-full fixed left-0 top-0 -z-[10]' />;
};

export default BackgroundLayout;
