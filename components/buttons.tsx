"use client";

import { deleteBook } from "@/lib/actions/books"; // Adjust path as needed
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface DeleteBookButtonProps {
  bookId: string;
}

export const DeleteBookButton: React.FC<DeleteBookButtonProps> = ({ bookId }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const response = await deleteBook(bookId);
    setLoading(false);

    if (response.success) {
      toast({
        title: "Deleted",
        description: response.message,
        variant: "default",
      });

      // Optionally refresh the page or update state to remove the deleted book
    } else {
      toast({
        title: "Failed",
        description: response.message,
        variant: "destructive",
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-white"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};




