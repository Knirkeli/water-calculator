import { useState } from "react";
import InputField from "../input/inputFields";
import SelectField from "../input/workoutField";
import DietSelector from "../input/dietSelector";

interface StepByStepProps {
  weight: string;
  setWeight: (v: string) => void;
  temperature: string;
  setTemperature: (v: string) => void;
  workoutType: "none" | "indoor" | "outdoor";
  setWorkoutType: (v: "none" | "indoor" | "outdoor") => void;
  workoutDuration: string;
  setWorkoutDuration: (v: string) => void;
  humidity: string;
  setHumidity: (v: string) => void;
  hoursInSun: string;
  setHoursInSun: (v: string) => void;
  windSpeed: string;
  setWindSpeed: (v: string) => void;
  diet: "normal" | "fruit" | "protein" | "carbohydrate";
  setDiet: (v: "normal" | "fruit" | "protein" | "carbohydrate") => void;
  onCalculate: (e: React.FormEvent) => void;
}

const stepExplanations = [
    "Body weight is the primary factor in determining your baseline daily water needs. Larger bodies require more water to maintain normal physiological functions.",
    "Ambient temperature affects how much you sweat. Higher temperatures increase perspiration, leading to greater water loss and a higher need for hydration.",
    "Physical activity increases your body's water loss through sweat and respiration. The type and duration of your workout directly impact how much extra water you need.",
    "Humidity affects how your body cools itself through sweating. In low humidity, sweat evaporates quickly, which cools you efficiently but increases water loss. In high humidity, sweat evaporates slowly, so your body cools less efficiently, you feel hotter, and you may sweat even more, leading to continued water loss and a higher risk of dehydration.",
    "Spending time in direct sunlight raises your body temperature and accelerates sweating, which increases your daily water requirements. The longer you are exposed to the sun, the more water you will need.",
    "Wind speed affects the evaporation rate of sweat from your skin. Higher wind speeds can increase water loss by speeding up evaporation.",
    "Your diet can contribute a significant amount of water to your daily intake. Diets rich in fruits and vegetables provide more water, while high-protein or carbohydrate-heavy diets may provide less. This step adjusts your water needs based on your typical diet."
  ];

export default function StepByStep({
  weight, setWeight,
  temperature, setTemperature,
  workoutType, setWorkoutType,
  workoutDuration, setWorkoutDuration,
  humidity, setHumidity,
  hoursInSun, setHoursInSun,
  windSpeed, setWindSpeed,
  diet, setDiet,
  onCalculate
}: StepByStepProps) {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    {
      label: "Body weight (kg)",
      field: (
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
      )
    },
    {
      label: "Temperature (°C)",
      field: (
        <InputField
          label="Temperature (°C)"
          type="number"
          step="any"
          value={temperature}
          onChange={e => setTemperature(e.target.value)}
          placeholder="e.g. 25"
          required
        />
      )
    },
    {
      label: "Workout",
      field: (
        <>
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
        </>
      )
    },
    {
      label: "Humidity (%)",
      field: (
        <InputField
          label="Humidity (%)"
          type="number"
          min={0}
          max={100}
          step="any"
          value={humidity}
          onChange={e => setHumidity(e.target.value)}
          placeholder="e.g. 50"
          required
        />
      )
    },
    {
      label: "Hours in Sunlight",
      field: (
        <InputField
          label="Hours in Sunlight"
          type="number"
          min={0}
          max={24}
          step="any"
          value={hoursInSun}
          onChange={e => setHoursInSun(e.target.value)}
          placeholder="e.g. 2"
          required
        />
      )
    },
    {
      label: "Wind Speed (m/s)",
      field: (
        <InputField
          label="Wind Speed (m/s)"
          type="number"
          min={0}
          step="any"
          value={windSpeed}
          onChange={e => setWindSpeed(e.target.value)}
          placeholder="e.g. 2"
          required
        />
      )
    },
    {
      label: "Diet",
      field: (
        <DietSelector diet={diet} setDiet={setDiet} />
      )
    }
  ];

  function handleStepNext(e: React.FormEvent) {
    e.preventDefault();
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      onCalculate(e);
    }
  }

  function handleStepBack() {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  }

  return (
    <>
      <p className="text-center text-base text-gray-600 dark:text-gray-300 mb-4">
        {stepExplanations[stepIndex]}
      </p>
      <form onSubmit={handleStepNext} className="w-full flex flex-col gap-4">
        {steps[stepIndex].field}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleStepBack}
            disabled={stepIndex === 0}
            className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition-colors"
          >
            {stepIndex === steps.length - 1 ? "Calculate" : "Next"}
          </button>
        </div>
      </form>
    </>
  );
}