"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import DataForm from "./custom-components/DataForm";
import DataTable from "./custom-components/DataTable";

export default function Page() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-8 lg:p-24">
      <div className="w-full max-w-7xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          लामा कार्की वंशावली डाटा फारम
        </h1>
        <div className="flex justify-center mb-8">
          <Button onClick={() => setIsFormOpen(true)}>
            नयाँ डाटा थप्नुहोस्
          </Button>
        </div>
        {isFormOpen && <DataForm onClose={() => setIsFormOpen(false)} />}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">पुस्ता -२५</h2>
          <DataTable />
        </div>
      </div>
    </main>
  );
}
