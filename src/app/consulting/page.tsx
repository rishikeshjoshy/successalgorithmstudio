import type { Metadata } from "next";
import ServicePillarPage from "@/components/ServicePillarPage";
import { CONSULTING_PAGE } from "@/lib/pillars";

export const metadata: Metadata = {
  title: "Business Consulting — Success Algorithm Studios",
  description: CONSULTING_PAGE.subhead,
};

export default function ConsultingPage() {
  return <ServicePillarPage data={CONSULTING_PAGE} />;
}
