"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Stepper } from "./stepper";
import { type SupportInitiativeForm, steps } from "@/lib/types";

const locations = ["Louisiana", "Texas", "Florida", "Mississippi"];
const agencies = ["Red Cross", "FEMA", "Local Government", "Other"];

export function SupportInitiativeForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SupportInitiativeForm>({
    title: "Louisiana - Hurricane Francine",
    location: "Louisiana",
    startDate: undefined,
    endDate: undefined,
    description: "",
    partnerAgency: undefined,
    financialSupport: false,
    coverImage: undefined,
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          Create new support initiative
        </h1>
        <p className="text-gray-500">
          Please fill all the steps and the fields that are required
        </p>
      </div>

      <div className="mb-12">
        <Stepper currentStep={currentStep} steps={steps} />
      </div>

      <div className="space-y-8">
        {currentStep === 1 && (
          <>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
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
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
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
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate ? (
                          format(formData.startDate, "MM/dd/yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
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
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.endDate ? (
                          format(formData.endDate, "MM/dd/yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
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
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="h-32"
                />
              </div>

              <div>
                <Label htmlFor="agency">Partner Agency (optional)</Label>
                <Select
                  value={formData.partnerAgency}
                  onValueChange={(value) =>
                    setFormData({ ...formData, partnerAgency: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select agency" />
                  </SelectTrigger>
                  <SelectContent>
                    {agencies.map((agency) => (
                      <SelectItem key={agency} value={agency}>
                        {agency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Button
                  variant="outline"
                  className="w-full h-24 border-dashed"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-6 w-6" />
                    <span>Upload Cover Image</span>
                  </div>
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      coverImage: e.target.files?.[0],
                    })
                  }
                />
              </div>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="financial-support">Financial support</Label>
              <Switch
                id="financial-support"
                checked={formData.financialSupport}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, financialSupport: checked })
                }
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Summary</h3>
            <div className="space-y-2">
              <p>
                <strong>Title:</strong> {formData.title}
              </p>
              <p>
                <strong>Location:</strong> {formData.location}
              </p>
              <p>
                <strong>Dates:</strong>{" "}
                {formData.startDate && format(formData.startDate, "MM/dd/yyyy")}{" "}
                - {formData.endDate && format(formData.endDate, "MM/dd/yyyy")}
              </p>
              <p>
                <strong>Description:</strong> {formData.description}
              </p>
              {formData.partnerAgency && (
                <p>
                  <strong>Partner Agency:</strong> {formData.partnerAgency}
                </p>
              )}
              <p>
                <strong>Financial Support:</strong>{" "}
                {formData.financialSupport ? "Yes" : "No"}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          <Button
            className="bg-[#7C3AED] hover:bg-[#7C3AED]/90"
            onClick={handleNext}
          >
            {currentStep === steps.length ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
