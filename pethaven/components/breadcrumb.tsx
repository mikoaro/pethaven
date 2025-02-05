import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// interface BreadcrumbItem {
//   label: string;
//   href: string;
// }

// interface BreadcrumbProps {
//   items: BreadcrumbItem[];
// }

interface BreadcrumbProps {
  items: {
    label: string;
    href: string;
  }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="w-full bg-[#fdf6e7]">
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink
              href={item.href}
              className="text-sm hover:underline"
            >
              {item.label}
            </BreadcrumbLink>
            {index < items.length - 1 && (
              <ChevronRight className="h-3 w-3 mx-1 text-gray-600" />
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </nav>
  );
}
