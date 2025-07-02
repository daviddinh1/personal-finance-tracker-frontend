import Header from "@/components/Header";
import TransactionsChart from "@/components/TransactionsChart";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 items-center justify-center">
        <TransactionsChart />
      </div>
    </div>
  );
}
