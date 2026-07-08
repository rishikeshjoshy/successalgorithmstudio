import type { Metadata } from "next";
import ServicePillarPage from "@/components/ServicePillarPage";
import { WORKSHOPS_PAGE } from "@/lib/pillars";

export const metadata: Metadata = {
  title: "Educational Workshops — Success Algorithm Studios",
  description: WORKSHOPS_PAGE.subhead,
};

export default function WorkshopsPage() {
  return <ServicePillarPage data={WORKSHOPS_PAGE} />;
}
