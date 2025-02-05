"use client"

import { useEffect } from "react"
import { Check } from "lucide-react"
import confetti from "canvas-confetti"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface DonationDialogProps {
  isOpen: boolean
  onClose: () => void
  donationAmount: number
}

export function DonationDialog({ isOpen, onClose, donationAmount }: DonationDialogProps) {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Donation Added</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-start gap-3">
            <Check className="h-5 w-5 text-green-500 mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-green-900">${donationAmount.toFixed(2)} donation added!</p>
              <p className="text-green-700 text-sm">
                This covers approximately {Math.floor(donationAmount * 0.567)} lbs of food for your animals.
              </p>
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="department" className="text-sm font-medium">
              Department
            </label>
            <Select>
              <SelectTrigger id="department">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shelter">Shelter</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="adoption">Adoption</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <label htmlFor="fund" className="text-sm font-medium">
              Fund
            </label>
            <Select>
              <SelectTrigger id="fund">
                <SelectValue placeholder="Select fund" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Fund</SelectItem>
                <SelectItem value="emergency">Emergency Fund</SelectItem>
                <SelectItem value="medical">Medical Fund</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <label htmlFor="memo" className="text-sm font-medium">
              Donation Memo
            </label>
            <Textarea
              id="memo"
              placeholder="Donation added by customer during Stripe checkout."
              className="resize-none"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose} className="bg-[#507380] hover:bg-[#3e5a65]">
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

