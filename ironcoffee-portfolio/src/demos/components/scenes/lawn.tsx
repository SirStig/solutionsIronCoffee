import {
  registerScenes,
  INK,
  MID,
  POP,
  PAPER,
  WASH,
  tone,
  toneFine,
  hatch,
} from '../artwork';

/**
 * Lawn and yard work.
 *
 * The one image everybody in this trade has seen and nobody can draw is a
 * green rectangle. What sells the work is the stripes: a lawn that has been
 * cut by somebody who cared which direction they walked in, which is the only
 * visible difference between a good cut and a cheap one and the thing a
 * customer points at when a neighbor asks who does their yard.
 *
 * So the hero is the stripes in perspective and everything else is a tool
 * doing one job. Nothing here shows a house. A house in a lawn care
 * illustration is a claim about a customer's property, and a drawn one is
 * always somebody's and never theirs.
 */

/** Walk-behind mower, side on, traveling left. */
function Mower({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* Handle bar. */}
      <path
        d="M96 -14 L182 -150 H238"
        fill="none"
        stroke={INK}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M120 -52 L196 -66"
        fill="none"
        stroke={INK}
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* Deck. */}
      <path d="M-104 -16 H110 a16 16 0 0 1 16 16 v42 H-120 v-42 a16 16 0 0 1 16 -16 Z" fill={MID} />
      <path
        d="M-104 -16 H110 a16 16 0 0 1 16 16 v42 H-120 v-42 a16 16 0 0 1 16 -16 Z"
        fill="none"
        stroke={INK}
        strokeWidth="8"
      />
      {/* Engine block and filler cap. */}
      <rect x="-40" y="-84" width="104" height="70" rx="10" fill={INK} />
      <rect x="-14" y="-100" width="40" height="18" rx="6" fill={POP} />
      {/* Grass bag. */}
      <path d="M-120 -8 L-206 -46 a34 34 0 0 0 -22 32 v34 a20 20 0 0 0 20 20 h108 Z" fill={POP} />
      <path
        d="M-120 -8 L-206 -46 a34 34 0 0 0 -22 32 v34 a20 20 0 0 0 20 20 h108 Z"
        fill="none"
        stroke={INK}
        strokeWidth="8"
      />
      {/* Wheels. */}
      {[-78, 88].map((wx) => (
        <g key={wx}>
          <circle cx={wx} cy="52" r="38" fill={PAPER} />
          <circle cx={wx} cy="52" r="38" fill="none" stroke={INK} strokeWidth="9" />
          <circle cx={wx} cy="52" r="11" fill={INK} />
        </g>
      ))}
    </g>
  );
}

registerScenes({
  /* --- Hero. The stripes, which are the entire pitch. ------------------- */
  'lawn-stripes': {
    alt:
      'a lawn mown in alternating stripes running away to a treeline, with a ' +
      'mower part way through the next pass',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        <circle cx="240" cy="188" r="120" fill={POP} opacity="0.16" />

        {/* Treeline. Deciduous lumps and two conifers, because a row of
            identical blobs reads as a hedge and this is meant to be distance. */}
        <path
          d="M0 470 q54 -74 118 -50 q34 -70 108 -54 q56 -58 122 -18 q70 -62 140 -6
             q52 -50 118 -14 q58 -52 128 -6 q66 -44 134 4 q58 -38 132 10 L1200 470 Z"
          fill={MID}
          opacity="0.45"
        />
        <path d="M566 470 L604 344 L642 470 Z" fill={MID} opacity="0.7" />
        <path d="M812 470 L856 330 L900 470 Z" fill={MID} opacity="0.7" />

        {/* Mown stripes, every pass converging on one point the way they do
            when you stand at the end of the lawn and look down it. */}
        <g>
          {Array.from({ length: 17 }, (_, i) => {
            const x0 = -340 + i * 110;
            return (
              <path
                key={i}
                d={`M620 470 L${x0} 900 L${x0 + 110} 900 Z`}
                fill={MID}
                opacity={i % 2 ? 0.5 : 0.26}
              />
            );
          })}
          {/* One pass picked out in the halftone, which is what a fresh cut
              looks like against the pass beside it. */}
          <path d="M620 470 L-10 900 L100 900 Z" fill={tone(id)} color={MID} opacity="0.34" />
          <path d="M620 470 L980 900 L1090 900 Z" fill={tone(id)} color={MID} opacity="0.34" />
        </g>

        {/* The cut edge the mower is working to. */}
        <path
          d="M620 470 L1170 900"
          stroke={PAPER}
          strokeWidth="7"
          fill="none"
          opacity="0.55"
        />

        {/* No machine in this one on purpose. The trades hero parks a quote
            form over the right third and the headline over the left, so an
            object anywhere in the frame ends up half behind a card. The
            stripes are the pitch anyway: they are the visible difference
            between a cut and a good cut, and they read at any crop. */}
      </>
    ),
  },

  /* --- The machine on its own. ------------------------------------------ */
  'lawn-mower': {
    alt: 'a walk-behind mower with its grass bag on, side on',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        <circle cx="600" cy="420" r="330" fill={toneFine(id)} color={MID} opacity="0.34" />
        <Mower x={640} y={512} s={1.55} />
        {/* Cut line: shorn on the left of the deck, shaggy on the right. */}
        <path d="M0 654 H520" stroke={INK} strokeWidth="8" opacity="0.5" />
        <g stroke={MID} strokeWidth="9" strokeLinecap="round" opacity="0.85">
          <path d="M840 654 L832 596 M886 654 L890 586 M932 654 L922 600 M978 654 L988 582 M1024 654 L1014 594 M1070 654 L1080 588 M1116 654 L1106 598 M1162 654 L1170 584" />
        </g>
        <rect y="654" width="1200" height="246" fill={MID} opacity="0.22" />
      </>
    ),
  },

  /* --- Edging. The detail that separates a mow from a service. ---------- */
  'lawn-edge': {
    alt: 'a string trimmer cutting a clean edge along a concrete path',
    draw: () => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        {/* Turf, then the path running through it on the diagonal. */}
        <rect width="1200" height="900" fill={MID} opacity="0.34" />
        <path d="M0 596 L1200 316 L1200 512 L0 792 Z" fill={PAPER} />
        <path d="M0 596 L1200 316 M0 792 L1200 512" stroke={INK} strokeWidth="6" opacity="0.5" />
        {/* Slab joints. */}
        <g stroke={INK} strokeWidth="4" opacity="0.28">
          <path d="M210 566 L268 762 M470 505 L528 701 M730 444 L788 640 M990 383 L1048 579" />
        </g>

        {/* The trimmer, held at the angle you actually hold one. */}
        <g transform="translate(700 470) rotate(-28)">
          <path d="M-280 0 H150" stroke={INK} strokeWidth="18" strokeLinecap="round" />
          <rect x="120" y="-46" width="150" height="92" rx="26" fill={INK} />
          <rect x="196" y="-78" width="54" height="34" rx="10" fill={POP} />
          <path d="M-46 -26 a34 34 0 0 1 0 52" fill="none" stroke={INK} strokeWidth="14" />
          {/* Guard and head. */}
          <path d="M-280 -62 a62 62 0 0 0 0 124 Z" fill={POP} />
          <path d="M-280 -62 a62 62 0 0 0 0 124 Z" fill="none" stroke={INK} strokeWidth="7" />
          <circle cx="-280" cy="0" r="22" fill={PAPER} stroke={INK} strokeWidth="7" />
        </g>

        {/* Clippings thrown off the head. */}
        <g stroke={MID} strokeWidth="6" strokeLinecap="round" opacity="0.9">
          <path d="M300 640 L262 676 M356 664 L330 712 M244 600 L196 618 M320 580 L294 534 M394 616 L420 576 M250 686 L212 730" />
        </g>
      </>
    ),
  },

  /* --- Hedge. ----------------------------------------------------------- */
  'lawn-hedge': {
    alt: 'a boxwood hedge being squared off with hand shears, clippings falling',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        <rect y="700" width="1200" height="200" fill={MID} opacity="0.26" />

        {/* The hedge. One face already square, the far end still rough, which
            is the only way a drawing can show work in progress. */}
        <path
          d="M120 700 V352 H700 V700 Z"
          fill={MID}
          opacity="0.75"
        />
        <path
          d="M700 700 V352 q56 -34 92 6 q60 -40 104 10 q54 -26 84 18 V700 Z"
          fill={MID}
          opacity="0.55"
        />
        <path d="M120 700 V352 H700" fill="none" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
        <rect x="120" y="352" width="580" height="348" fill={tone(id)} color={INK} opacity="0.2" />

        {/* Leaf texture only where the eye lands, not everywhere. */}
        <g fill={INK} opacity="0.28">
          {Array.from({ length: 34 }, (_, i) => {
            const cx = 160 + ((i * 137) % 520);
            const cy = 392 + ((i * 89) % 280);
            return <ellipse key={i} cx={cx} cy={cy} rx="15" ry="9" transform={`rotate(${(i * 53) % 180} ${cx} ${cy})`} />;
          })}
        </g>

        {/* Shears, open, mid cut. */}
        <g transform="translate(688 300)">
          <path d="M0 0 L250 -96" stroke={INK} strokeWidth="16" strokeLinecap="round" />
          <path d="M0 22 L250 30" stroke={INK} strokeWidth="16" strokeLinecap="round" />
          <path d="M0 0 L-150 -74" stroke={POP} strokeWidth="24" strokeLinecap="round" />
          <path d="M0 22 L-150 84" stroke={POP} strokeWidth="24" strokeLinecap="round" />
          <circle cx="4" cy="11" r="15" fill={PAPER} stroke={INK} strokeWidth="8" />
        </g>

        {/* Clippings. */}
        <g fill={MID}>
          {[
            [726, 430], [768, 496], [712, 540], [792, 588], [742, 626], [812, 668],
            [690, 612], [836, 522], [676, 690], [858, 610],
          ].map(([cx, cy], i) => (
            <ellipse key={i} cx={cx} cy={cy} rx="17" ry="9" transform={`rotate(${(i * 41) % 180} ${cx} ${cy})`} />
          ))}
        </g>
      </>
    ),
  },

  /* --- Fall cleanup. ---------------------------------------------------- */
  'lawn-leaves': {
    alt: 'a leaf rake drawn through a pile of fallen leaves',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        <rect y="560" width="1200" height="340" fill={MID} opacity="0.22" />
        <rect y="560" width="1200" height="340" fill={hatch(id)} color={MID} opacity="0.1" />

        {/* Pile. */}
        <path d="M180 780 q170 -230 420 -196 q250 34 380 196 Z" fill={POP} opacity="0.55" />
        <path d="M180 780 q170 -230 420 -196 q250 34 380 196" fill="none" stroke={INK} strokeWidth="7" />

        {/* Leaves, three shapes rotated, never one shape repeated. */}
        <g>
          {Array.from({ length: 22 }, (_, i) => {
            const cx = 230 + ((i * 211) % 720);
            const cy = 600 + ((i * 97) % 168);
            const r = (i * 67) % 360;
            const alt = i % 3;
            return (
              <g key={i} transform={`translate(${cx} ${cy}) rotate(${r})`}>
                <path
                  d={
                    alt === 0
                      ? 'M0 -26 q26 12 0 52 q-26 -40 0 -52 Z'
                      : alt === 1
                        ? 'M-26 0 q14 -26 52 0 q-38 26 -52 0 Z'
                        : 'M0 -24 q30 24 0 48 q-30 -24 0 -48 Z'
                  }
                  fill={i % 2 ? POP : MID}
                  stroke={INK}
                  strokeWidth="4"
                />
              </g>
            );
          })}
        </g>

        {/* Rake. */}
        <g transform="translate(880 430) rotate(24)">
          <path d="M0 0 L0 300" stroke={INK} strokeWidth="18" strokeLinecap="round" />
          <path d="M-26 -10 h52" stroke={INK} strokeWidth="14" strokeLinecap="round" />
          {Array.from({ length: 11 }, (_, i) => {
            const a = -50 + i * 10;
            return (
              <path
                key={i}
                d={`M0 300 L${Math.sin((a * Math.PI) / 180) * 176} ${300 + Math.cos((a * Math.PI) / 180) * 176}`}
                stroke={INK}
                strokeWidth="7"
                strokeLinecap="round"
              />
            );
          })}
        </g>
      </>
    ),
  },

  /* --- Water. ----------------------------------------------------------- */
  'lawn-sprinkler': {
    alt: 'a pop-up sprinkler throwing an arc of water across cut turf',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />

        {/* Turf fills two thirds of the frame. The first version put a small
            head on a thin strip of green and read as a diagram of a sprinkler
            rather than as a picture of a watered lawn. */}
        <rect y="470" width="1200" height="430" fill={MID} opacity="0.4" />
        <rect y="470" width="1200" height="430" fill={tone(id)} color={MID} opacity="0.26" />
        <path d="M0 470 H1200" stroke={INK} strokeWidth="7" opacity="0.4" />

        {/* Four throws of decreasing reach. A rotor frozen is a sequence of
            arcs, not a fan. */}
        {[
          { r: 880, o: 0.42 },
          { r: 700, o: 0.6 },
          { r: 520, o: 0.78 },
          { r: 344, o: 0.95 },
        ].map((arc) => (
          <path
            key={arc.r}
            d={`M170 470 q${arc.r / 2} ${-arc.r * 0.86} ${arc.r} 0`}
            fill="none"
            stroke={WASH}
            strokeWidth="13"
            strokeLinecap="round"
            opacity={arc.o}
            strokeDasharray="44 30"
          />
        ))}

        {/* The head, big enough to be an object. */}
        <rect x="130" y="404" width="80" height="74" rx="12" fill={INK} />
        <rect x="148" y="322" width="44" height="96" rx="20" fill={POP} />
        <circle cx="170" cy="322" r="23" fill={PAPER} stroke={INK} strokeWidth="9" />

        {/* Where the water lands. */}
        <g fill={WASH}>
          {[
            [1004, 432], [1060, 386], [948, 372], [1108, 430], [896, 414],
            [1148, 376], [860, 356], [1010, 330],
          ].map(([cx, cy], i) => (
            <ellipse key={i} cx={cx} cy={cy} rx="12" ry="20" />
          ))}
        </g>

        {/* Blades at the front, which is what stops the turf reading as a
            painted rectangle. */}
        <g stroke={MID} strokeWidth="11" strokeLinecap="round" opacity="0.95">
          <path d="M96 900 L112 760 M180 900 L166 782 M380 900 L396 754 M462 900 L448 788 M700 900 L716 766 M786 900 L772 790 M1000 900 L1016 758 M1084 900 L1070 784" />
        </g>
      </>
    ),
  },
});

export {};
