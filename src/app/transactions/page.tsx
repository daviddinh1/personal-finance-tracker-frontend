import Header from "@/components/Header";
import TransactionsPanel from "./TransactionsPanel";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 items-center justify-center">
        <TransactionsPanel />
      </div>
    </div>
  );
}
