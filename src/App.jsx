import Transactions from "./components/Transactions";
import Statistics from "./components/Statistics";
import Piechart from "./components/Piechart";
import Barchart from "./components/Barchart";
import { useState } from "react";

function App() {
  const [selectedMonth, setSelectedMonth] = useState(3);

  return (
    <div className="flex flex-col items-center min-h-screen bg-indigo-100 p-4 sm:p-8">
      <Transactions
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />

      <div className="flex flex-col lg:flex-row justify-center lg:justify-between w-full max-w-6xl gap-6 mt-6">
        <Statistics selectedMonth={selectedMonth} />
        <Piechart selectedMonth={selectedMonth} />
      </div>
      <Barchart selectedMonth={selectedMonth} />
    </div>
  );
}

export default App;
