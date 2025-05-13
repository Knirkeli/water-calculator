// "use client";

// import { useState } from "react";
// import { calculateWetBulbTemp } from "../../utils/calculateWetBulbTemp";
// import { calculateWaterIntake } from "../../utils/mainCalculations";
// import InputField from "../input/inputFields";
// import AdvancedFields from "../input/advancedFields";
// import WBGTInfoPopup from "../ui/popup";
// import WaterResult from "./calcResult";
// import SelectField from "../input/workoutField";
// import DietSelector from "../input/dietSelector";
// import DIET_WATER_GAIN from "../../constants/dietWaterGains";
// import StepByStep from "./stepByStep";
// import CalculationDetailsPopup from "../ui/calculationDetails";
// import { fetchWeatherFromLocation } from "../weatherApi/weatherCall";

// export default function WaterIntakeCalculator() {
//   const [weight, setWeight] = useState<string>("");
//   const [temperature, setTemperature] = useState<string>("");
//   const [useAdvanced, setUseAdvanced] = useState<boolean>(false);
//   const [humidity, setHumidity] = useState<string>("");
//   const [hoursInSun, setHoursInSun] = useState<string>("");
//   const [windSpeed, setWindSpeed] = useState<string>("");
//   const [workoutType, setWorkoutType] = useState<"none" | "indoor" | "outdoor">("none");
//   const [workoutDuration, setWorkoutDuration] = useState<string>("0");
//   const [result, setResult] = useState<number | null>(null);
//   const [wbgtResult, setWbgtResult] = useState<number | null>(null);
//   const [showPopup, setShowPopup] = useState<boolean>(false);
//   const [diet, setDiet] = useState<"normal" | "fruit" | "protein" | "carbohydrate">("normal");
//   const [showDetails, setShowDetails] = useState(false);
//   const [rawWaterIntake, setRawWaterIntake] = useState<number | null>(null);
//   const [waterFromDiet, setWaterFromDiet] = useState<number>(DIET_WATER_GAIN[diet]);
 

//   // Step-by-step mode state
//   const [stepMode, setStepMode] = useState(false);

//   // Fetch weather data from location
//   const handleFillWeather = async () => {
//     setLoadingWeather(true);
//     try {
//       const apiKey = "YOUR_OPENWEATHER_API_KEY";
//       const weather = await fetchWeatherFromLocation(apiKey);
//       if (weather) {
//         setTemperature(weather.temperature);
//         setHumidity(weather.humidity);
//         setWindSpeed(weather.windSpeed);
//       }
//     } catch (e) {
//       alert(e.message || "Failed to fetch weather data.");
//     }
//     setLoadingWeather(false);
//   };

// // Handles the calculation and result setting
// function handleSubmit(e: React.FormEvent) {
//   e.preventDefault();
//   const w = parseFloat(weight.replace(",", "."));
//   const temp = parseFloat(temperature.replace(",", "."));
//   const hum = stepMode || useAdvanced ? parseFloat(humidity.replace(",", ".")) : 50;
//   const wind = stepMode || useAdvanced ? parseFloat(windSpeed.replace(",", ".")) : 0;
//   const sunHours = stepMode || useAdvanced ? parseFloat(hoursInSun.replace(",", ".")) : 0;
//   const duration = parseFloat(workoutDuration.replace(",", "."));
//   const waterFromDiet = DIET_WATER_GAIN[diet];
// setWaterFromDiet(waterFromDiet);

//   if (
//     !isNaN(w) && w > 0 &&
//     !isNaN(temp) &&
//     (!stepMode && !useAdvanced || (!isNaN(wind) && !isNaN(hum) && !isNaN(sunHours))) &&
//     (!isNaN(duration) && duration >= 0)
//   ) {
//     // Get breakdown from calculation
//     const { waterIntake, wbgt, breakdown } = calculateWaterIntake({
//       weight: w,
//       temperature: temp,
//       humidity: hum,
//       windSpeed: wind,
//       hoursInSun: sunHours,
//       workoutType,
//       workoutDuration: duration,
//       useAdvanced: stepMode ? true : useAdvanced,
//       calculateWetBulbTemp
//     });
//     const waterFromDiet = DIET_WATER_GAIN[diet];
//     const finalResult = Math.max(waterIntake - waterFromDiet, 0);

//     setRawWaterIntake(waterIntake);
//     setResult(finalResult);
//     setWbgtResult(wbgt);
//     setBreakdown(breakdown);
//   } else {
//     setResult(null);
//     setBreakdown(undefined);
//   }
// }

// const [breakdown, setBreakdown] = useState<Record<string, number> | undefined>(undefined);

// // Always enable advanced in step mode
// if (stepMode && !useAdvanced) setUseAdvanced(true);

//   // Always enable advanced in step mode
//   if (stepMode && !useAdvanced) setUseAdvanced(true);

//   return (
//     <div className="w-full max-w-md bg-white dark:bg-black/40 rounded-xl shadow-lg p-8 pt-6 flex flex-col items-center gap-6">
//       <h1 className="text-3xl font-bold mb-2 text-center">Water Intake Calculator</h1>
//       <button
//         className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors px-4"
//         onClick={() => setStepMode(!stepMode)}
//         type="button"
//       >
//         {stepMode ? "Switch to normal mode" : "Try step-by-step mode"}
//       </button>
//       {stepMode ? (
//         <StepByStep
//           weight={weight}
//           setWeight={setWeight}
//           temperature={temperature}
//           setTemperature={setTemperature}
//           workoutType={workoutType}
//           setWorkoutType={setWorkoutType}
//           workoutDuration={workoutDuration}
//           setWorkoutDuration={setWorkoutDuration}
//           humidity={humidity}
//           setHumidity={setHumidity}
//           hoursInSun={hoursInSun}
//           setHoursInSun={setHoursInSun}
//           windSpeed={windSpeed}
//           setWindSpeed={setWindSpeed}
//           diet={diet}
//           setDiet={setDiet}
//           onCalculate={handleSubmit}
//         />
//       ) : (
//         <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
//           <InputField
//             label="Body weight (kg)"
//             type="number"
//             min={1}
//             step="any"
//             value={weight}
//             onChange={e => setWeight(e.target.value)}
//             placeholder="e.g. 70"
//             required
//           />
//           <InputField
//             label="Temperature (°C)"
//             type="number"
//             step="any"
//             value={temperature}
//             onChange={e => setTemperature(e.target.value)}
//             placeholder="e.g. 25"
//             required
//           />
//           <SelectField
//             label="Workout"
//             value={workoutType}
//             onChange={e => setWorkoutType(e.target.value as "none" | "indoor" | "outdoor")}
//             options={[
//               { value: "none", label: "No workout" },
//               { value: "indoor", label: "Indoor" },
//               { value: "outdoor", label: "Outdoor" }
//             ]}
//           />
//           {workoutType !== "none" && (
//             <InputField
//               label="Workout duration (hours)"
//               type="number"
//               min={0}
//               step="any"
//               value={workoutDuration}
//               onChange={e => setWorkoutDuration(e.target.value)}
//               placeholder="e.g. 1"
//               required
//             />
//           )}
//           <label className="flex flex-row items-center gap-2 font-medium">
//             <input type="checkbox" checked={useAdvanced} onChange={e => setUseAdvanced(e.target.checked)} />
//             Use advanced calculation
//           </label>
//           {useAdvanced && (
//             <AdvancedFields
//               humidity={humidity}
//               setHumidity={setHumidity}
//               hoursInSun={hoursInSun}
//               setHoursInSun={setHoursInSun}
//               windSpeed={windSpeed}
//               setWindSpeed={setWindSpeed}
//             />
//           )}
//           <DietSelector diet={diet} setDiet={setDiet} />
//           <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors"
//           onClick={() => {
//             setTimeout(() => {
//               window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth"});
//             }, 200);
//           }}>
//             Calculate
//           </button>
//         </form>
//       )}
//       <WaterResult
//         result={result}
//         useAdvanced={stepMode ? true : useAdvanced}
//         wbgtResult={wbgtResult}
//         onShowPopup={() => setShowPopup(true)}
//       />
//             <button
//         className="mt-4 underline text-blue-600"
//         onClick={() => setShowDetails(true)}
//         type="button"
//       >
//         Show calculation details
//       </button>
//       <CalculationDetailsPopup
//         open={showDetails}
//         onClose={() => setShowDetails(false)}
//         values={{
//           weight,
//           temperature,
//           humidity: (stepMode || useAdvanced) ? humidity : undefined,
//           windSpeed: (stepMode || useAdvanced) ? windSpeed : undefined,
//           hoursInSun: (stepMode || useAdvanced) ? hoursInSun : undefined,
//           workoutType,
//           workoutDuration,
//           diet,
//           waterIntake: rawWaterIntake,      // raw, before diet subtraction
//           waterFromDiet,    // water from diet
//           finalResult: result, // after diet subtraction
//           wbgt: wbgtResult,
//           breakdown
//         }}
//       />
//       {showPopup && <WBGTInfoPopup onClose={() => setShowPopup(false)} />}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { calculateWetBulbTemp } from "../../utils/calculateWetBulbTemp";
import { calculateWaterIntake } from "../../utils/mainCalculations";
import InputField from "../input/inputFields";
import AdvancedFields from "../input/advancedFields";
import WBGTInfoPopup from "../ui/popup";
import WaterResult from "./calcResult";
import SelectField from "../input/workoutField";
import DietSelector from "../input/dietSelector";
import DIET_WATER_GAIN from "../../constants/dietWaterGains";
import StepByStep from "./stepByStep";
import CalculationDetailsPopup from "../ui/calculationDetails";
import { fetchWeatherFromLocation } from "../weatherApi/weatherCall";
import CookieNotifier from "../ui/cookieNotifier";

// look for the cookie and deactivate the auto-fill button if it is not accepted
const COOKIE_NAME = "weather_cookie_consent";

function getCookie(name: string) {
  return document.cookie.split("; ").find(row => row.startsWith(name + "="))?.split("=")[1];
}

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState<string>("");
  const [temperature, setTemperature] = useState<string>("");
  const [useAdvanced, setUseAdvanced] = useState<boolean>(false);
  const [humidity, setHumidity] = useState<string>("");
  const [hoursInSun, setHoursInSun] = useState<string>("");
  const [windSpeed, setWindSpeed] = useState<string>("");
  const [workoutType, setWorkoutType] = useState<"none" | "indoor" | "outdoor">("none");
  const [workoutDuration, setWorkoutDuration] = useState<string>("0");
  const [result, setResult] = useState<number | null>(null);
  const [wbgtResult, setWbgtResult] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [diet, setDiet] = useState<"normal" | "fruit" | "protein" | "carbohydrate">("normal");
  const [showDetails, setShowDetails] = useState(false);
  const [rawWaterIntake, setRawWaterIntake] = useState<number | null>(null);
  const [waterFromDiet, setWaterFromDiet] = useState<number>(DIET_WATER_GAIN[diet]);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [breakdown, setBreakdown] = useState<Record<string, number> | undefined>(undefined);
  const [stepMode, setStepMode] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<string | undefined>(undefined);

  useEffect(() => {
    setCookieConsent(getCookie(COOKIE_NAME));
  }, []);

  // Weather auto-fill handler
  const handleFillWeather = async () => {
    setLoadingWeather(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "";
      if (!apiKey) {
        alert("API key for OpenWeather is missing.");
        setLoadingWeather(false);
        return;
      }
      const weather = await fetchWeatherFromLocation(apiKey);
      if (weather) {
        setTemperature(weather.temperature);
        setHumidity(weather.humidity);
        setWindSpeed(weather.windSpeed);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert("Failed to fetch weather data.");
      }
    }
    setLoadingWeather(false);
  };

  

  // Handles the calculation and result setting
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const w = parseFloat(weight.replace(",", "."));
    const temp = parseFloat(temperature.replace(",", "."));
    const hum = stepMode || useAdvanced ? parseFloat(humidity.replace(",", ".")) : 50;
    const wind = stepMode || useAdvanced ? parseFloat(windSpeed.replace(",", ".")) : 0;
    const sunHours = stepMode || useAdvanced ? parseFloat(hoursInSun.replace(",", ".")) : 0;
    const duration = parseFloat(workoutDuration.replace(",", "."));
    const waterFromDiet = DIET_WATER_GAIN[diet];
    setWaterFromDiet(waterFromDiet);

    if (
      !isNaN(w) && w > 0 &&
      !isNaN(temp) &&
      (!stepMode && !useAdvanced || (!isNaN(wind) && !isNaN(hum) && !isNaN(sunHours))) &&
      (!isNaN(duration) && duration >= 0)
    ) {
      // Get breakdown from calculation
      const { waterIntake, wbgt, breakdown } = calculateWaterIntake({
        weight: w,
        temperature: temp,
        humidity: hum,
        windSpeed: wind,
        hoursInSun: sunHours,
        workoutType,
        workoutDuration: duration,
        useAdvanced: stepMode ? true : useAdvanced,
        calculateWetBulbTemp
      });
      const finalResult = Math.max(waterIntake - waterFromDiet, 0);

      setRawWaterIntake(waterIntake);
      setResult(finalResult);
      setWbgtResult(wbgt);
      setBreakdown(breakdown);
    } else {
      setResult(null);
      setBreakdown(undefined);
    }
  }

  // Always enable advanced in step mode
  if (stepMode && !useAdvanced) setUseAdvanced(true);

  return (
    <div className="w-full max-w-md bg-white dark:bg-black/40 rounded-xl shadow-lg p-8 pt-6 flex flex-col items-center gap-6">
      <CookieNotifier onConsentChange={setCookieConsent} />   
      <div className="flex flex-row items-center mb-4">
      <img src="/Vannlogo.png" alt="Water calculator logo" className="mx-auto mb-4 w-24 h-24" />
      <h1 className="text-3xl font-bold mb-2 text-center">Water Intake Calculator</h1></div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors px-4 w-full"
        onClick={() => setStepMode(!stepMode)}
        type="button"
      >
        {stepMode ? "Switch to normal mode" : "Try step-by-step mode"}
      </button>
      <button
        type="button"
        className={`mb-2 font-semibold py-2 rounded transition-colors px-4 w-full ${
          loadingWeather || cookieConsent === "no"
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
        onClick={handleFillWeather}
        disabled={loadingWeather || cookieConsent === "no"}
      >
        {loadingWeather ? "Loading weather..." : "Auto-fill weather data"}
      </button>
      {stepMode ? (
        <StepByStep
          weight={weight}
          setWeight={setWeight}
          temperature={temperature}
          setTemperature={setTemperature}
          workoutType={workoutType}
          setWorkoutType={setWorkoutType}
          workoutDuration={workoutDuration}
          setWorkoutDuration={setWorkoutDuration}
          humidity={humidity}
          setHumidity={setHumidity}
          hoursInSun={hoursInSun}
          setHoursInSun={setHoursInSun}
          windSpeed={windSpeed}
          setWindSpeed={setWindSpeed}
          diet={diet}
          setDiet={setDiet}
          onCalculate={handleSubmit}
        />
      ) : (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <InputField
            label="Body weight (kg)"
            type="number"
            min={1}
            step="any"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            placeholder="e.g. 70"
            required
          />
          <InputField
            label="Temperature (°C)"
            type="number"
            step="any"
            value={temperature}
            onChange={e => setTemperature(e.target.value)}
            placeholder="e.g. 25"
            required
          />
          <SelectField
            label="Workout"
            value={workoutType}
            onChange={e => setWorkoutType(e.target.value as "none" | "indoor" | "outdoor")}
            options={[
              { value: "none", label: "No workout" },
              { value: "indoor", label: "Indoor" },
              { value: "outdoor", label: "Outdoor" }
            ]}
          />
          {workoutType !== "none" && (
            <InputField
              label="Workout duration (hours)"
              type="number"
              min={0}
              step="any"
              value={workoutDuration}
              onChange={e => setWorkoutDuration(e.target.value)}
              placeholder="e.g. 1"
              required
            />
          )}
          <label className="flex flex-row items-center gap-2 font-medium">
            <input type="checkbox" checked={useAdvanced} onChange={e => setUseAdvanced(e.target.checked)} />
            Use advanced calculation
          </label>
          {useAdvanced && (
            <AdvancedFields
              humidity={humidity}
              setHumidity={setHumidity}
              hoursInSun={hoursInSun}
              setHoursInSun={setHoursInSun}
              windSpeed={windSpeed}
              setWindSpeed={setWindSpeed}
            />
          )}
          <DietSelector diet={diet} setDiet={setDiet} />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors"
            onClick={() => {
              setTimeout(() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
              }, 200);
            }}
          >
            Calculate
          </button>
        </form>
      )}
      <WaterResult
        result={result}
        useAdvanced={stepMode ? true : useAdvanced}
        wbgtResult={wbgtResult}
        onShowPopup={() => setShowPopup(true)}
      />
      <button
        className="mt-4 underline text-blue-600"
        onClick={() => setShowDetails(true)}
        type="button"
      >
        Show calculation details
      </button>
      <CalculationDetailsPopup
        open={showDetails}
        onClose={() => setShowDetails(false)}
        values={{
          weight,
          temperature,
          humidity: (stepMode || useAdvanced) ? humidity : undefined,
          windSpeed: (stepMode || useAdvanced) ? windSpeed : undefined,
          hoursInSun: (stepMode || useAdvanced) ? hoursInSun : undefined,
          workoutType,
          workoutDuration,
          diet,
          waterIntake: rawWaterIntake,      // raw, before diet subtraction
          waterFromDiet,    // water from diet
          finalResult: result, // after diet subtraction
          wbgt: wbgtResult,
          breakdown
        }}
      />
      {showPopup && <WBGTInfoPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}