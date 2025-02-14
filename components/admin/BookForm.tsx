"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { bookSchema } from "@/lib/validation"
import { Textarea } from "../ui/textarea"
import FileUpload from "../FileUpload"
import ColorPicker from "../ColorPicker"
import { createBook} from "@/lib/admin/book"
import Image from "next/image"
import { useState } from "react"
import { updateBook } from "@/lib/actions/books"

interface Props extends Partial<Book> {
  type: "create" | "update"
}

const BookForm = ({type, ...book}: Props)=> {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Default values for form
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book.title || "",
      description: book.description || "",
      author: book.author || "",
      genre: book.genre || "",
      rating: book.rating || 1,
      totalCopies: book.totalCopies || 1,
      coverUrl: book.coverUrl || "",
      coverColor: book.coverColor || "",
      videoUrl: book.videoUrl || "",
      summary: book.summary || "",
    },
  })

  // Submit handler
  const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    setIsLoading(true)

    let result
    if (type === "create") {
      result = await createBook(values)
    } else {
      result = await updateBook(book.id as string, values)
       // Use book.id in update mode
    }

    setIsLoading(false)

    if (result.success) {
      toast({
        title: "Success",
        description: `Book ${type === "create" ? "created" : "updated"} successfully!`,
      })
      router.push(`/admin/books/${book.id}`)
    } else {
      toast({
        title: "Error",
        description: `An error occurred: ${result.message}`,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Book title..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Author name..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Genre..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Input type="number" min={1} max={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalCopies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Copies</FormLabel>
                <FormControl>
                  <Input type="number" min={1} max={10000} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Cover</FormLabel>
                <FormControl>
                  <FileUpload
                    type="image"
                    accept="image/*"
                    folder="books/covers"
                    onFileChange={field.onChange}
                    variant="light"
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Color</FormLabel>
                <FormControl>
                  <ColorPicker value={field.value} onPickerChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Description..." className="h-40 resize-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Trailer</FormLabel>
                <FormControl>
                  <FileUpload
                    type="video"
                    accept="video/*"
                    folder="books/videos"
                    onFileChange={field.onChange}
                    variant="light"
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Summary..." className="h-40 resize-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="book-form_btn text-white">
            <p>{type === "create" ? "Add Book to Library" : "Update Book"}</p>
            {isLoading && (
              <Image src="/icons/loading.png" className="invert animate-spin" alt="loader" width={20} height={20} />
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default BookForm
