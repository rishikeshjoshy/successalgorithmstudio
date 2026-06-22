# Success Algorithm Studio

A single-screen WebGL site: a carrom-board style overhead lamp hanging in a
dark room. The lamp follows your cursor, its pool of light reveals the studio
name, and a central toggle swaps the brand view for three service cards — all
inside the light.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Three.js · GSAP

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. Production build: `npm run build && npm start`.

## Plugging in real assets

Both asset slots live in [`src/lib/constants.ts`](src/lib/constants.ts):

- **Lamp model (GLTF/GLB):** drop your file into `public/models/` and set
  `LAMP_MODEL_URL = "/models/your-lamp.glb"`. Use `LAMP_MODEL_SCALE` and
  `LAMP_MODEL_Y_OFFSET` to fit it inside the lamp head group. The built-in
  procedural lamp (lathe shade, brass rim, emissive bulb) renders whenever the
  URL is empty or the model fails to load.
- **HDRI environment:** drop an `.hdr` file into `public/hdri/` and set
  `HDRI_URL = "/hdri/your-env.hdr"`. Falls back to Three's `RoomEnvironment`.

Everything else that is tunable — services copy, dock items, spotlight
physics, aim clamps, animation durations/eases — is in the same file.

## Architecture

```
src/
├── app/
│   ├── layout.tsx          # Fraunces + Space Grotesk fonts, metadata
│   ├── page.tsx            # renders <LampHero />
│   └── globals.css         # Tailwind v4 theme tokens, light-mask, noise, vignette
├── components/
│   ├── LampHero.tsx        # mode state (brand/services), composes everything
│   ├── LampScene.tsx       # Three.js: lamp, spotlight, cone shader, dust, coins
│   ├── StudioName.tsx      # name revealed by the light pool (mask follows lamp)
│   ├── HeroButton.tsx      # central mode toggle (aria-pressed, Esc returns)
│   ├── StoryCircle.tsx     # OUR STORY / YOUR STORY carrom-coin anchors
│   ├── ServiceCards.tsx    # three cards with hover parallax
│   └── Dock.tsx            # macOS-style dock with magnification
├── hooks/
│   ├── useLampControls.ts  # pointer -> lamp aim + DOM light vars (--light-x/y, --lit)
│   └── useHeroTimelines.ts # GSAP: intro flicker, idle breathing, mode transitions
└── lib/
    ├── constants.ts        # all static data and tuning knobs
    ├── gsap.ts             # centralized GSAP plugin registration
    └── lamp-state.ts       # shared mutable state: GSAP/pointer -> render loop
```

The DOM and WebGL stay in sync through two channels: a shared mutable
`LampSceneState` object (GSAP tweens it, the render loop reads it) and a
screen-space model of the light cone published as CSS variables by
`useLampControls`. The cone has an apex at the lamp head, a sweep angle that
follows the pointer, an angular penumbra, distance falloff, and the live bulb
power (it flickers with the intro). The studio name sits behind a conic+radial
mask (`--beam-*`) so only the beam reveals it, and every other overlay element
(`[data-lit-target]`) gets a per-frame `--lit` factor from actually
intersecting the cone, driving brightness and glow on circles, cards, the
hero button and the dock. Beam geometry knobs live in `BEAM` in constants.

`prefers-reduced-motion` swaps every timeline for simple fades and disables
idle sway, dust drift, dock magnification, and card parallax.
