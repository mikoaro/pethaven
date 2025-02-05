"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreVertical, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DonationDialog } from "./donation-dialog"
import type { Transaction } from "@/types/transaction"

const initialTransactions: Transaction[] = [
  {
    id: "1",
    timeStarted: "01/27/2025 03:15 PM",
    user: "Test_User",
    person: "Loki P",
    items: "",
    status: "Checkout Sent",
  },
  {
    id: "2",
    timeStarted: "01/27/2025 10:32 AM",
    user: "Test_Admin",
    person: "Sophia Falcon",
    items: "Adoption: Buddy (PH-1), $50.00 Donation",
    status: "Pending Completion",
  },
  {
    id: "3",
    timeStarted: "01/27/2025 10:28 AM",
    user: "Test_Admin",
    person: "Loki P",
    items: "",
    status: "Checkout Sent",
  },
  {
    id: "4",
    timeStarted: "01/27/2025 07:09 AM",
    user: "test_aileene",
    person: "Test Person",
    items: "Adoption: Anton (PH-2)",
    status: "Draft",
  },
  {
    id: "5",
    timeStarted: "01/27/2025 05:54 PM",
    user: "Test_Admin",
    person: "Loki P",
    items: "Adoption: Mochi (PH-3)",
    status: "Checkout Sent",
  },
  {
    id: "6",
    timeStarted: "01/27/2025 02:42 PM",
    user: "Test_Admin",
    person: "Loki P",
    items: "Adoption: Whisker (PH-4)",
    status: "Checkout Sent",
  },
  {
    id: "7",
    timeStarted: "01/27/2025 12:37 PM",
    user: "test_brads",
    person: "Test Person",
    items: "",
    status: "Draft",
  },
  {
    id: "8",
    timeStarted: "01/27/2025 12:26 PM",
    user: "Test_Admin",
    person: "Test Person",
    items: "",
    status: "Draft",
  },
  {
    id: "9",
    timeStarted: "01/27/2025 11:38 AM",
    user: "test_tinah",
    person: "Gillian Anderson",
    items: "Adoption: Gizmo (PH-5)",
    status: "Draft",
  },
  {
    id: "10",
    timeStarted: "01/27/2025 11:31 AM",
    user: "test_tinah",
    person: "John Smith",
    items: "Adoption: Charisma (PH-7)",
    status: "Checkout Sent",
  },
  {
    id: "11",
    timeStarted: "01/27/2025 08:33 AM",
    user: "Test_Admin",
    person: "Mason Keagan",
    items: "",
    status: "Draft",
  },
]

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [showDonationDialog, setShowDonationDialog] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const handleCompleteTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setShowDonationDialog(true)
  }

  const handleCloseDonationDialog = () => {
    if (selectedTransaction) {
      setTransactions((prevTransactions) =>
        prevTransactions.map((t) => (t.id === selectedTransaction.id ? { ...t, status: "Completed" } : t)),
      )
    }
    setShowDonationDialog(false)
    setSelectedTransaction(null)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Shopping Cart Manager</h1>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time Started</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Person</TableHead>
              <TableHead className="w-[400px]">Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.timeStarted}</TableCell>
                <TableCell>{transaction.user}</TableCell>
                <TableCell>{transaction.person}</TableCell>
                <TableCell>{transaction.items}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      transaction.status === "Draft"
                        ? "bg-red-100 text-red-800"
                        : transaction.status === "Checkout Sent"
                          ? "bg-blue-100 text-blue-800"
                          : transaction.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleCompleteTransaction(transaction)}>
                        <Check className="mr-2 h-4 w-4" />
                        Complete Transaction
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DonationDialog isOpen={showDonationDialog} onClose={handleCloseDonationDialog} donationAmount={50.00} />
    </div>
  )
}

