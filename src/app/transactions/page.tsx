import { ModeToggle } from "@/components/ModeToggle";
import TransactionsChart from "@/components/TransactionsChart";

export default function Page() {
  return (
    <div>
      <ModeToggle />
      <TransactionsChart />
    </div>
  );
}
