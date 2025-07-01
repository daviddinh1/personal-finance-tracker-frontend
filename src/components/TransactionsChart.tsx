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

interface TransactionProps {
  id: number;
  createdAt: string; // e.g. "Apr 4,2024"
  description: string;
  amount: number;
  type: "income" | "expense";
}

const transactions: TransactionProps[] = [
  {
    id: 1,
    createdAt: "Apr 4,2024",
    description: "Salary Deposit",
    amount: 2500.0,
    type: "income",
  },
  {
    id: 2,
    createdAt: "Apr 6,2024",
    description: "Coffee Shop Purchase",
    amount: 4.5,
    type: "expense",
  },
  {
    id: 3,
    createdAt: "Apr 9,2024",
    description: "Subscription Renewal – Pro Plan",
    amount: 29.99,
    type: "expense",
  },
  {
    id: 4,
    createdAt: "Apr 12,2024",
    description: "Refund – Order #12345",
    amount: 15.5,
    type: "income",
  },
  {
    id: 5,
    createdAt: "Apr 15,2024",
    description: "Payment Received – ACME Corp.",
    amount: 350.0,
    type: "income",
  },
  {
    id: 6,
    createdAt: "Apr 18,2024",
    description: "Utility Bill Payment",
    amount: 120.75,
    type: "expense",
  },
  {
    id: 7,
    createdAt: "Apr 20,2024",
    description: "Grocery Store Purchase",
    amount: 78.23,
    type: "expense",
  },
];

export default function TransactionsChart() {
  //need to map across table body for transactions
  return (
    <Table>
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
            <TableCell>{transaction.createdAt}</TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>{transaction.type}</TableCell>
            <TableCell className="text-right">{transaction.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
