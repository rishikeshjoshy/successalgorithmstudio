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
      <p className="mb-2 text-[clamp(0.5rem,1vw,0.65rem)] uppercase tracking-[0.35em] text-lamp opacity-70 md:text-[clamp(0.6rem,1.2vw,0.78rem)]">
        Growth Architecture For Modern Businesses
      </p>
      <h1 className="font-accent text-[clamp(1.8rem,5.5vw,4.4rem)] leading-[1] text-bone md:text-[clamp(2.16rem,6.6vw,5.28rem)]">
        <span className="block">Success</span>
        <span className="block text-lamp-bright">Algorithm</span>
      </h1>
      <p className="ml-[0.7em] mt-4 text-[clamp(0.7rem,1.4vw,1rem)] uppercase tracking-[0.7em] text-bone-dim md:text-[clamp(0.84rem,1.68vw,1.2rem)]">
        Studios
      </p>
    </header>
  );
}
