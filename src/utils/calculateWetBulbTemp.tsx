// This function calculates the wet bulb temperature based on the given temperature, humidity, and wind speed.

export function calculateWetBulbTemp(temp: number, hum: number, wind: number) {
    const wetBulbTemp =
      temp * Math.atan(0.151977 * Math.pow(hum + 8.313659, 0.5)) +
      Math.atan(temp + hum) - Math.atan(hum - 1.676331) +
      0.00391838 * Math.pow(hum, 1.5) * Math.atan(0.023101 * hum) - 4.686035;
  
    const adjustedWetBulbTemp = wetBulbTemp - (wind * (1 - hum / 100) * 0.07);
    return adjustedWetBulbTemp;
  }