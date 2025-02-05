import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center gap-2 py-8">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          className={`rounded-full w-10 h-10 p-0 ${
            currentPage === page ? "bg-black text-white" : "bg-white"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      {currentPage < totalPages && (
        <Button
          variant="outline"
          className="rounded-full w-10 h-10 p-0 bg-white"
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
