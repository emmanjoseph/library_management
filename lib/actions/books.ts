"use server"

import { db } from "@/database/drizzle";
import dayjs from "dayjs";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";

// Function to handle borrowing a book
export const borrowBook = async (params: BorrowBookParams) => {
    const { userId, bookId } = params;

    try {
        // Fetch the available copies of the book
        const book = await db.select({ availableCopies: books.availableCopies })
            .from(books)
            .where(eq(books.id, bookId))
            .limit(1);

        // Check if the book is available for borrowing
        if (!book.length || book[0].availableCopies <= 0) {
            return {
                success: false,
                error: "Book not available for borrowing",
            };
        }

        // Calculate the due date (14 days from now)
        const dueDate = dayjs().add(14, 'day').format("YYYY-MM-DD HH:mm:ss");

        // Insert a new borrow record
        const [record] = await db.insert(borrowRecords)
            .values({
                userId,
                bookId,
                dueDate,
                status: "BORROWED",
            }).returning()

        // Update the available copies of the book
        await db.update(books).set({ availableCopies: book[0].availableCopies - 1 })
            .where(eq(books.id, bookId));

        return {
            success: true,
            data: JSON.parse(JSON.stringify(record))
        };
    } catch (error) {
        console.error("Error while borrowing book:", error);
        throw error;
    }
};

export const userGetBorrowedBooks = async (userId:string) => {
    try {
        const borrowedBooks = await db
        .select({
            id:books.id,
            title:books.title,
            genre:books.genre,
            author: books.author,
            coverColor:books.coverColor,
            coverUrl:books.coverUrl,
            dueDate:borrowRecords.dueDate,
            status:borrowRecords.status
        })
        .from(borrowRecords)
        .innerJoin(books,eq(borrowRecords.bookId ,books.id))
        .where(eq(borrowRecords.userId,userId));

        return {
            success:true,
            data:JSON.parse(JSON.stringify(borrowedBooks))
        }
    } catch (error) {
        console.log("Error fetching books",error);
        return {
            success:false,
            error:"Failed to fetch the book"
        }
    }
}