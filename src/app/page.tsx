"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import DataForm from "./custom-components/DataForm";

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">डाटा फारम</h1>
      <Button onClick={() => setIsFormOpen(true)}>फारम खोल्नुहोस्</Button>
      {isFormOpen && <DataForm onClose={() => setIsFormOpen(false)} />}
    </main>
  );
}
