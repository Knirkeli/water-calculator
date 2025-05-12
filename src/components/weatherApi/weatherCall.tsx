export interface WeatherData {
    temperature: string;
    humidity: string;
    windSpeed: string;
  }
  
  export async function fetchWeatherFromLocation(
    apiKey: string
  ): Promise<WeatherData | null> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser."));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async pos => {
          const { latitude, longitude } = pos.coords;
          try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch weather data.");
            const data = await res.json();
            if (data.main && data.wind) {
              resolve({
                temperature: data.main.temp.toString(),
                humidity: data.main.humidity.toString(),
                windSpeed: data.wind.speed.toString(),
              });
            } else {
              reject(new Error("Incomplete weather data received."));
            }
          } catch (e) {
            reject(e);
          }
        },
        () => reject(new Error("Unable to retrieve your location."))
      );
    });
  }