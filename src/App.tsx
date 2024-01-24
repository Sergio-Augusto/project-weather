import './App.css';
import search from './assets/icons/search.svg';
import { useWeatherStore } from './Store/WeatherStore';
import { BackgroundLayout, WeatherCard, MiniCard } from './Components';
import {  useState, useEffect } from "react";
import { City, Country, ICountry, ICity } from "country-state-city";
import Select from "react-select";

import { SelectOption, CitySelectOption, Coord } from 'Types/weatherTypes';

function App() {
  const {  setSearchTerm, weatherData, searchWeather } = useWeatherStore();

  const [allCountries, setAllCountries] = useState<SelectOption[]>([]);

  const [citiesOfCountry, setCitiesOfCountry] = useState<ICity[] | null >();

  const [selectedCity, setSelectedCity] = useState<CitySelectOption | null>(null);

  const [selectedCountry, setSelectedCountry] = useState<SelectOption | null>(null);

  useEffect(() => {
    const fetchCountries = () => {
      const countriesData: ICountry [] = Country.getAllCountries();

      const mappedCountries: SelectOption[] = countriesData.map((country) => ({
        value: {
          name: country.name,
          latitude: country.latitude,
          longitude: country.longitude,
          isoCode: country.isoCode,
        },
        label: country.name,
      }));

      setAllCountries(mappedCountries);
    };
    console.log("passou aqui fetchCountries")
    fetchCountries();
  }, []); 

 
  useEffect(() => {
    const citiesOfCountry = selectedCountry?.value?.isoCode
    ? City.getCitiesOfCountry(selectedCountry?.value?.isoCode)
    : [];

    setCitiesOfCountry(citiesOfCountry);
    console.log("passou aqui setCitiesOfCountry")
  }, [selectedCountry]); 
  

  const handleSelectedCountry = (option:any) => {
    setSelectedCountry(option);
    setSelectedCity(null);
  };

  const handleSelectedCity = (option:any ) => {
    setSelectedCity(option);
  };

  const getWeatherDetails = (e: any) => {
    e.preventDefault();
    if (selectedCity?.label != null) {
      setSearchTerm(selectedCity.label);
    searchWeather();
    }
  };

  return (
    <div className='w-full h-screen text-white px-8'>
      <nav className='w-full p-3 flex justify-between items-center'>
        <h1 className='font-bold tracking-wide text-3xl'>Aplicativo Clima</h1>
        <div className="flex flex-col justiy-left">
        <div className='text-black w-[40rem]  flex items-right p-3 gap-3'>
          <Select
            options={allCountries}
            value={selectedCountry}
            onChange={handleSelectedCountry}
          />
          <Select
           options={citiesOfCountry?.map((city) => ({
            value: {
              latitude: city.latitude, 
              longitude: city.longitude,
              name: city.name,
            },
            label: city.name,
          }))}
            value={selectedCity}
            onChange={handleSelectedCity}
          />
           <button
            onClick={(e) => getWeatherDetails(e)}
            className=" w-[15rem]  bg-green-400  py-3 rounded-lg text-white text-sm font-bold hover:scale-105 transition-all duration-200 ease-in-out"
          >
            Get Weather
          </button>
        </div>
       
      </div>
           
      </nav>
      <BackgroundLayout />
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        <WeatherCard
          place={weatherData?.city.name}
          windspeed={weatherData?.list[0]?.wind?.speed}
          humidity={weatherData?.list[0]?.main?.humidity}
          temperature={weatherData?.list[0]?.main.temp}
          heatIndex={weatherData?.list[0]?.weather[0]?.description}
          iconString={weatherData?.list[0]?.weather[0]?.main}
          temp={weatherData?.list[0]?.dt_txt}
        />

<div className='flex justify-center gap-8 flex-wrap w-[60%]'>
{weatherData?.list?.reduce((uniqueDays: string[], temp) => {
  const day  = temp.dt_txt.split(" ")[0];
  if (!uniqueDays.includes(day ?? '')) {
    uniqueDays.push(day ?? '');
    return uniqueDays;
  }
  return uniqueDays;
}, []).map((uniqueDay) => {
  const tempOfDay = weatherData?.list?.find((temp) => temp.dt_txt.includes(uniqueDay));

  if (tempOfDay) {
    return (
      <MiniCard
        key={`${tempOfDay.dt}_${uniqueDay}`}
        time={tempOfDay.dt_txt}
        temp={tempOfDay.weather[0]?.description}
        iconString={tempOfDay.weather[0]?.main}
      />
    );
  }

  return null;
})}


        </div>

      </main>
    </div>
  );
}

export default App;
