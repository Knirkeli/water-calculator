"use client";
interface WaterResultProps {
    result: number | null;
    useAdvanced: boolean;
    wbgtResult: number | null;
    onShowPopup: () => void;
  }
  export default function WaterResult({ result, useAdvanced, wbgtResult, onShowPopup }: WaterResultProps) {
    if (result === null) return null;
    return (
      <div className="mt-4 text-center">
        <p className="text-lg">Recommended daily water intake:</p>
        <p className="text-2xl font-bold mt-1">{result.toFixed(2)} liters</p>
        {useAdvanced && wbgtResult !== null && (
          <p className="text-sm text-gray-500 mt-2 cursor-pointer underline" onClick={onShowPopup}>
            WBGT Index: {wbgtResult.toFixed(2)}
          </p>
        )}
      </div>
    );
  }