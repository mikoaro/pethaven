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
      recipient: "Shelter",
      animalId: "PH-1",
      message: "Fluffy is doing great in her new home!",
    },
    {
      id: "2",
      date: "01-27-2025",
      sender: "Jane Smith",
      recipient: "Shelter",
      animalId: "PH-2",
      message: "Max is adjusting well. He loves his new toys!",
    },
    // Add more sample data as needed
  ];
  
  export function AdoptersTable() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Animal ID</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {updates.map((update) => (
            <TableRow key={update.id}>
              <TableCell>{update.date}</TableCell>
              <TableCell>{update.sender}</TableCell>
              <TableCell>{update.animalId}</TableCell>
              <TableCell>{update.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  