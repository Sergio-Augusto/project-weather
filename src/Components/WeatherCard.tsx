import React, { useEffect, useState } from 'react';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';
import '../index.css';

interface WeatherCardProps {
  temperature?: number| null;
  windspeed?: number| null;
  humidity?: number| null;
  place?: string| null;
  heatIndex?: string | null;
  iconString?: string| null;
  temp?:  string| null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  temp,
}) => {
  const [icon, setIcon] = useState<string>(sun);


  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('cloud')) {
        setIcon(cloud);
      } else if (iconString.toLowerCase().includes('rain')) {
        setIcon(rain);
      } else if (iconString.toLowerCase().includes('clear')) {
        setIcon(sun);
      } else if (iconString.toLowerCase().includes('thunder')) {
        setIcon(storm);
      } else if (iconString.toLowerCase().includes('fog')) {
        setIcon(fog);
      } else if (iconString.toLowerCase().includes('snow')) {
        setIcon(snow);
      } else if (iconString.toLowerCase().includes('wind')) {
        setIcon(wind);
      }
    }
  }, [iconString]);

  return (
    <div className='w-[22rem] min-w-[22rem] h-[30rem] glassCard p-4'>
      <div className='flex w-full justify-center items-center gap-4 mt-12 mb-4'>
        <img src={icon} alt="weather_icon" />
        <p className='font-bold text-5xl flex justify-center items-center'>{temperature} &deg;C</p>
      </div>
      <div className='font-bold text-center text-xl'>{place}</div>
      <div className='w-full flex justify-between items-center mt-4'>
        <p className='flex-1 text-center p-2'> {new Date(temp ?? '').toLocaleDateString('pt-br', { weekday: 'long' })}</p>
        <p className='flex-1 text-center p-2'>{new Date(temp ?? '').toLocaleDateString('pt-br')}</p>
      </div>
      <div className='w-full flex justify-between items-center mt-4 gap-4'>
        <p className='flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg'>
        Velocidade do vento <p className='font-normal'>{windspeed} km/h</p>
        </p>
        <p className='flex-1 text-center p-2 font-bold rounded-lg bg-green-600'>
        Humidade <p className='font-normal'>{humidity} gm/m&#179;</p>
        </p>
      </div>
      <div className='w-full p-3 mt-4 flex justify-between items-center'>
        <p className='font-semibold text-lg'>Índice de calor</p>
        <p className='text-lg'>{heatIndex ?? 'N/A'}</p>
      </div>

    </div>
  );
};

export default WeatherCard;
