import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import type { Update } from "@/types";
  
  const updates: Update[] = [
    {
      id: "1",
      date: "01-27-2025",
      sender: "Sophia Falcon",
      recipient: "PetHaven",
      animalId: "PH-1",
      message: "Fluffy had her annual checkup. She's in perfect health!",
    },
    {
      id: "2",
      date: "01-27-2025",
      sender: "Jane Smith",
      recipient: "PetHaven",
      animalId: "PH-2",
      message: "Max won 'Best Smile' in our annual pet contest!",
    },
    // Add more sample data as needed
  ];
  
  export function DonorsTable() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead>Animal ID</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {updates.map((update) => (
            <TableRow key={update.id}>
              <TableCell>{update.date}</TableCell>
              <TableCell>{update.recipient}</TableCell>
              <TableCell>{update.animalId}</TableCell>
              <TableCell>{update.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  