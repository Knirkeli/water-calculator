# Water Intake Calculator

A modern web app for calculating your recommended daily water intake based on your body, activity, weather, and diet.

## Features

- **Step-by-step mode:** Guided input with explanations for each factor.
- **Advanced mode:** Include humidity, wind and sun for precise results.
- **Calculation breakdown:** See exactly how each input affects your water needs.
- **Diet adjustment:** Accounts for water from food based on your diet.
- **WBGT calculation:** Considers heat stress from weather conditions.

## How It Works

1. **Enter your details:** Weight, temperature, workout, and optionally advanced weather/diet info.
2. **Get your result:** The app calculates your daily water need.
3. **See the math:** Click "Show calculation details" to see how each input affects your result.

## Tech Stack

- **Next** (with TypeScript)
- **Tailwind CSS** for styling

## Getting Started

1. **Clone the repo:**
   ```sh
   git clone https://github.com/yourusername/water-calculator.git
   cd water-calculator
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the app:**
   ```sh
   npm run dev
   ```
   or
   ```sh
   npm start
   ```

4. **Open in your browser:**
   ```
   http://localhost:5173
   ```
   (or the port shown in your terminal)

## Project Structure

```
src/
  components/
    calculator/
      WaterIntakeCalculator.tsx
      stepByStep.tsx
    input/
    ui/
      calculationDetails.tsx
  utils/
    waterIntakeCalculator.ts
    calculateWetBulbTemp.ts
  constants/
    dietWaterGains.ts
```

## Customization

- Adjust calculation formulas in `src/utils/waterIntakeCalculator.ts`.
- Update diet water values in `src/constants/dietWaterGains.ts`.
- Tweak UI and explanations in `src/components/ui/calculationDetails.tsx`.

## License

MIT

---

**Made with ❤️ by [Your Name]**