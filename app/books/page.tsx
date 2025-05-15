import { BookGrid } from "@/components/book-grid"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { getBooks } from "@/lib/api"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Books | Studiall",
  description: "Browse our collection of books",
}

export default async function BooksPage() {
  const books = await getBooks()

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground pb-16 lg:pb-0">
      <div className="w-full max-w-7xl mx-auto">
        <header className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="p-2">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold">All Books</h1>
          </div>
        </header>

        <div className="p-4 lg:p-8">
          <BookGrid books={books} />
        </div>
      </div>
    </main>
  )
}
