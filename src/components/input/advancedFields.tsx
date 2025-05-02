import InputField from "./inputFields";

interface AdvancedFieldsProps {
  humidity: string;
  setHumidity: (v: string) => void;
  hoursInSun: string;
  setHoursInSun: (v: string) => void;
  windSpeed: string;
  setWindSpeed: (v: string) => void;
}

export default function AdvancedFields({
  humidity,
  setHumidity,
  hoursInSun,
  setHoursInSun,
  windSpeed,
  setWindSpeed,
}: AdvancedFieldsProps) {
  return (
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
  );
}