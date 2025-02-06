"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateUserRole } from "@/lib/actions/auth";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { updateBookStatus } from "@/lib/actions/books";

interface RoleDropdownProps {
  userId: string;
  currentRole: "USER" | "ADMIN" | null; // Allow null values
}

export const RoleDropdown: React.FC<RoleDropdownProps> = ({ userId, currentRole }) => {
  // Ensure role is always "USER" or "ADMIN"
  const [role, setRole] = useState<"USER" | "ADMIN">(currentRole ?? "USER");

  const handleRoleChange = async (newRole: "USER" | "ADMIN") => {
    if (newRole === role) return; // Avoid unnecessary updates

    const response = await updateUserRole(userId, newRole);
    if (response.success) {
      setRole(newRole); // Update UI immediately
      toast({
        title: "Success",
        description: "User role has been updated successfully",
        variant: "default",
      });
    } else {
      toast({
        title: "Failed",
        description: "Error while updating user role",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <p
          className={`py-1 px-2 rounded-full ${
            role === "USER"
              ? "bg-green-500/30 text-green-500"
              : "bg-red-800/30 text-red-800"
          } font-medium text-[12px]`}
        >
          {role}
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleRoleChange("USER")}>
          <p className="bg-green-500/30 text-green-500 font-medium px-2 py-1 rounded-full">User</p>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleRoleChange("ADMIN")}>
        <p className="bg-red-800/30 text-red-800 font-medium px-2 py-1 rounded-full">Admin</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface ReturnDropdownProps {
  bookId: string;
  currentStatus: "BORROWED" | "RETURNED" | null; // Allow null values
}

export const ReturnDropdown =({currentStatus,bookId}:ReturnDropdownProps)=>{
  const [status, setStatus] = useState<"BORROWED" | "RETURNED">(currentStatus ?? "BORROWED");

  const handleStatusChange = async (newStatus:"BORROWED" | "RETURNED") => {
    if(newStatus === status) return;

    const response = await updateBookStatus(bookId);
    if (response.success) {
      setStatus(newStatus); // Update UI immediately
      toast({
        title: "Success",
        className:"bg-green-500 text-light-100 ",
        description: "Book is returned",
        variant: "default",
      });
    } else {
      toast({
        title: "Failed",
        description: "Book status not update",
        variant: "destructive",
      });
    }
  }
  return (
    <DropdownMenu>
    <DropdownMenuTrigger>
        <p className={cn(`${status === "BORROWED" ? 
          'bg-violet-400/15 text-indigo-700' 
          : 'bg-emerald-200 text-emerald-700' } 
          py-1 px-2 font-medium rounded-full hover:bg-transparent hover:shadow-sm`)}>
        <p className='text-[12px]'>{status}</p>
        </p>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='rounded-xl p-2'>
        <DropdownMenuItem onClick={() => handleStatusChange("BORROWED")}>
            Borrowed
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("RETURNED")}>
            Returned
        </DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>
  )
}


