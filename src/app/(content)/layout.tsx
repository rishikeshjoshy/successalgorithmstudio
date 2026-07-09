import Footer from "@/components/Footer";

/**
 * Content pages (services, quiz, knowledge, booking) are long-form and
 * scroll, so they get the global Footer. The home route stays outside this
 * group: it is exactly one non-scrolling viewport of lamp hero.
 */
export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
