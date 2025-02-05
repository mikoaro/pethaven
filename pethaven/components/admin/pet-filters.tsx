"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LayoutGrid, List } from "lucide-react";
import { useAdminPetsViewMode } from "@/contexts/AdminPetsViewModeContext";

interface FilterProps {
  onFilterChange: (filters: {
    type: string;
    size: string;
    sex: string;
    location: string;
  }) => void;
}

export function PetFilters({ onFilterChange }: FilterProps) {
  const [activeType, setActiveType] = useState("All");
  const [size, setSize] = useState("All");
  const [sex, setSex] = useState("All");
  const [location, setLocation] = useState("All");
  const { isGridView, setIsGridView } = useAdminPetsViewMode();

  function handleClick(viewstate: boolean) {
    setIsGridView(viewstate);
  }

  const handleTypeChange = (type: string) => {
    setActiveType(type);
    onFilterChange({ type, size, sex, location });
  };

  const handleSizeChange = (value: string) => {
    setSize(value);
    onFilterChange({ type: activeType, size: value, sex, location });
  };

  const handleSexChange = (value: string) => {
    setSex(value);
    onFilterChange({ type: activeType, size, sex: value, location });
  };

  const handleLocationChange = (loc: string) => {
    setLocation(loc);
    onFilterChange({ type: activeType, size, sex, location: loc });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-2">
            {["All", "Dog", "Cat", "Others"].map((type) => (
              <Button
                key={type}
                variant={activeType === type ? "default" : "outline"}
                className={`rounded-full ${
                  activeType === type ? "bg-black text-white" : ""
                }`}
                onClick={() => handleTypeChange(type)}
              >
                {type}
              </Button>
            ))}
          </div>

          <Select onValueChange={handleSizeChange}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="~10kg">~10kg</SelectItem>
              <SelectItem value="10-20kg">10-20kg</SelectItem>
              <SelectItem value="20kg~">20kg~</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={handleSexChange}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Sex" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            {["All", "Los Angeles", "Asheville", "Houston"].map((loc) => (
              <Button
                key={loc}
                variant={location === loc ? "default" : "outline"}
                className={`rounded-full ${
                  location === loc ? "bg-black text-white" : ""
                }`}
                onClick={() => handleLocationChange(loc)}
              >
                {loc}
              </Button>
            ))}
          </div>
        </div>
        {/* View Mode */}
        <div className="flex flex-row space-x-1">
          <Button
            onClick={() => handleClick(true)}
            variant={isGridView ? "default" : "outline"}
          >
            <LayoutGrid className="h-4 w-4 mr-2" />
            Grid
          </Button>
          <Button
            onClick={() => handleClick(false)}
            variant={!isGridView ? "default" : "outline"}
          >
            <List className="h-4 w-4 mr-2" />
            List
          </Button>
        </div>
      </div>
    </div>
  );
}
