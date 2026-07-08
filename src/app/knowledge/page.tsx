import type { Metadata } from "next";
import KnowledgeRepository from "@/components/KnowledgeRepository";

export const metadata: Metadata = {
  title: "Knowledge Repository — Success Algorithm Studios",
  description:
    "Everything SAS studies, references, and builds from — organized so you can study the system, not just the service.",
};

export default function KnowledgePage() {
  return <KnowledgeRepository />;
}
