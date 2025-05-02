export function calculateWaterIntake({
    weight,
    temperature,
    humidity,
    windSpeed,
    hoursInSun,
    workoutType,
    workoutDuration,
    useAdvanced,
    calculateWetBulbTemp
  }: {
    weight: number,
    temperature: number,
    humidity: number,
    windSpeed: number,
    hoursInSun: number,
    workoutType: "none" | "indoor" | "outdoor",
    workoutDuration: number,
    useAdvanced: boolean,
    calculateWetBulbTemp: (t: number, h: number, w: number) => number
  }) {
    let waterIntake = weight * 0.035;
    let wbgt: number | null = null;
  
    if (temperature > 20) {
      const extraTempFactor = (temperature - 20) * 0.01;
      waterIntake *= 1 + extraTempFactor;
    }
    if (useAdvanced) {
      const wetBulbTemp = calculateWetBulbTemp(temperature, humidity, windSpeed);
      const globeTemp = temperature + 2;
      wbgt = (0.7 * wetBulbTemp) + (0.2 * globeTemp) + (0.1 * temperature);
      waterIntake *= 1 + (wbgt / 100);
  
      if (hoursInSun > 0) {
        waterIntake *= 1 + (0.02 * hoursInSun);
      }
  
      if (workoutType === "outdoor" && workoutDuration > 0) {
        waterIntake += workoutDuration * 1.0 * (1 + wbgt / 50);
      } else if (workoutType === "indoor" && workoutDuration > 0) {
        waterIntake += workoutDuration * 0.7;
      }
    } else {
      if (workoutType === "outdoor" && workoutDuration > 0) {
        waterIntake += workoutDuration * 1.0;
      } else if (workoutType === "indoor" && workoutDuration > 0) {
        waterIntake += workoutDuration * 0.7;
      }
    }
  
    return { waterIntake, wbgt };
  }