"use client";
import BookForm from "@/components/admin/BookForm";
import { Button } from "@/components/ui/button";
import { getBookById } from "@/lib/actions/books";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
 // Import function to fetch book details

const Page = () => {
  const { id } = useParams() as { id: string }; // Get book ID from URL
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;
      try {
        const bookData = await getBookById(id); // Fetch book data
        setBook(bookData);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (!book) {
    return <p>Book not found.</p>; // Handle error case
  }

  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/books">Go back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm type="update" {...book} /> {/* Pass book data to the form */}
      </section>
    </>
  );
};

export default Page;
