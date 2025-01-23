import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { useParams } from "wouter";

interface Transaction {
  date: string;
  description: string;
  amount: string;
  runningBalance: string;
}

interface BankData {
  summary: {
    beginningBalance: string;
    totalCredits: string;
    totalDebits: string;
    endingBalance: string;
  };
  transactions: Transaction[];
}

export default function Instance() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery<BankData>({
    queryKey: [`https://bank-of-america-statement-viewer-andrewtabit.replit.app/${id}/api/data`],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-red-500">Error loading bank data</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Summary Section */}
        <Card>
          <CardHeader>
            <CardTitle>Account Summary</CardTitle>
            <CardDescription>Overview of account balances and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm font-medium text-muted-foreground">Beginning Balance</p>
                <p className="text-2xl font-bold">${data.summary.beginningBalance}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm font-medium text-muted-foreground">Total Credits</p>
                <p className="text-2xl font-bold text-green-600">${data.summary.totalCredits}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm font-medium text-muted-foreground">Total Debits</p>
                <p className="text-2xl font-bold text-red-600">${data.summary.totalDebits}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm font-medium text-muted-foreground">Ending Balance</p>
                <p className="text-2xl font-bold">${data.summary.endingBalance}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Section */}
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>Detailed list of all account transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.transactions.map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell className={`text-right ${
                        transaction.amount.startsWith('-') ? 'text-red-600' : 
                        transaction.amount ? 'text-green-600' : ''
                      }`}>
                        {transaction.amount ? `$${transaction.amount}` : ''}
                      </TableCell>
                      <TableCell className="text-right">
                        ${transaction.runningBalance}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
