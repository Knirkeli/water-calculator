"use client";
import Footer from "@/components/ui/footer";
import WaterIntakeCalculator from "../components/calculator/WaterIntakeCalculator";
import { Analytics } from "@vercel/analytics/react";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <WaterIntakeCalculator />
      <Footer />
      <Analytics />
    </div>
  );
}