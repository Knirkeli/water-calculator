// "use client";
// import { useState } from "react";

// export default function WaterIntakeCalculator() {
//   const [weight, setWeight] = useState<string>("");
//   const [temperature, setTemperature] = useState<string>("20");
//   const [useAdvanced, setUseAdvanced] = useState<boolean>(false);
//   const [humidity, setHumidity] = useState<string>("50");
//   const [radiation, setRadiation] = useState<string>("medium");
//   const [windSpeed, setWindSpeed] = useState<string>("2");
//   const [result, setResult] = useState<number | null>(null);
//   const [wbgtResult, setWbgtResult] = useState<number | null>(null);
//   const [showPopup, setShowPopup] = useState<boolean>(false);

//   function calculateWetBulbTemp(temp: number, hum: number, wind: number) {
//     const wetBulbTemp =
//       temp * Math.atan(0.151977 * Math.pow(hum + 8.313659, 0.5)) +
//       Math.atan(temp + hum) - Math.atan(hum - 1.676331) +
//       0.00391838 * Math.pow(hum, 1.5) * Math.atan(0.023101 * hum) - 4.686035;

//     const adjustedWetBulbTemp = wetBulbTemp - (wind * (1 - hum / 100) * 0.07);
//     return adjustedWetBulbTemp;
//   }

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     const w = parseFloat(weight.replace(",", "."));
//     const temp = parseFloat(temperature.replace(",", "."));
//     const hum = useAdvanced ? parseFloat(humidity.replace(",", ".")) : 50; // Default 50% for basic mode
//     const wind = parseFloat(windSpeed.replace(",", "."));

//     if (!isNaN(w) && w > 0 && !isNaN(temp) && (!useAdvanced || (!isNaN(wind) && radiation && !isNaN(hum)))) {
//       let waterIntake = w * 0.035;

//       if (temp > 20) {
//         const extraTempFactor = (temp - 20) * 0.01;
//         waterIntake *= 1 + extraTempFactor;
//       }
//       if (useAdvanced) {
//         const wetBulbTemp = calculateWetBulbTemp(temp, hum, wind);
//         let globeTempFactor = radiation === "low" ? 0.2 : radiation === "medium" ? 0.3 : 0.4;
//         const globeTemp = temp + globeTempFactor * 5;
//         const wbgt = (0.7 * wetBulbTemp) + (0.2 * globeTemp) + (0.1 * temp);
//         waterIntake *= 1 + (wbgt / 100);
//         setWbgtResult(wbgt);
//       }

//       setResult(waterIntake);
//     } else {
//       setResult(null);
//     }
//   }

//   return (
//     <div className="w-full max-w-md bg-white dark:bg-black/40 rounded-xl shadow-lg p-8 flex flex-col items-center gap-6">
//       <h1 className="text-3xl font-bold mb-2 text-center">Water Intake Calculator</h1>
//       <p className="text-center text-base text-gray-600 dark:text-gray-300 mb-4">
//         Enter your details to calculate your recommended daily water intake.
//       </p>
//       <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
//         <label className="flex flex-col gap-2 font-medium">
//           Body weight (kg)
//           <input type="number" min="1" step="any" value={weight} onChange={e => setWeight(e.target.value)} className="border rounded px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-background text-foreground" placeholder="e.g. 70" required />
//         </label>
//         <label className="flex flex-col gap-2 font-medium">
//           Temperature (°C)
//           <input type="number" step="any" value={temperature} onChange={e => setTemperature(e.target.value)} className="border rounded px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-background text-foreground" placeholder="e.g. 25" required />
//         </label>
//         <label className="flex flex-row items-center gap-2 font-medium">
//           <input type="checkbox" checked={useAdvanced} onChange={e => setUseAdvanced(e.target.checked)} />
//           Use advanced calculation
//         </label>
//         {useAdvanced && (
//           <>
//             <label className="flex flex-col gap-2 font-medium">
//               Humidity (%)
//               <input type="number" min="0" max="100" step="any" value={humidity} onChange={e => setHumidity(e.target.value)} className="border rounded px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-background text-foreground" placeholder="e.g. 70" required />
//             </label>
//             <label className="flex flex-col gap-2 font-medium">
//               Solar Radiation Exposure
//               <select value={radiation} onChange={e => setRadiation(e.target.value)} className="border rounded px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-background text-foreground">
//                 <option value="low">Low</option>
//                 <option value="medium">Medium</option>
//                 <option value="high">High</option>
//               </select>
//             </label>
//             <label className="flex flex-col gap-2 font-medium">
//               Wind Speed (m/s)
//               <input type="number" step="any" value={windSpeed} onChange={e => setWindSpeed(e.target.value)} className="border rounded px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-background text-foreground" placeholder="e.g. 2" required />
//             </label>
//           </>
//         )}
//         <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors">
//           Calculate
//         </button>
//       </form>
//       {result !== null && (
//         <div className="mt-4 text-center">
//           <p className="text-lg">Recommended daily water intake:</p>
//           <p className="text-2xl font-bold mt-1">{result.toFixed(2)} liters</p>
//           {useAdvanced && wbgtResult !== null && (
//             <p className="text-sm text-gray-500 mt-2 cursor-pointer underline" onClick={() => setShowPopup(true)}>
//               WBGT Index: {wbgtResult.toFixed(2)}
//             </p>
//           )}
//         </div>
//       )}
//       {showPopup && (
//         <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50">
//           <div className="bg-white dark:bg-black/40 p-6 rounded-lg shadow-lg max-w-sm">
//             <h2 className="text-lg font-bold mb-2">What is WBGT?</h2>
//             <p className="text-sm text-gray-700 dark:text-gray-300">
//               WBGT (Wet Bulb Globe Temperature) measures heat stress by accounting for temperature, humidity, wind speed, and solar radiation.
//             </p>
//             <button onClick={() => setShowPopup(false)} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import { useState } from "react";

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState<string>("");
  const [temperature, setTemperature] = useState<string>("20");
  const [useAdvanced, setUseAdvanced] = useState<boolean>(false);
  const [humidity, setHumidity] = useState<string>("50");
  const [hoursInSun, setHoursInSun] = useState<string>("0");
  const [windSpeed, setWindSpeed] = useState<string>("2");
  const [result, setResult] = useState<number | null>(null);
  const [wbgtResult, setWbgtResult] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  function calculateWetBulbTemp(temp: number, hum: number, wind: number) {
    const wetBulbTemp =
      temp * Math.atan(0.151977 * Math.pow(hum + 8.313659, 0.5)) +
      Math.atan(temp + hum) - Math.atan(hum - 1.676331) +
      0.00391838 * Math.pow(hum, 1.5) * Math.atan(0.023101 * hum) - 4.686035;

    const adjustedWetBulbTemp = wetBulbTemp - (wind * (1 - hum / 100) * 0.07);
    return adjustedWetBulbTemp;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const w = parseFloat(weight.replace(",", "."));
    const temp = parseFloat(temperature.replace(",", "."));
    const hum = useAdvanced ? parseFloat(humidity.replace(",", ".")) : 50;
    const wind = parseFloat(windSpeed.replace(",", "."));
    const sunHours = useAdvanced ? parseFloat(hoursInSun.replace(",", ".")) : 0;

    if (
      !isNaN(w) && w > 0 &&
      !isNaN(temp) &&
      (!useAdvanced || (!isNaN(wind) && !isNaN(hum) && !isNaN(sunHours)))
    ) {
      let waterIntake = w * 0.035;

      if (temp > 20) {
        const extraTempFactor = (temp - 20) * 0.01;
        waterIntake *= 1 + extraTempFactor;
      }
      if (useAdvanced) {
        const wetBulbTemp = calculateWetBulbTemp(temp, hum, wind);
        const globeTemp = temp + 2; // simple adjustment
        const wbgt = (0.7 * wetBulbTemp) + (0.2 * globeTemp) + (0.1 * temp);
        waterIntake *= 1 + (wbgt / 100);

        // Add 2% per hour in sun
        if (sunHours > 0) {
          waterIntake *= 1 + (0.02 * sunHours);
        }
        setWbgtResult(wbgt);
      }

      setResult(waterIntake);
    } else {
      setResult(null);
    }
  }

  return (
    <div className="w-full max-w-md bg-white dark:bg-black/40 rounded-xl shadow-lg p-8 flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold mb-2 text-center">Water Intake Calculator</h1>
      <p className="text-center text-base text-gray-600 dark:text-gray-300 mb-4">
        Enter your details to calculate your recommended daily water intake.
      </p>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <label className="flex flex-col gap-2 font-medium">
          Body weight (kg)
          <input type="number" min="1" step="any" value={weight} onChange={e => setWeight(e.target.value)} className="border rounded px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-background text-foreground" placeholder="e.g. 70" required />
        </label>
        <label className="flex flex-col gap-2 font-medium">
          Temperature (°C)
          <input type="number" step="any" value={temperature} onChange={e => setTemperature(e.target.value)} className="border rounded px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-background text-foreground" placeholder="e.g. 25" required />
        </label>
        <label className="flex flex-row items-center gap-2 font-medium">
          <input type="checkbox" checked={useAdvanced} onChange={e => setUseAdvanced(e.target.checked)} />
          Use advanced calculation
        </label>
        {useAdvanced && (
          <>
            <label className="flex flex-col gap-2 font-medium">
              Humidity (%)
              <input type="number" min="0" max="100" step="any" value={humidity} onChange={e => setHumidity(e.target.value)} className="border rounded px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-background text-foreground" placeholder="e.g. 70" required />
            </label>
            <label className="flex flex-col gap-2 font-medium">
              Hours in Sunlight
              <input type="number" min="0" max="24" step="any" value={hoursInSun} onChange={e => setHoursInSun(e.target.value)} className="border rounded px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-background text-foreground" placeholder="e.g. 3" required />
            </label>
            <label className="flex flex-col gap-2 font-medium">
              Wind Speed (m/s)
              <input type="number" step="any" value={windSpeed} onChange={e => setWindSpeed(e.target.value)} className="border rounded px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-background text-foreground" placeholder="e.g. 2" required />
            </label>
          </>
        )}
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors">
          Calculate
        </button>
      </form>
      {result !== null && (
        <div className="mt-4 text-center">
          <p className="text-lg">Recommended daily water intake:</p>
          <p className="text-2xl font-bold mt-1">{result.toFixed(2)} liters</p>
          {useAdvanced && wbgtResult !== null && (
            <p className="text-sm text-gray-500 mt-2 cursor-pointer underline" onClick={() => setShowPopup(true)}>
              WBGT Index: {wbgtResult.toFixed(2)}
            </p>
          )}
        </div>
      )}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50">
          <div className="bg-white dark:bg-black/40 p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-lg font-bold mb-2">What is WBGT?</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              WBGT (Wet Bulb Globe Temperature) measures heat stress by accounting for temperature, humidity, wind speed, and sunlight exposure.
            </p>
            <button onClick={() => setShowPopup(false)} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}