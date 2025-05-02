"use client";
import { useState } from "react";
import InputField from "../components/ui/calcInput";
import WBGTInfoPopup from "../components/ui/popup";
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