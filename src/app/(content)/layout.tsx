import Link from "next/link";
import Footer from "@/components/Footer";
import ContentLamp from "@/components/ContentLamp";

/**
 * Content pages (services, quiz, knowledge, booking) are long-form and
 * scroll, so they get the global Footer. The home route stays outside this
 * group: it is exactly one non-scrolling viewport of lamp hero.
 *
 * The lamp room stays visible here too — ContentLamp pins the WebGL scene
 * behind the scrolling content — and every page gets a fixed close button
 * back to the lamp room.
 */
export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ContentLamp />
      <Link href="/" aria-label="Close and return home" className="page-close">
        ✕
      </Link>
      <div className="relative z-10">
        {children}
        <Footer />
      </div>
    </>
  );
}
