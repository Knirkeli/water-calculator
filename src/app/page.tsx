"use client";
import Footer from "@/components/ui/footer";
import WaterIntakeCalculator from "../components/calculator/WaterIntakeCalculator";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/ui/header";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-800 text-foreground px-4">
      <Header />
      <WaterIntakeCalculator />
      <Footer />
      <Analytics />
    </div>
  );
}