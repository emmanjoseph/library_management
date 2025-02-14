interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string | null;
  summary: string;
  createdAt?: Date | null;
  isLoanedBook?:boolean
}
interface BorrowedBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  coverColor: string;
  coverUrl: string;
  dueDate?: Date | null;
  borrowDate?: Date | null;
  isLoanedBook?:boolean;
  status:string,
  daysDue:number
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  university:string
  universityId: number;
  universityCard: string;
}

interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl?: string;
  summary: string;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}