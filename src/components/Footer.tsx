import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__line">
          The algorithm doesn&rsquo;t wait for perfect conditions. It gets built in the
          conditions you have.
        </p>
        <Link href="/book" className="footer__cta">
          Book a Call with Leadership →
        </Link>
      </div>

      <Link
        href="/knowledge"
        target="_blank"
        rel="noopener noreferrer"
        className="footer__knowledge-strip"
      >
        <span className="footer__knowledge-strip-label">Knowledge Repository</span>
        <span className="footer__knowledge-strip-desc">
          Frameworks, case studies, and reading built for operators who study the system
          before they scale it. →
        </span>
      </Link>
    </footer>
  );
}
