"use client";
import WaterIntakeCalculator from "../components/calculator/WaterIntakeCalculator";
import { Analytics } from "@vercel/analytics/react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <WaterIntakeCalculator />
      <footer className="mt-8 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Water Intake Calculator
      </footer>
      <Analytics />
    </div>
  );
}