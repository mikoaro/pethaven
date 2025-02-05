import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AnimalAdoption } from "@/types";

const adoptions: AnimalAdoption[] = [
  {
    id: "1",
    animalId: "PH-1",
    animalName: "Buddy",
    adopter: "Sophia Falcon",
    date: "01-27-2025",
    status: "Adopted",
  },
  {
    id: "2",
    animalId: "PH-2",
    animalName: "Anton",
    adopter: "Jane Smith",
    date: "01-27-2025",
    status: "Sponsored",
  },
  // Add more sample data as needed
];

export function GuardianshipTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Animal ID</TableHead>
          <TableHead>Animal Name</TableHead>
          <TableHead>Adopter/Sponsor</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {adoptions.map((adoption) => (
          <TableRow key={adoption.id}>
            <TableCell>{adoption.animalId}</TableCell>
            <TableCell>{adoption.animalName}</TableCell>
            <TableCell>{adoption.adopter}</TableCell>
            <TableCell>{adoption.date}</TableCell>
            <TableCell>{adoption.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
