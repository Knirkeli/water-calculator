"use client";
interface DietSelectorProps {
  diet: "normal" | "fruit" | "protein" | "carbohydrate";
  setDiet: (diet: "normal" | "fruit" | "protein" | "carbohydrate") => void;
}

export default function DietSelector({ diet, setDiet }: DietSelectorProps) {
  return (
    <label className="block mt-4">
      Diet type:
      <select
  value={diet}
  onChange={e => setDiet(e.target.value as "normal" | "fruit" | "protein" | "carbohydrate")}
  className="text-center ml-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
    <option value="normal">Normal</option>
    <option value="fruit">Fruit heavy</option>
    <option value="protein">Protein heavy</option>
    <option value="carbohydrate">Carbohydrate heavy</option>
</select>
    </label>
  );
}