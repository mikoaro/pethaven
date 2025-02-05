"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import type { SupportInitiativeFormData } from "@/types/support-initiative";

interface GeneralInformationFormProps {
  data: Partial<SupportInitiativeFormData>;
  onNext: (data: Partial<SupportInitiativeFormData>) => void;
}

export function GeneralInformationForm({
  data,
  onNext,
}: GeneralInformationFormProps) {
  const [formData, setFormData] =
    useState<Partial<SupportInitiativeFormData>>(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Initiative Title</Label>
          <Input
            id="title"
            value={formData.title || ""}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Louisiana - Hurricane Francine"
            className="bg-gray-50"
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Select
            value={formData.location}
            onValueChange={(value) =>
              setFormData({ ...formData, location: value })
            }
          >
            <SelectTrigger className="bg-gray-50">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="louisiana">Louisiana</SelectItem>
              <SelectItem value="texas">Texas</SelectItem>
              <SelectItem value="florida">Florida</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-gray-50"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {formData.startDate ? (
                    format(formData.startDate, "MM/dd/yyyy")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={formData.startDate}
                  onSelect={(date) =>
                    setFormData({ ...formData, startDate: date })
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-gray-50"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {formData.endDate ? (
                    format(formData.endDate, "MM/dd/yyyy")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={formData.endDate}
                  onSelect={(date) =>
                    setFormData({ ...formData, endDate: date })
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="bg-gray-50"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="partner">Partner Agency (optional)</Label>
          <Select
            value={formData.partnerAgency}
            onValueChange={(value) =>
              setFormData({ ...formData, partnerAgency: value })
            }
          >
            <SelectTrigger className="bg-gray-50">
              <SelectValue placeholder="Select agency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="agency1">Agency 1</SelectItem>
              <SelectItem value="agency2">Agency 2</SelectItem>
              <SelectItem value="agency3">Agency 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Cover Image</Label>
          <div className="border-2 border-dashed rounded-lg p-4 bg-gray-50">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, coverImage: e.target.files?.[0] })
              }
              className="hidden"
              id="coverImage"
            />
            <Label
              htmlFor="coverImage"
              className="flex items-center justify-center cursor-pointer"
            >
              <span className="text-gray-500">Upload Cover Image</span>
            </Label>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.isFinancialSupport || false}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isFinancialSupport: checked })
            }
          />
          <Label>Financial support</Label>
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" disabled>
          Back
        </Button>
        <Button type="submit" className="bg-violet-600 hover:bg-violet-700">
          Next
        </Button>
      </div>
    </form>
  );
}
