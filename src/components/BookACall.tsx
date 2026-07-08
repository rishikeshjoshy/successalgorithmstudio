const STEPS = [
  "20 minutes — we ask about your current state, not our services",
  "We identify the single highest-leverage gap in what you're building",
  "If there's a fit, we scope a bespoke engagement. If there isn't, we tell you that too.",
];

export default function BookACall() {
  return (
    <main className="pillar-page">
      <section className="pillar-hero">
        <h1 className="pillar-hero__title">Begin With a Diagnostic, Not a Pitch.</h1>
        <p className="pillar-hero__subhead">
          Every SAS engagement starts the same way — with us understanding your business
          before we propose anything. This call is that diagnostic.
        </p>
      </section>

      <section className="pillar-section">
        <h2 className="pillar-section__heading">What to Expect</h2>
        <ol className="pillar-process">
          {STEPS.map((step, i) => (
            <li key={step} className="pillar-process__item">
              <span className="pillar-process__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="pillar-process__body">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="pillar-section">
        {/*
          PLACEHOLDER — replace with the real Cal.com or Calendly embed.
          No SDK is installed here (none is required for a standard iframe
          or inline script embed). Steps once a real scheduling link exists:
            1. Get the embed snippet from Cal.com (Settings > Embed) or
               Calendly (Share > Add to Site).
            2. For a script-based embed, load it via next/script with
               strategy="lazyOnload" so it doesn't block page load.
            3. Swap this placeholder div for the real embed container the
               snippet expects.
          Not guessing at the exact current embed markup here — both
          providers' embed APIs have changed across versions; confirm the
          current syntax on their docs at implementation time.
        */}
        <div className="book-embed-placeholder" aria-label="Scheduling widget placeholder">
          <p>Scheduling widget goes here.</p>
        </div>
      </section>

      <p className="book-fine-print">No pitch decks. No pressure. Just diagnosis.</p>
    </main>
  );
}
