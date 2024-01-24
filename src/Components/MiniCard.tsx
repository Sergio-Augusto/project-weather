import React, { useEffect, useState } from 'react';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';

interface MiniCardProps {
  time: string;
  temp?: string;
  iconString?: string ;
}

const MiniCard: React.FC<MiniCardProps> = ({ time, temp, iconString }) => {
  const [icon, setIcon] = useState<string | undefined>();

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('clouds')) {
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

  console.log(iconString);

  return (
    <div className='glassCard w-[10rem] h-[13rem] p-4 flex flex-col'>
      <p className='text-center'>
      {new Date(time).toLocaleDateString('pt-br', { weekday: 'long' })}
      </p>
      <hr />
      <div className='w-full flex justify-center items-center flex-1'>
        <img src={icon} alt="forecast not available" className='w-[4rem] h-[4rem]' />
      </div>
      <p className='text-center font-bold'>{temp}&deg;C</p>
      <hr />
      <p className='text-center'>
      {new Date(time ?? '').toLocaleDateString('pt-br')}
      </p>
    </div>
  );
};

export default MiniCard;
