import type { Metadata } from "next";
import BookACall from "@/components/BookACall";

export const metadata: Metadata = {
  title: "Book a Call — Success Algorithm Studios",
  description: "Begin with a diagnostic, not a pitch.",
};

export default function BookPage() {
  return <BookACall />;
}
