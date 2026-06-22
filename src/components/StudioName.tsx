/**
 * The studio name. Lives inside the full-viewport .light-mask wrapper, so it
 * is only readable where the lamp's cone actually points; the warm text glow
 * scales with how directly the beam hits it (--lit).
 */
export default function StudioName() {
  return (
    <header
      data-lit-target
      className="js-studio-name js-brand-el relative text-center"
      style={{
        textShadow:
          "0 0 calc(var(--lit, 0) * 46px) rgb(255 201 124 / calc(var(--lit, 0) * 0.4))",
      }}
    >
      <h1 className="font-display text-[clamp(2.6rem,8.5vw,6.5rem)] leading-[0.95] text-bone">
        <span className="block">Success</span>
        <span className="block italic text-lamp-bright">Algorithm</span>
      </h1>
      <p className="ml-[0.7em] mt-4 text-[clamp(0.7rem,1.4vw,1rem)] uppercase tracking-[0.7em] text-bone-dim">
        Studio
      </p>
    </header>
  );
}
