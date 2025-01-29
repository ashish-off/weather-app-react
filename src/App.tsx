import React, { useEffect, useState } from "react";
import { loadConfigFromFile } from "vite";

interface dateType {
  month: string;
  day: number;
  year: number;
}
const App = () => {
  const [currentDate, setCurrentDate] = useState<dateType>({
    month: "",
    day: 0,
    year: 0,
  });

  const [city, setCity] = useState<string | undefined>("kathmandu");
  const [weatherData, setWeatherData] = useState<any>(null);


  const apiKey: string = "9f3a23e1579de3196e33818d8f1c3d9f";

  const getCurrentDate = (): dateType => {
    const date = new Date();
    const month = date.toLocaleString("en-US", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();

    return { month, day, year };
  };

  useEffect(() => {
    const { month, day, year } = getCurrentDate();
    setCurrentDate({ month, day, year });
  }, []);

  const fetchWeatherData = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    console.log(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const getWeatherIconUrl = (weather: string):string => {
    switch (weather) {
      case "Clouds":
        return "/Clouds.png"; 
      case "Rain":
        return "/rain_with_cloud.png"; 
      case "Mist":
        return "/Mist.png"; 
      case "Haze":  
        return "/sun.png"; 
        case "Clear" : 
        return "/Clear.png";
      default:
        return "./default.png";
    }
  }

  return (
    <>
      <div className="text-center">
        <div className="bg-black bg-gradient-to-tr from-cyan-500 to-blue-500  w-full h-[600px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center rounded-lg sm:w-[550px] sm:h-[650px]">
          <h1 className="text-white mt-20 opacity-50 text-xl font-normal">
            {currentDate.month} {currentDate.day}, {currentDate.year}
          </h1>
          {weatherData.name && (
            <div>
              <h2 className="mt-4 text-4xl font-bold text-white">{weatherData.name}</h2>

              

              <img
                className="mt-4 mx-auto"
                src={getWeatherIconUrl(weatherData.weather[0].main)}
                alt="weather picture"
                width={180}
              />

              <h2 className="text-5xl font-extrabold text-white ">{weatherData.main.temp}°C</h2>

              <h2 className=" text-white text-lg">{weatherData.weather[0].main}, feels like {weatherData.main.
feels_like}°C</h2>
            </div>
          )}

{/* (
            <div>
              <h1 className="text-4xl sm:text-5xl text-white font-bold my-5 ">Weather App</h1>


              <img className="my-4 mx-auto" width={180}
               src="./rain_with_cloud.png" alt="weather picture" />
              <h1 className="text-4xl mt-8 text-white opacity-80">Please enter the city name</h1>
            </div>
          ) */}

          <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center mt-12"
          >
            <input
              className="p-3 sm:px-12 rounded-l-md bg-gray-200 transition-all duration-150 border-none focus:outline focus:outline-gray-300 focus:bg-gray-200 focus:shadow-xl "
              type="text"
              placeholder="Search City..."
              onChange={handleInputChange}
            />
            <button
              className="text-black p-3 text-base cursor-pointer border-1 border-none transition-all duration-150
rounded-r-md bg-gray-200 active:text-gray-600 active:shadow-xl active:bg-gray-400"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default App;
