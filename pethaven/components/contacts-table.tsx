import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Contact } from "@/types";

const contacts: Contact[] = [
  {
    id: "1",
    name: "Sophia Falcon",
    email: "sophiafalcon@gmail.com",
    phone: "(123) 456-7890",
    dateAdded: "01-27-2025",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@gmail.com",
    phone: "(098) 765-4321",
    dateAdded: "01-27-2025",
  },
  // Add more sample data as needed
];

export function ContactsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Date Added</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts.map((contact) => (
          <TableRow key={contact.id}>
            <TableCell>{contact.name}</TableCell>
            <TableCell>{contact.email}</TableCell>
            <TableCell>{contact.phone}</TableCell>
            <TableCell>{contact.dateAdded}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
