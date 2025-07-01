import Header from "@/components/Header";
import TransactionsChart from "@/components/TransactionsChart";

export default function Page() {
  return (
    <div className="flex flex-col">
      <Header />
      <TransactionsChart />
    </div>
  );
}
