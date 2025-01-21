"use server"

import { db } from "@/database/drizzle";
import dayjs from "dayjs";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";

export const borrowBook = async (params:BorrowBookParams) => {
    const {userId , bookId} = params;

    try {
    const book = await db.select({availableCopies:books.availableCopies})
    .from(books)
    .where(eq(books.id, bookId))
    .limit(1)

    if(!book.length || book[0].availableCopies) {
        return {
            success:false,
            error:"Book not available for borrowing"
        }
    }

    const dueDate = dayjs().add(14, 'day').toDate().toString();
    const record = db.insert(borrowRecords)
    .values({
        userId,
        bookId,
        dueDate,
        status:"BORROWED",
    })

    await db.update(books).set({availableCopies:book[0].availableCopies-1})
    .where(eq(books.id,bookId))

    return {
        success:true,
        data:JSON.parse(JSON.stringify(record))
    }
    } catch (error) {
        console.log(error);
        return {success:false , error: "Am error occurred while borrowing a book"}
    }
}