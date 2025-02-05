import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Donation } from "@/types";

const donations: Donation[] = [
  {
    id: "1",
    date: "01-27-2025",
    donor: "Sophia Falcon",
    amount: 50,
    animalId: "PH-1",
  },
  {
    id: "2",
    date: "01-27-2025",
    donor: "Jane Smith",
    amount: 100,
    animalId: "PH-2",
  },
  // Add more sample data as needed
];

export function DonationsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Donor</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Animal ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {donations.map((donation) => (
          <TableRow key={donation.id}>
            <TableCell>{donation.date}</TableCell>
            <TableCell>{donation.donor}</TableCell>
            <TableCell>${donation.amount.toFixed(2)}</TableCell>
            <TableCell>{donation.animalId}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
