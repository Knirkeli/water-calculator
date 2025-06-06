"use client";
// This component is used to select the diet type for the water intake calculator
// It allows the user to choose between normal, fruit heavy, protein heavy, and carbohydrate heavy diets

interface DietSelectorProps {
  diet: "normal" | "fruit" | "protein" | "carbohydrate";
  setDiet: (diet: "normal" | "fruit" | "protein" | "carbohydrate") => void;
}

export default function DietSelector({ diet, setDiet }: DietSelectorProps) {
  return (
    <label className="block w-full">
      <span className="block mb-1 font-medium">Diet type</span>
      <select
        value={diet}
        onChange={e => setDiet(e.target.value as "normal" | "fruit" | "protein" | "carbohydrate")}
        className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="normal">Normal</option>
        <option value="fruit">Fruit heavy</option>
        <option value="protein">Protein heavy</option>
        <option value="carbohydrate">Carbohydrate heavy</option>
      </select>
    </label>
  );
}