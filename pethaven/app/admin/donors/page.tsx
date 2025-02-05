"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DonorsTable } from "@/components/donors-table";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogOverlay,
  DialogClose,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function DonorsPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending update to:", email, "Message:", message);
    setEmail("");
    setMessage("");
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50 py-10 px-10">
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Donors List</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>+ Add Donors</Button>
            </DialogTrigger>
            {/* Dialog Overlay */}
            <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
            {/* Dialog Content */}
            <DialogContent className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-full max-w-lg z-50 p-6">
              <DialogTitle className="text-lg font-semibold text-gray-900 mb-4">
                Add Donor
              </DialogTitle>
              <Card>
                <CardHeader>
                  <CardTitle>Donor/Adopter Updates</CardTitle>
                  <CardDescription>
                    Send updates to donors and adopters about their sponsored
                    animals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">Recipient Email</Label>
                        <Input
                          id="email"
                          placeholder="donor@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="message">Update Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Enter your update here..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  {/* Updated Send Button */}
                  <DialogClose asChild>
                    <Button
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      Send Update
                    </Button>
                  </DialogClose>
                </CardFooter>
              </Card>
            </DialogContent>
          </Dialog>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <DonorsTable />
        </div>
      </div>
    </div>
  );
}
