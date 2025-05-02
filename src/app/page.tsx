// "use client";
// import { useState } from "react";

// export default function Home() {
//   const [weight, setWeight] = useState<string>("");
//   const [result, setResult] = useState<number | null>(null);

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     const w = parseFloat(weight.replace(",", "."));
//     if (!isNaN(w) && w > 0) {
//       setResult(w * 0.035); // 35ml per kg = 0.035L per kg
//     } else {
//       setResult(null);
//     }
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
//       <main className="w-full max-w-md bg-white dark:bg-black/40 rounded-xl shadow-lg p-8 flex flex-col items-center gap-6">
//         <h1 className="text-3xl font-bold mb-2 text-center">Water Intake Calculator</h1>
//         <p className="text-center text-base text-gray-600 dark:text-gray-300 mb-4">
//           Enter your body weight to calculate your recommended daily water intake.
//         </p>
//         <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
//           <label className="flex flex-col gap-2 font-medium">
//             Body weight (kg)
//             <input
//               type="number"
//               min="1"
//               step="any"
//               value={weight}
//               onChange={e => setWeight(e.target.value)}
//               className="border rounded px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-background text-foreground"
//               placeholder="e.g. 70"
//               required
//             />
//           </label>
//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors"
//           >
//             Calculate
//           </button>
//         </form>
//         {result !== null && (
//           <div className="mt-4 text-center">
//             <p className="text-lg">
//               Recommended daily water intake:
//             </p>
//             <p className="text-2xl font-bold mt-1">
//               {result.toFixed(2)} liters
//             </p>
//             <p className="text-xs text-gray-500 mt-2">
//               (Based on 35 ml per kg of body weight)
//             </p>
//           </div>
//         )}
//       </main>
//       <footer className="mt-8 text-sm text-gray-400">
//         &copy; {new Date().getFullYear()} Water Intake Calculator
//       </footer>
//     </div>
//   );
// }

"use client";
import WaterIntakeCalculator from "../components/calculator/WaterIntakeCalculator";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <WaterIntakeCalculator />
      <footer className="mt-8 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Water Intake Calculator
      </footer>
    </div>
  );
}