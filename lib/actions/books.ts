"use server"

import { db } from "@/database/drizzle";
import dayjs from "dayjs";
import { books, borrowRecords, users } from "@/database/schema";
import { eq, sql } from "drizzle-orm";
import { desc } from 'drizzle-orm'


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


export async function getTotalBooks(): Promise<number> {
    const result = await db
    .select({ total: sql<number>`SUM(${books.totalCopies})` })
    .from(books);
    return result[0]?.total ?? 0;
  }

  export async function getTotalUsers():Promise<number> {
    const result = await db.select({ total: sql<number>`COUNT(*)` }).from(users);
    return result[0]?.total ?? 0;
  }

  export async function getTotalBorrowedBooks():Promise<number> {
    const result = await db.select({ total: sql<number>`COUNT(*)` }).from(borrowRecords);
    return result[0]?.total ?? 0;
  }

  export async function getBorrowedRecords() {
    try {
      const result = await db
        .select({
          id: borrowRecords.id,
          userId: borrowRecords.userId,
          bookId: borrowRecords.bookId,
          borrowDate: borrowRecords.borrowDate,
          dueDate: borrowRecords.dueDate,
          returnDate: borrowRecords.returnDate,
          status: borrowRecords.status,
          user: users.fullName,
          author: books.author,
          email: users.email,
          title: books.title,
          genre: books.genre,
          coverUrl:books.coverUrl,
          coverColor:books.coverColor
        })
        .from(borrowRecords)
        .innerJoin(users, eq(users.id, borrowRecords.userId))
        .innerJoin(books, eq(books.id, borrowRecords.bookId))
        .orderBy(borrowRecords.borrowDate);
  
      return { success: true, data: result };
    } catch (error) {
      console.error("Error fetching borrowed records:", error);
      return { success: false, error: "Failed to retrieve borrowed records" };
    }
  }

  export async function getUsersWithBorrowedBooks() {
    const allUsers = await db
      .select({
        userId: users.id,
        universityId:users.universityId,
        name: users.fullName,
        email: users.email,
        dateJoined:users.createdAt,
        role:users.role,
        universityIdCard:users.universityCard,
        booksBorrowed: sql<number>`COUNT(${borrowRecords.id})`
      })
      .from(users)
      .leftJoin(borrowRecords, eq(users.id, borrowRecords.userId))
      .groupBy(users.id)
      .orderBy(desc(users.createdAt))
      .limit(10);
  
    return allUsers;
  }

  export async function getBookById(id:string) {
    try {
      const result = await db
        .select()
        .from(books)
        .where(eq(books.id,id))
        .limit(1);
  
      if (!result.length) {
        return null; // No book found
      }
  
      return result[0]; // Return the first (and only) book found
    } catch (error) {
      console.error("Error fetching book by ID:", error);
      throw new Error("Failed to fetch book details");
    }
  }