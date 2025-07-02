"use client";
import { useState, useCallback } from "react";
import TransactionsChart from "@/components/TransactionsChart";
import AddTransactions from "@/components/AddTransactions";

export default function TransactionsPanel() {
  const [refreshKey, setRefreshKey] = useState(0);
  // whenever this increments, children that watch [refreshKey] will refetch
  const bumpRefresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);
  return (
    <div className="flex flex-col items-right gap-4">
      <div className="flex justify-between">
        <div className="font-bold text-xl">Recent Transactions</div>
        <AddTransactions onSuccess={bumpRefresh} />
      </div>
      <TransactionsChart refreshKey={refreshKey} />
    </div>
  );
}
