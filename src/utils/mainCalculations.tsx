// // This function calculates the recommended water intake based on various factors.
// // It takes into account the user's weight, temperature, humidity, wind speed, hours in sunlight, workout type and duration, and whether to use advanced calculations.

// export function calculateWaterIntake({
//     weight,
//     temperature,
//     humidity,
//     windSpeed,
//     hoursInSun,
//     workoutType,
//     workoutDuration,
//     useAdvanced,
//     calculateWetBulbTemp
//   }: {
//     weight: number,
//     temperature: number,
//     humidity: number,
//     windSpeed: number,
//     hoursInSun: number,
//     workoutType: "none" | "indoor" | "outdoor",
//     workoutDuration: number,
//     useAdvanced: boolean,
//     calculateWetBulbTemp: (t: number, h: number, w: number) => number
//   }) {
//     let waterIntake = weight * 0.035;
//     let wbgt: number | null = null;
  
//     if (temperature > 20) {
//       const extraTempFactor = (temperature - 20) * 0.01;
//       waterIntake *= 1 + extraTempFactor;
//     }
//     if (useAdvanced) {
//       const wetBulbTemp = calculateWetBulbTemp(temperature, humidity, windSpeed);
//       const globeTemp = temperature + 2;
//       wbgt = (0.7 * wetBulbTemp) + (0.2 * globeTemp) + (0.1 * temperature);
//       waterIntake *= 1 + (wbgt / 100);
  
//       if (hoursInSun > 0) {
//         waterIntake *= 1 + (0.02 * hoursInSun);
//       }
  
//       if (workoutType === "outdoor" && workoutDuration > 0) {
//         waterIntake += workoutDuration * 1.0 * (1 + wbgt / 50);
//       } else if (workoutType === "indoor" && workoutDuration > 0) {
//         waterIntake += workoutDuration * 0.7;
//       }
//     } else {
//       if (workoutType === "outdoor" && workoutDuration > 0) {
//         waterIntake += workoutDuration * 1.0;
//       } else if (workoutType === "indoor" && workoutDuration > 0) {
//         waterIntake += workoutDuration * 0.7;
//       }
//     }
  
//     return { waterIntake, wbgt };
//   }

// This function calculates the recommended water intake based on various factors.
// It now also returns a breakdown of each input's effect.

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
  let breakdown: Record<string, number> = {};
  let waterIntake = weight * 0.035;
  breakdown.weight = waterIntake;

  let wbgt: number | null = null;

  // Temperature effect
  let tempMultiplier = 1;
  if (temperature > 20) {
    const extraTempFactor = (temperature - 20) * 0.01;
    tempMultiplier = 1 + extraTempFactor;
    breakdown.temperature = waterIntake * extraTempFactor;
    waterIntake *= tempMultiplier;
  } else {
    breakdown.temperature = 0;
  }

  if (useAdvanced) {
    // WBGT effect
    const wetBulbTemp = calculateWetBulbTemp(temperature, humidity, windSpeed);
    const globeTemp = temperature + 2;
    wbgt = (0.7 * wetBulbTemp) + (0.2 * globeTemp) + (0.1 * temperature);
    const wbgtMultiplier = 1 + (wbgt / 100);
    breakdown.wbgt = waterIntake * (wbgt / 100);
    waterIntake *= wbgtMultiplier;

    // Sun effect
    if (hoursInSun > 0) {
      const sunMultiplier = 1 + (0.02 * hoursInSun);
      breakdown.hoursInSun = waterIntake * (sunMultiplier - 1);
      waterIntake *= sunMultiplier;
    } else {
      breakdown.hoursInSun = 0;
    }

    // Workout effect
    if (workoutType === "outdoor" && workoutDuration > 0) {
      const workoutAdd = workoutDuration * 1.0 * (1 + wbgt / 50);
      breakdown.workout = workoutAdd;
      waterIntake += workoutAdd;
    } else if (workoutType === "indoor" && workoutDuration > 0) {
      const workoutAdd = workoutDuration * 0.7;
      breakdown.workout = workoutAdd;
      waterIntake += workoutAdd;
    } else {
      breakdown.workout = 0;
    }
  } else {
    breakdown.wbgt = 0;
    breakdown.hoursInSun = 0;
    if (workoutType === "outdoor" && workoutDuration > 0) {
      const workoutAdd = workoutDuration * 1.0;
      breakdown.workout = workoutAdd;
      waterIntake += workoutAdd;
    } else if (workoutType === "indoor" && workoutDuration > 0) {
      const workoutAdd = workoutDuration * 0.7;
      breakdown.workout = workoutAdd;
      waterIntake += workoutAdd;
    } else {
      breakdown.workout = 0;
    }
  }

  return { waterIntake, wbgt, breakdown };
}