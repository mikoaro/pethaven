import Link from "next/link";
import type { Pet } from "@/types/pet";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PetListProps {
  pets: Pet[];
  onDelete: (id: string) => void;
}

export function PetList({ pets, onDelete }: PetListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Breed</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pets.map((pet) => (
          <TableRow key={pet.id}>
            <TableCell>{pet.name}</TableCell>
            <TableCell>{pet.type}</TableCell>
            <TableCell>{pet.breed || "N/A"}</TableCell>
            <TableCell>{pet.age || "N/A"}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link href={`/pets/${pet.id}`}>View</Link>
                </Button>
                <Button variant="destructive" onClick={() => onDelete(pet.id)}>
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
