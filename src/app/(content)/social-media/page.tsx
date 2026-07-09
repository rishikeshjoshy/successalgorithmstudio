import type { Metadata } from "next";
import ServicePillarPage from "@/components/ServicePillarPage";
import { SOCIAL_MEDIA_PAGE } from "@/lib/pillars";

export const metadata: Metadata = {
  title: "Social Media — Success Algorithm Studios",
  description: SOCIAL_MEDIA_PAGE.subhead,
};

export default function SocialMediaPage() {
  return <ServicePillarPage data={SOCIAL_MEDIA_PAGE} />;
}
