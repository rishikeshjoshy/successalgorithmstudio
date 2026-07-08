import Link from "next/link";

const ROWS = [
  {
    pillar: "Social Media",
    deploy: "Content Architecture, platform strategy, creative direction, community systems",
    proof: "Engagement rate lift tracked monthly",
  },
  {
    pillar: "Business Consulting",
    deploy: "The SAS Revenue Architecture — a 5-component sales system",
    proof: "Pipeline velocity improvement inside 90 days",
  },
  {
    pillar: "Educational Workshops",
    deploy: "Foundation, Mastery, and Enterprise Strategy programs",
    proof: "Behavioral transfer, not information dump",
  },
];

/**
 * Home page mid-section, rendered only on "/" after the hero. The hero
 * itself is untouched (h-dvh, self-contained); this lives in normal document
 * flow below it — the page now scrolls past the hero to reach this and the
 * global Footer, which the removal of body{overflow:hidden} makes possible.
 */
export default function ServicePillarPreview() {
  return (
    <section className="pillar-page pillar-preview">
      <p className="pillar-hero__eyebrow">The SAS System</p>
      <h2 className="pillar-hero__title pillar-preview__heading">
        Success Is Architectural, Not Accidental.
      </h2>
      <p className="pillar-hero__subhead">
        Every brand that scales, every sales team that compounds, every leader who commands
        a room did so by design — not luck. SAS exists to build that design. We diagnose
        before we prescribe, we customize before we execute, and we measure everything
        against outcomes agreed before the engagement begins.
      </p>

      <table className="pillar-preview__table">
        <thead>
          <tr>
            <th>Pillar</th>
            <th>What We Deploy</th>
            <th>Proof Point</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.pillar}>
              <td>{row.pillar}</td>
              <td>{row.deploy}</td>
              <td>{row.proof}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link href="/your-story" className="pillar-cta">
        Not sure where to start? Take Your Story →
      </Link>
    </section>
  );
}
