"use client";
import { useState } from "react";
import { calculateWetBulbTemp } from "../../utils/calculateWetBulbTemp";
import { calculateWaterIntake } from "../../utils/waterIntakeCalculator";
import InputField from "../ui/inputFields";
import WBGTInfoPopup from "../ui/popup";
import WaterResult from "./calcResult";
import SelectField from "../ui/workoutField";

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState<string>("");
  const [temperature, setTemperature] = useState<string>("20");
  const [useAdvanced, setUseAdvanced] = useState<boolean>(false);
  const [humidity, setHumidity] = useState<string>("50");
  const [hoursInSun, setHoursInSun] = useState<string>("0");
  const [windSpeed, setWindSpeed] = useState<string>("2");
  const [workoutType, setWorkoutType] = useState<"none" | "indoor" | "outdoor">("none");
  const [workoutDuration, setWorkoutDuration] = useState<string>("0");
  const [result, setResult] = useState<number | null>(null);
  const [wbgtResult, setWbgtResult] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const w = parseFloat(weight.replace(",", "."));
    const temp = parseFloat(temperature.replace(",", "."));
    const hum = useAdvanced ? parseFloat(humidity.replace(",", ".")) : 50;
    const wind = parseFloat(windSpeed.replace(",", "."));
    const sunHours = useAdvanced ? parseFloat(hoursInSun.replace(",", ".")) : 0;
    const duration = parseFloat(workoutDuration.replace(",", "."));

    if (
      !isNaN(w) && w > 0 &&
      !isNaN(temp) &&
      (!useAdvanced || (!isNaN(wind) && !isNaN(hum) && !isNaN(sunHours))) &&
      (!isNaN(duration) && duration >= 0)
    ) {
      const { waterIntake, wbgt } = calculateWaterIntake({
        weight: w,
        temperature: temp,
        humidity: hum,
        windSpeed: wind,
        hoursInSun: sunHours,
        workoutType,
        workoutDuration: duration,
        useAdvanced,
        calculateWetBulbTemp
      });
      setResult(waterIntake);
      setWbgtResult(wbgt);
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
          <>
            <InputField
              label="Humidity (%)"
              type="number"
              min={0}
              max={100}
              step="any"
              value={humidity}
              onChange={e => setHumidity(e.target.value)}
              placeholder="e.g. 70"
              required
            />
            <InputField
              label="Hours in Sunlight"
              type="number"
              min={0}
              max={24}
              step="any"
              value={hoursInSun}
              onChange={e => setHoursInSun(e.target.value)}
              placeholder="e.g. 3"
              required
            />
            <InputField
              label="Wind Speed (m/s)"
              type="number"
              step="any"
              value={windSpeed}
              onChange={e => setWindSpeed(e.target.value)}
              placeholder="e.g. 2"
              required
            />
          </>
        )}
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors">
          Calculate
        </button>
      </form>
      <WaterResult
  result={result}
  useAdvanced={useAdvanced}
  wbgtResult={wbgtResult}
  onShowPopup={() => setShowPopup(true)}
/>
      {showPopup && <WBGTInfoPopup onClose={() => setShowPopup(false)} />} 
    </div>
  );
}