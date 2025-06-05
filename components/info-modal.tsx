"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface InfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InfoModal({ open, onOpenChange }: InfoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>About This App</DialogTitle>
          <DialogDescription>
            Weather app created as part of the Product Manager Accelerator
            assessment
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-2">
              Created by:
            </h4>
            <p className="text-sm text-gray-600">El Alouani Badereddine</p>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-2">
              About Product Manager Accelerator:
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              The Product Manager Accelerator Program is designed to support PM
              professionals through every stage of their careers. From students
              looking for entry-level jobs to Directors looking to take on a
              leadership role, the program has helped over hundreds of students
              fulfill their career aspirations.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                window.open("https://www.linkedin.com/school/pmaccelerator/")
              }
              className="w-full"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit PMA LinkedIn Page
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
