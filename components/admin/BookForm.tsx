"use client"
import { z, ZodType } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultValues, FieldValues, useForm, UseFormReturn } from "react-hook-form"


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { bookSchema } from "@/lib/validation"
import { Textarea } from "../ui/textarea"
import FileUpload from "../FileUpload"
import ColorPicker from "../ColorPicker"
import { createBook } from "@/lib/admin/book"
import Image from "next/image"
import { useState } from "react"


interface Props extends Partial<Book> {
    type:"create" | "update"

}
const BookForm = <T extends FieldValues>({type, ...book}:Props) => {
  const [isLoading, setIsLoading] = useState(false)  // Loading state
  const router = useRouter()
  
    // 1. Define your form.
    const form = useForm<z.infer<typeof bookSchema>>({
        resolver:zodResolver(bookSchema),
        defaultValues:{
            title:"",
description:"",
author:"",
genre:"",
rating:1,
totalCopies:1,
coverUrl:"",
coverColor:"",
videoUrl:"",
summary:"",
        }  
    })

 const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    setIsLoading(true)  // Start loading
    const result = await createBook(values);
    setIsLoading(false)  // Stop loading
    if (result.success) {
     toast({
       title:"Success",
       description: "Form submitted successfully!" 
      });
      
      router.push(`/admin/books/${result.data.id}`)
    }else {
       toast({
       title:"Error",
       description:`An error occurred : ${result.message}`,
       variant:"destructive" 
      });
    }
};

   
  return (
    <div className="flex flex-col gap-4">    
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       
             <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
              <FormLabel className="font-base font-normal text-dark-500">
                Book Title
                </FormLabel>
              <FormControl>
                <Input 
                {...field}
                placeholder="Book title..."
                className="book-form_input"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


             <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
              <FormLabel className="font-base font-normal text-dark-500">
                Author
                </FormLabel>
              <FormControl>
                <Input 
                {...field}
                placeholder="author"
                className="book-form_input"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

             <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
              <FormLabel className="font-base font-normal text-dark-500">
               Genre
                </FormLabel>
              <FormControl>
                <Input 
                {...field}
                placeholder="genre"
                className="book-form_input"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
              <FormLabel className="font-base font-normal text-dark-500">
               Rating
                </FormLabel>
              <FormControl>
                <Input 
                type="number"
                min={1}
                max={5}
                {...field}
                placeholder="Rating"
                className="book-form_input"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

         <FormField
              control={form.control}
              name="totalCopies"
              render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
              <FormLabel className="font-base font-normal text-dark-500">
               Total Copies
                </FormLabel>
              <FormControl>
                <Input 
                type="number"
                min={1}
                max={10000}
                {...field}
                placeholder="Total Copies"
                className="book-form_input"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       
        <FormField
              control={form.control}
              name="coverUrl"
              render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
              <FormLabel className="font-base font-normal text-dark-500">
               Book Cover
                </FormLabel>
              <FormControl>
              <FileUpload
              type="image"
              accept="image/*"
              placeholder="Upload a book cover"
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
              <FormItem className="flex flex-col gap-1">
              <FormLabel className="font-base font-normal text-dark-500">
              Cover color
                </FormLabel>
              <FormControl>
                {/* color picker */}
                <ColorPicker
                value={field.value}
                onPickerChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
  control={form.control}
  name="description"
  render={({ field }) => (
    <FormItem className="flex flex-col gap-1">
      <FormLabel className="font-base font-normal text-dark-500">
        Book Description
      </FormLabel>
      <FormControl>
        <Textarea
          {...field} // Bind the field to update the form state
          placeholder="Book description"
          className="book-form_input h-40 resize-none"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


          <FormField
  control={form.control}
  name="videoUrl" // Separate field for book trailer
  render={({ field }) => (
    <FormItem className="flex flex-col gap-1">
      <FormLabel className="font-base font-normal text-dark-500">
        Book Trailer
      </FormLabel>
      <FormControl>
        <FileUpload
          type="video"
          accept="video/*"
          placeholder="Upload the book trailer"
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
    <FormItem className="flex flex-col gap-1">
      <FormLabel className="font-base font-normal text-dark-500">
       Summary
      </FormLabel>
      <FormControl>
        <Textarea
          {...field} // Bind the field to update the form state
          placeholder="Book description"
          className="book-form_input h-40 resize-none"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


        <Button type="submit" className="book-form_btn text-white">
           <p> Add book to library</p>
           { isLoading &&<Image src="/icons/loading.png" className="invert animate-spin" alt="loader" width={20} height={20}/>}
        </Button>
      </form>
    </Form>  
        </div>
  )
}

export default BookForm