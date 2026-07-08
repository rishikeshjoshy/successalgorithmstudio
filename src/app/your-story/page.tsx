import type { Metadata } from "next";
import YourStoryQuiz from "@/components/YourStoryQuiz";

export const metadata: Metadata = {
  title: "Your Story — Success Algorithm Studios",
  description: "A 90-second diagnostic to show you exactly where SAS fits into what you're building.",
};

export default function YourStoryPage() {
  return <YourStoryQuiz />;
}
