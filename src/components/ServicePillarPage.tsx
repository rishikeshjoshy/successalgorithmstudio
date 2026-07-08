import Link from "next/link";
import type { ServicePillarData } from "@/lib/pillars";

interface ServicePillarPageProps {
  data: ServicePillarData;
}

/**
 * Shared template for the 3 service pages (/social-media, /consulting,
 * /workshops). Plain static dark page — no lamp/WebGL background, since
 * LampScene is tightly coupled to full-viewport rendering and isn't safely
 * reusable in a constrained sub-page layout.
 */
export default function ServicePillarPage({ data }: ServicePillarPageProps) {
  return (
    <main className="pillar-page">
      <section className="pillar-hero">
        <p className="pillar-hero__eyebrow">{data.pillarLabel}</p>
        <h1 className="pillar-hero__title">{data.title}</h1>
        <p className="pillar-hero__subhead">{data.subhead}</p>
      </section>

      <section className="pillar-section">
        <p className="pillar-section__body">{data.problemStatement}</p>
      </section>

      <section className="pillar-section">
        <h2 className="pillar-section__heading">{data.processHeading}</h2>
        <ol className="pillar-process">
          {data.process.map((step, i) => (
            <li key={step.title} className="pillar-process__item">
              <span className="pillar-process__num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="pillar-process__title">{step.title}</p>
                <p className="pillar-process__body">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {data.included && (
        <section className="pillar-section">
          <h2 className="pillar-section__heading">What&rsquo;s Included</h2>
          <ul className="pillar-list">
            {data.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {data.outcomesTracked && (
        <section className="pillar-section">
          <h2 className="pillar-section__heading">Outcomes Tracked</h2>
          <ul className="pillar-list">
            {data.outcomesTracked.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {data.formats && (
        <section className="pillar-section">
          <h2 className="pillar-section__heading">Formats</h2>
          <div className="pillar-formats">
            {data.formats.map((format) => (
              <div key={format.label} className="pillar-formats__item">
                <p className="pillar-formats__label">{format.label}</p>
                <p className="pillar-formats__body">{format.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.pricingTiers && (
        <section className="pillar-section">
          <h2 className="pillar-section__heading">Pricing Tiers</h2>
          <p className="pillar-section__body">{data.pricingTiers.join(" · ")}</p>
        </section>
      )}

      {data.caseStudySnapshot && (
        <section className="pillar-section">
          <blockquote className="pillar-case-callout">
            <p className="pillar-case-callout__label">{data.caseStudySnapshot.label}</p>
            <p>{data.caseStudySnapshot.body}</p>
          </blockquote>
        </section>
      )}

      <section className="pillar-section pillar-section--cta">
        <Link href={data.ctaHref} className="pillar-cta">
          {data.ctaLabel}
        </Link>
      </section>
    </main>
  );
}
