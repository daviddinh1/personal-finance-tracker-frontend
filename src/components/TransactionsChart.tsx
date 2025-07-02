"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

interface TransactionProps {
  id: number;
  createdAt: string; // e.g. "Apr 4,2024"
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
}

// const transactions: TransactionProps[] = [
//   {
//     id: 1,
//     createdAt: "Apr 4,2024",
//     description: "Salary Deposit",
//     amount: 2500.0,
//     type: "income",
//   },
//   {
//     id: 2,
//     createdAt: "Apr 6,2024",
//     description: "Coffee Shop Purchase",
//     amount: 4.5,
//     type: "expense",
//   },
//   {
//     id: 3,
//     createdAt: "Apr 9,2024",
//     description: "Subscription Renewal – Pro Plan",
//     amount: 29.99,
//     type: "expense",
//   },
//   {
//     id: 4,
//     createdAt: "Apr 12,2024",
//     description: "Refund – Order #12345",
//     amount: 15.5,
//     type: "income",
//   },
//   {
//     id: 5,
//     createdAt: "Apr 15,2024",
//     description: "Payment Received – ACME Corp.",
//     amount: 350.0,
//     type: "income",
//   },
//   {
//     id: 6,
//     createdAt: "Apr 18,2024",
//     description: "Utility Bill Payment",
//     amount: 120.75,
//     type: "expense",
//   },
//   {
//     id: 7,
//     createdAt: "Apr 20,2024",
//     description: "Grocery Store Purchase",
//     amount: 78.23,
//     type: "expense",
//   },
// ];

export default function TransactionsChart({
  refreshKey,
}: {
  refreshKey: number;
}) {
  //need to map across table body for transactions
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const transactionTotal = (transactions: TransactionProps[]): number => {
    let total = 0;
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].type === "INCOME") {
        total += transactions[i].amount;
      } else {
        total -= transactions[i].amount;
      }
    }
    return total;
  };

  function formatDate(isoString: string): string {
    const date = new Date(isoString);
    const month = date.toLocaleString("en-US", { month: "short" }); // "Jul"
    const day = date.getDate(); // 1
    const year = date.getFullYear(); // 2025
    return `${month}, ${day}, ${year}`; // "Jul, 1, 2025"
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/v1/transactions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data: TransactionProps[]) => {
        setTransactions(data);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refreshKey]);

  if (loading) {
    return <div>Loading Transactions</div>;
  }
  if (error) {
    return <div>Error calling backend : {error}</div>;
  }

  return (
    <div className="mx-auto">
      <Table className="w-[700px] h-[300px]">
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{formatDate(transaction.createdAt)}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell
                className={
                  transaction.type === "INCOME"
                    ? "text-right text-[#CFFFB1]"
                    : "text-right text-[#FF5B5B]"
                }
              >
                ${transaction.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              ${transactionTotal(transactions)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
