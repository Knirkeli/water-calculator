// import React from "react";

// interface CalculationDetailsPopupProps {
//   open: boolean;
//   onClose: () => void;
//   values: {
//     weight?: string;
//     temperature?: string;
//     humidity?: string;
//     windSpeed?: string;
//     hoursInSun?: string;
//     workoutType?: string;
//     workoutDuration?: string;
//     diet?: string;
//     waterIntake?: number | null;
//     wbgt?: number | null;
//     waterFromDiet?: number;
//   };
// }

// export default function CalculationDetailsPopup({ open, onClose, values }: CalculationDetailsPopupProps) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//       <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 max-w-lg w-full relative">
//         <button
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
//           onClick={onClose}
//           aria-label="Close"
//         >
//           ×
//         </button>
//         <h2 className="text-xl font-bold mb-4">Calculation Details</h2>
//         <div className="whitespace-pre-wrap text-sm">
//           <div>Inputs:</div>
//           {values.weight && <div>- Weight: {values.weight} kg</div>}
//           {values.temperature && <div>- Temperature: {values.temperature} °C</div>}
//           {values.humidity && <div>- Humidity: {values.humidity} %</div>}
//           {values.windSpeed && <div>- Wind Speed: {values.windSpeed} m/s</div>}
//           {values.hoursInSun && <div>- Hours in Sun: {values.hoursInSun}</div>}
//           {values.workoutType && values.workoutType !== "none" && (
//             <div>- Workout: {values.workoutType} ({values.workoutDuration} h)</div>
//           )}
//           {values.diet && <div>- Diet: {values.diet}</div>}
//           <br />
//           <div>Calculation:</div>
//           {typeof values.waterIntake === "number" && (
//             <div>- Raw water intake: {values.waterIntake.toFixed(2)} liters</div>
//           )}
//           {typeof values.waterFromDiet === "number" && (
//             <div>- Water from diet: {values.waterFromDiet.toFixed(2)} liters</div>
//           )}
//           <br />
//           <div>Result:</div>
//           {typeof values.waterIntake === "number" && typeof values.waterFromDiet === "number" && (
//             <div>
//               - Recommended daily water intake: {(Math.max(values.waterIntake - values.waterFromDiet, 0)).toFixed(2)} liters
//             </div>
//           )}
//           {typeof values.wbgt === "number" && (
//             <div>- WBGT Index: {values.wbgt.toFixed(2)}</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";

interface CalculationDetailsPopupProps {
  open: boolean;
  onClose: () => void;
  values: {
    weight?: string;
    temperature?: string;
    humidity?: string;
    windSpeed?: string;
    hoursInSun?: string;
    workoutType?: string;
    workoutDuration?: string;
    diet?: string;
    waterIntake?: number | null;
    wbgt?: number | null;
    waterFromDiet?: number;
    breakdown?: Record<string, number>;
    finalResult?: number | null;
  };
}
type ValuesType = CalculationDetailsPopupProps["values"];

const explanations: Record<string, (values: ValuesType, breakdown: Record<string, number>) => string> = {
    weight: (values, breakdown) =>
      `Your body weight sets the baseline for water needs. We use the formula: weight (kg) × 0.035 L. For your input (${values.weight} kg), this gives ${breakdown.weight?.toFixed(2)} L.`,
    temperature: (values, breakdown) =>
      `Higher temperatures increase water needs. For each degree above 20°C, we add 1% to your baseline. Your input (${values.temperature}°C) results in ${breakdown.temperature?.toFixed(2)} L extra.`,
    wbgt: (values, breakdown) =>
      `The Wet Bulb Globe Temperature (WBGT) combines temperature, humidity, wind, and sun to estimate heat stress. We add 1% to your baseline per WBGT point. Your WBGT effect: ${breakdown.wbgt?.toFixed(2)} L.`,
    hoursInSun: (values, breakdown) =>
      `Time in sun increases water needs. For each hour, we add 2% to your baseline. Your input (${values.hoursInSun} h) results in ${breakdown.hoursInSun?.toFixed(2)} L extra.`,
    humidity: (values) =>
      `Humidity affects sweat evaporation and cooling. Your input: ${values.humidity}%. This is factored into the WBGT calculation above.`,
    windSpeed: (values) =>
      `Wind speed affects sweat evaporation and cooling. Your input: ${values.windSpeed} m/s. This is factored into the WBGT calculation above.`,
    workout: (values, breakdown) =>
      `Physical activity increases water loss. For indoor: duration × 0.7 L. For outdoor: duration × 1.0 L × (1 + WBGT/50). Your input (${values.workoutType}, ${values.workoutDuration} h) adds ${breakdown.workout?.toFixed(2)} L.`,
    diet: (values) =>
      `Your diet provides some water. We subtract a fixed amount based on your diet type (${values.diet}).`
  };

export default function CalculationDetailsPopup({ open, onClose, values }: CalculationDetailsPopupProps) {
  if (!open) return null;
  const { breakdown = {} } = values;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 pt-20">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 max-w-lg w-full relative">
        <button
          className="absolute top-4 right-4 text-gray-500 text-2xl hover:text-gray-800"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Calculation Details</h2>
        <div className="space-y-4 text-sm max-h-[80vh] overflow-y-auto">
        {values.weight && (
  <div>
    <strong>Weight:</strong> {values.weight} kg
    <div className="text-gray-300">{explanations.weight(values, breakdown)}</div>
    {breakdown.weight !== undefined && (
      <div className="text-blue-700">+{breakdown.weight.toFixed(2)} L</div>
    )}
  </div>
)}
{values.temperature && (
  <div>
    <strong>Temperature:</strong> {values.temperature} °C
    <div className="text-gray-300">{explanations.temperature(values, breakdown)}</div>
    {breakdown.temperature !== undefined && (
      <div className="text-blue-700">{breakdown.temperature >= 0 ? "+" : ""}{breakdown.temperature.toFixed(2)} L</div>
    )}
  </div>
)}
{breakdown.wbgt !== undefined && (
  <div>
    <strong>WBGT effect:</strong>
    <div className="text-gray-300">{explanations.wbgt(values, breakdown)}</div>
    <div className="text-blue-700">{breakdown.wbgt >= 0 ? "+" : ""}{breakdown.wbgt.toFixed(2)} L</div>
  </div>
)}
{values.hoursInSun && (
  <div>
    <strong>Hours in Sun:</strong> {values.hoursInSun}
    <div className="text-gray-300">{explanations.hoursInSun(values, breakdown)}</div>
    {breakdown.hoursInSun !== undefined && (
      <div className="text-blue-700">{breakdown.hoursInSun >= 0 ? "+" : ""}{breakdown.hoursInSun.toFixed(2)} L</div>
    )}
  </div>
)}
{values.humidity && (
  <div>
    <strong>Humidity:</strong> {values.humidity} %
    <div className="text-gray-300">{explanations.humidity(values, breakdown)}</div>
  </div>
)}
{values.windSpeed && (
  <div>
    <strong>Wind Speed:</strong> {values.windSpeed} m/s
    <div className="text-gray-300">{explanations.windSpeed(values, breakdown)}</div>
  </div>
)}
{values.workoutType && values.workoutType !== "none" && (
  <div>
    <strong>Workout:</strong> {values.workoutType} ({values.workoutDuration} h)
    <div className="text-gray-300">{explanations.workout(values, breakdown)}</div>
    {breakdown.workout !== undefined && (
      <div className="text-blue-700">{breakdown.workout >= 0 ? "+" : ""}{breakdown.workout.toFixed(2)} L</div>
    )}
  </div>
)}
{values.diet && (
  <div>
    <strong>Diet:</strong> {values.diet}
    <div className="text-gray-300">{explanations.diet(values, breakdown)}</div>
    {typeof values.waterFromDiet === "number" && (
      <div className="text-blue-700">-{values.waterFromDiet.toFixed(2)} L</div>
    )}
  </div>
)}
          <hr />
          <div>
          <strong>Calculation:</strong>
  {typeof values.waterIntake === "number" && (
    <div>- Raw water intake need: {values.waterIntake.toFixed(2)} liters</div>
  )}
  {typeof values.waterFromDiet === "number" && (
    <div>- Water from diet: {values.waterFromDiet.toFixed(2)} liters</div>
  )}
</div>
<div>
  <strong>Result:</strong>
  {typeof values.finalResult === "number" && (
    <div>
      - Recommended daily water intake: {values.finalResult.toFixed(2)} liters
    </div>
  )}
  {typeof values.wbgt === "number" && (
    <div>- WBGT Index: {values.wbgt.toFixed(2)}</div>
  )}
</div>
        </div>
      </div>
    </div>
  );
}