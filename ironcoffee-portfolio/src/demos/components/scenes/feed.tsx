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
 * A feed and country supply store on the eastern Colorado plains.
 *
 * Drawn for the horizon rather than for the shop. A feed store's customers
 * drive in from somewhere, and the thing they picture when they think of the
 * place is the road out to it: sky doing most of the work, a windmill, a
 * fence running away from you. That is what the hero is. The interior scenes
 * are close in on the things people actually come for, because the second
 * question after "are you open" is always "have you got any".
 */

/**
 * Twelve blades on a hub, which is what an Aermotor actually has.
 *
 * `legs` is where the feet land in the windmill's own coordinates, so a
 * caller can stand it on whatever it is standing on. Without it the tower
 * ended in mid air above the horizon, which nobody reads as perspective.
 */
function Windmill({
  x,
  y,
  s,
  legs = 268,
}: {
  x: number;
  y: number;
  s: number;
  legs?: number;
}) {
  const blades = Array.from({ length: 12 }, (_, i) => i * 30);
  // The tower tapers on a straight line from the hub collar to the feet.
  const at = (h: number) => 15 + (31 * (h - 4)) / 264;
  const foot = at(legs);
  const rows = [0.24, 0.5, 0.76].map((t) => {
    const h = 4 + (legs - 4) * t;
    return { h, w: at(h) };
  });

  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d={`M${-foot} ${legs} L-15 4 M${foot} ${legs} L15 4`}
        stroke={INK}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      {rows.map((r) => (
        <path
          key={r.h}
          d={`M${-r.w} ${r.h} H${r.w}`}
          stroke={INK}
          strokeWidth="4.5"
          fill="none"
        />
      ))}
      {/* Diagonal bracing, one X per bay. */}
      {rows.map((r, i) => {
        const next = rows[i + 1] ?? { h: legs, w: foot };
        return (
          <path
            key={`x${r.h}`}
            d={`M${-r.w} ${r.h} L${next.w} ${next.h} M${r.w} ${r.h} L${-next.w} ${next.h}`}
            stroke={INK}
            strokeWidth="3.2"
            fill="none"
            opacity="0.6"
          />
        );
      })}

      {/* Vane, turned inward so the tail never crops off the frame. */}
      <path d="M-8 -6 L-104 -44 L-104 34 L-8 12 Z" fill={POP} />
      <path
        d="M-8 -6 L-104 -44 L-104 34 L-8 12 Z"
        fill="none"
        stroke={INK}
        strokeWidth="5"
      />

      {blades.map((deg) => (
        <path
          key={deg}
          d="M0 0 L-9 -62 L9 -62 Z"
          fill={INK}
          transform={`rotate(${deg})`}
        />
      ))}
      <circle cx="0" cy="0" r="13" fill={PAPER} stroke={INK} strokeWidth="6" />
    </g>
  );
}

registerScenes({
  /* --- Hero. The drive out, not the shop. ------------------------------- */
  'feed-plains': {
    alt:
      'a barn, a grain silo and a windmill on the open plains, with a wire ' +
      'fence running out to the road',
    /*
     * Composed for the crop, not for the artboard.
     *
     * A hero band is nearer 3:1 than the 4:3 this is drawn on, so `slice`
     * keeps the full width and shows roughly y 250 to 650 of it. Everything
     * that has to survive lives in that stripe, and everything in the stripe
     * sits right of x 700, because the headline owns the left half and a barn
     * behind the word ELIZABETH is not a background, it is a distraction.
     */
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />

        {/* Low sun, printed as a halftone field so it carries no gradient. */}
        <circle cx="1010" cy="300" r="196" fill={POP} opacity="0.2" />
        <circle
          cx="1010"
          cy="300"
          r="140"
          fill={toneFine(id)}
          color={POP}
          opacity="0.8"
        />

        {/* Two ridges. The far one lighter, which is the whole of the depth. */}
        <path
          d="M0 520 L168 494 L330 516 L512 482 L700 508 L900 478 L1080 502 L1200 488 L1200 900 L0 900 Z"
          fill={WASH}
          opacity="0.5"
        />
        <path
          d="M0 574 L200 560 L430 578 L660 552 L900 572 L1200 548 L1200 900 L0 900 Z"
          fill={MID}
          opacity="0.3"
        />

        {/* Barn. A gambrel roof, because a plains barn has one and a pitched
            rectangle reads as a house. */}
        <g>
          <path d="M780 456 L846 398 L922 368 L998 398 L1064 456 Z" fill={MID} />
          <rect x="796" y="456" width="252" height="122" fill={MID} opacity="0.72" />
          <path
            d="M780 456 L846 398 L922 368 L998 398 L1064 456 M796 456 v122 h252 v-122"
            fill="none"
            stroke={INK}
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <rect x="886" y="500" width="72" height="78" fill={PAPER} opacity="0.9" />
          <path d="M886 500 L958 578 M958 500 L886 578" stroke={INK} strokeWidth="5" />
          <rect x="904" y="410" width="36" height="32" fill={INK} opacity="0.7" />
        </g>

        {/* Silo. */}
        <g>
          <path d="M1082 424 a42 30 0 0 1 84 0 Z" fill={POP} />
          <rect x="1082" y="424" width="84" height="154" fill={MID} />
          <path
            d="M1082 424 h84 v154 h-84 Z"
            fill="none"
            stroke={INK}
            strokeWidth="6"
          />
          <path
            d="M1082 462 h84 M1082 500 h84 M1082 538 h84"
            stroke={INK}
            strokeWidth="3"
            opacity="0.45"
          />
        </g>

        {/* Windmill, vane turned inward so the tail never crops. */}
        <Windmill x={700} y={296} s={0.84} legs={336} />

        {/* Ground, and a fence running out of frame, which is what puts the
            viewer on the road to the place rather than standing in a field. */}
        <rect y="578" width="1200" height="322" fill={MID} opacity="0.2" />
        <rect
          y="578"
          width="1200"
          height="322"
          fill={hatch(id)}
          color={MID}
          opacity="0.14"
        />
        <g stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.5">
          <path d="M60 700 L60 590 M300 706 L300 588 M540 712 L540 586 M780 718 L780 584 M1020 724 L1020 582 M1190 728 L1190 580" />
        </g>
        <g stroke={INK} strokeWidth="3.4" fill="none" opacity="0.4">
          <path d="M0 614 L1200 600 M0 644 L1200 624" />
        </g>
      </>
    ),
  },
  'feed-sacks': {
    alt: 'a pallet stacked five high with printed feed sacks, lit from a high window',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        {/* Light from a high window, a flat shape rather than a gradient. */}
        <path
          d="M760 0 L1200 0 L1200 620 L520 900 L216 900 Z"
          fill={POP}
          opacity="0.12"
        />

        {/* Pallet. */}
        <rect x="180" y="782" width="840" height="26" fill={INK} />
        <rect x="180" y="808" width="840" height="14" fill={INK} opacity="0.55" />
        <g fill={INK}>
          <rect x="212" y="822" width="54" height="40" />
          <rect x="573" y="822" width="54" height="40" />
          <rect x="934" y="822" width="54" height="40" />
        </g>

        {/* Sacks. Slumped, not boxes: a full feed sack sags at the corners and
          a stack of rectangles reads as cargo crates. */}
        {[
          { x: 208, y: 610, w: 372, h: 176, c: MID },
          { x: 596, y: 610, w: 372, h: 176, c: INK },
          { x: 296, y: 438, w: 372, h: 176, c: INK },
          { x: 684, y: 438, w: 300, h: 176, c: MID },
          { x: 392, y: 268, w: 372, h: 176, c: POP },
        ].map((s, i) => (
          <g key={i}>
            <path
              d={`M${s.x + 14} ${s.y} q${s.w / 2 - 14} -18 ${s.w - 28} 0 q22 ${s.h / 2} 0 ${s.h} q-${s.w / 2 - 14} 18 -${s.w - 28} 0 q-22 -${s.h / 2} 0 -${s.h} Z`}
              fill={s.c}
            />
            <path
              d={`M${s.x + 14} ${s.y} q${s.w / 2 - 14} -18 ${s.w - 28} 0 q22 ${s.h / 2} 0 ${s.h} q-${s.w / 2 - 14} 18 -${s.w - 28} 0 q-22 -${s.h / 2} 0 -${s.h} Z`}
              fill="none"
              stroke={INK}
              strokeWidth="5"
            />
            {/* Stitched top seam and a printed band, which is all a feed sack
              has on it from ten feet away. */}
            <path
              d={`M${s.x + 30} ${s.y + 22} q${s.w / 2 - 30} -14 ${s.w - 60} 0`}
              stroke={PAPER}
              strokeWidth="4"
              strokeDasharray="12 10"
              fill="none"
              opacity="0.8"
            />
            <rect
              x={s.x + 46}
              y={s.y + s.h * 0.42}
              width={s.w - 92}
              height={s.h * 0.24}
              fill={PAPER}
              opacity="0.85"
            />
            <rect
              x={s.x + 46}
              y={s.y + s.h * 0.42}
              width={s.w - 92}
              height={s.h * 0.24}
              fill={tone(id)}
              color={s.c === POP ? INK : POP}
              opacity="0.55"
            />
          </g>
        ))}
      </>
    ),
  },

  /* --- Chicks. The one thing people ring up about. ---------------------- */
  'feed-brooder': {
    alt: 'chicks in a galvanized brooder ring under a heat lamp',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />

        {/* Heat lamp: shade, flex, and the cone of light as a flat shape. */}
        <path d="M600 30 L600 140" stroke={INK} strokeWidth="8" />
        <path d="M472 250 q128 -128 256 0 Z" fill={INK} />
        <circle cx="600" cy="254" r="32" fill={POP} />
        <path d="M568 278 L286 700 L914 700 Z" fill={POP} opacity="0.16" />

        {/*
         * The ring, drawn as a wall rather than as a rim.
         *
         * The first version was an ellipse with a band around it and read,
         * unmistakably, as a dinner plate. A brooder ring is a corrugated
         * wall about knee high, so it gets a visible height, a top edge you
         * can see over, and corrugation lines down it.
         */}
        <path
          d="M160 620 a440 132 0 0 0 880 0 v118 a440 132 0 0 1 -880 0 Z"
          fill={MID}
        />
        <ellipse cx="600" cy="620" rx="440" ry="132" fill={WASH} />
        <ellipse cx="600" cy="620" rx="440" ry="132" fill="none" stroke={INK} strokeWidth="8" />
        <path
          d="M160 620 v118 a440 132 0 0 0 880 0 v-118"
          fill="none"
          stroke={INK}
          strokeWidth="8"
        />
        {/* Corrugation, only on the near face where it would be visible. */}
        <g stroke={INK} strokeWidth="4" opacity="0.4">
          {Array.from({ length: 15 }, (_, i) => {
            const a = Math.PI * (0.06 + (i / 14) * 0.88);
            const x = 600 - Math.cos(a) * 440;
            const y = 620 + Math.sin(a) * 132;
            return <path key={i} d={`M${x} ${y} v112`} />;
          })}
        </g>

        {/* Litter inside. */}
        <ellipse cx="600" cy="628" rx="392" ry="108" fill={POP} opacity="0.32" />
        <ellipse cx="600" cy="628" rx="392" ry="108" fill={tone(id)} color={POP} opacity="0.4" />

        {/* A feeder, because a ring of birds with nothing in it is a bowl. */}
        <g transform="translate(872 588)">
          <path d="M-74 0 h148 l-16 56 h-116 Z" fill={MID} />
          <path d="M-74 0 h148 l-16 56 h-116 Z" fill="none" stroke={INK} strokeWidth="6" />
          <ellipse cx="0" cy="0" rx="74" ry="20" fill={WASH} stroke={INK} strokeWidth="6" />
          <path d="M-38 -2 v-34 M0 -2 v-40 M38 -2 v-34" stroke={INK} strokeWidth="5" />
        </g>

        {/*
         * Chicks, with legs.
         *
         * Two ovals and a beak was enough at thumbnail size and nothing like
         * enough here: without legs they sat in the litter like eggs. Legs are
         * also what fixes the scale, because a bird standing on the floor of a
         * ring is obviously small and a shape floating in a dish is not.
         */}
        {[
          { x: 336, y: 640, s: 1.05, f: 1 },
          { x: 470, y: 690, s: 1.2, f: 1 },
          { x: 636, y: 664, s: 1.1, f: -1 },
          { x: 760, y: 704, s: 1, f: -1 },
          { x: 560, y: 596, s: 0.86, f: 1 },
          { x: 408, y: 578, s: 0.76, f: -1 },
          { x: 706, y: 582, s: 0.8, f: 1 },
          { x: 262, y: 700, s: 0.94, f: 1 },
        ].map((c, i) => (
          <g key={i} transform={`translate(${c.x} ${c.y}) scale(${c.s * c.f} ${c.s})`}>
            <path d="M-16 34 v18 M14 34 v18" stroke={INK} strokeWidth="5" strokeLinecap="round" />
            <path d="M-24 52 h16 M6 52 h16" stroke={INK} strokeWidth="5" strokeLinecap="round" />
            <ellipse cx="0" cy="4" rx="46" ry="38" fill={POP} />
            <ellipse cx="0" cy="4" rx="46" ry="38" fill="none" stroke={INK} strokeWidth="5" />
            <path d="M-12 0 q24 14 0 30" fill="none" stroke={INK} strokeWidth="4" opacity="0.6" />
            <circle cx="34" cy="-30" r="25" fill={POP} />
            <circle cx="34" cy="-30" r="25" fill="none" stroke={INK} strokeWidth="5" />
            <circle cx="42" cy="-36" r="4.4" fill={INK} />
            <path d="M56 -28 L72 -23 L56 -18 Z" fill={INK} />
          </g>
        ))}
      </>
    ),
  },

  /* --- Hay. ------------------------------------------------------------- */
  'feed-hay': {
    alt: 'square hay bales stacked in courses against a boarded barn wall',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        <rect y="0" width="1200" height="300" fill={WASH} opacity="0.5" />
        {/* Barn wall behind, boarded. */}
        <g stroke={INK} strokeWidth="4" opacity="0.22">
          <path d="M60 0 L60 900 M220 0 L220 900 M380 0 L380 900 M540 0 L540 900 M700 0 L700 900 M860 0 L860 900 M1020 0 L1020 900 M1180 0 L1180 900" />
        </g>
        <rect y="824" width="1200" height="76" fill={hatch(id)} color={MID} opacity="0.18" />

        {/*
         * Square bales, courses crossed the way they are actually stacked so
         * the stack does not fall over.
         *
         * Corners are square and there is no halftone on them. Rounded corners
         * plus a dot field is basketwork, and the first version of this came
         * out as a stack of wicker hampers. What a bale actually looks like is
         * a hard rectangle full of horizontal stems, so that is all it is: a
         * rectangle, two strings, and a lot of short irregular strokes.
         */}
        {[
          { x: 120, y: 620 },
          { x: 452, y: 620 },
          { x: 784, y: 620 },
          { x: 286, y: 400 },
          { x: 618, y: 400 },
          { x: 452, y: 180 },
        ].map((b, i) => (
          <g key={i}>
            <rect
              x={b.x}
              y={b.y}
              width="308"
              height="204"
              rx="3"
              fill={POP}
              opacity={i % 2 ? 0.48 : 0.4}
            />

            {/* Straw. Irregular lengths and starts, or it reads as ruled
                paper. Deterministic so the build and the browser agree. */}
            <g stroke={INK} strokeWidth="3" opacity="0.4" strokeLinecap="round">
              {Array.from({ length: 22 }, (_, k) => {
                const y = b.y + 12 + k * 8.7;
                const x0 = b.x + 12 + ((k * 61 + i * 29) % 52);
                const len = 96 + ((k * 97 + i * 43) % 176);
                return <path key={k} d={`M${x0} ${y} h${len}`} />;
              })}
              {Array.from({ length: 18 }, (_, k) => {
                const y = b.y + 18 + k * 10.6;
                const x1 = b.x + 296 - ((k * 53 + i * 37) % 44);
                const len = 78 + ((k * 89 + i * 31) % 150);
                return <path key={`r${k}`} d={`M${x1} ${y} h-${len}`} />;
              })}
            </g>

            <rect
              x={b.x}
              y={b.y}
              width="308"
              height="204"
              rx="3"
              fill="none"
              stroke={INK}
              strokeWidth="6"
            />

            {/* Baling twine, sitting proud of the straw. */}
            <path
              d={`M${b.x + 78} ${b.y} v204 M${b.x + 230} ${b.y} v204`}
              stroke={INK}
              strokeWidth="6"
              opacity="0.85"
            />
          </g>
        ))}
      </>
    ),
  },

  /* --- Propane. --------------------------------------------------------- */
  'feed-propane': {
    alt: 'exchange propane cylinders standing in a steel cage',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        <rect y="640" width="1200" height="260" fill={MID} opacity="0.16" />
        <rect y="640" width="1200" height="260" fill={hatch(id)} color={MID} opacity="0.1" />

        {/* Cage. */}
        <rect x="140" y="230" width="920" height="450" fill="none" stroke={INK} strokeWidth="10" />
        <g stroke={INK} strokeWidth="4" opacity="0.32">
          <path d="M140 350 h920 M140 470 h920 M140 590 h920 M324 230 v450 M508 230 v450 M692 230 v450 M876 230 v450" />
        </g>

        {/*
         * Cylinders.
         *
         * What makes one read as propane rather than as a flask is the collar:
         * a raised ring around the valve with a handhold cut in it. Without it
         * these came out as a row of water bottles in a crate.
         */}
        {[268, 468, 668, 868].map((x, i) => (
          <g key={x}>
            {/* Foot ring. */}
            <rect x={x - 66} y="632" width="132" height="24" rx="6" fill={INK} />
            {/* Body. */}
            <rect
              x={x - 66}
              y="392"
              width="132"
              height="246"
              rx="26"
              fill={i % 2 ? MID : POP}
            />
            <rect
              x={x - 66}
              y="392"
              width="132"
              height="246"
              rx="26"
              fill="none"
              stroke={INK}
              strokeWidth="7"
            />
            {/* Printed band. */}
            <rect x={x - 66} y="464" width="132" height="52" fill={PAPER} opacity="0.5" />
            <rect
              x={x - 66}
              y="464"
              width="132"
              height="52"
              fill={tone(id)}
              color={INK}
              opacity="0.3"
            />

            {/* Collar: a ring with a handhold, drawn open at the front. */}
            <path
              d="M-54 0 v-46 a54 54 0 0 1 108 0 v46"
              transform={`translate(${x} 398)`}
              fill="none"
              stroke={INK}
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d={`M${x - 30} 352 h60`}
              stroke={INK}
              strokeWidth="11"
              strokeLinecap="round"
            />
            {/* Valve and handwheel. */}
            <rect x={x - 13} y="336" width="26" height="30" fill={INK} />
            <ellipse cx={x} cy="332" rx="26" ry="10" fill={INK} />
          </g>
        ))}
      </>
    ),
  },

  /* --- Seed, poured. ---------------------------------------------------- */
  'feed-seed': {
    alt: 'a metal scoop pouring seed into a pile',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        <circle
          cx="600"
          cy="470"
          r="330"
          fill={toneFine(id)}
          color={MID}
          opacity="0.3"
        />

        {/* Galvanized scoop. */}
        <g transform="translate(600 400) rotate(-18)">
          <path
            d="M-230 -110 L60 -110 q86 0 86 96 q0 96 -86 96 L-230 82 Z"
            fill={WASH}
          />
          <path
            d="M-230 -110 L60 -110 q86 0 86 96 q0 96 -86 96 L-230 82 Z"
            fill="none"
            stroke={INK}
            strokeWidth="8"
          />
          <path d="M-230 -110 L-330 -70 L-330 42 L-230 82 Z" fill={INK} />
          <path d="M-186 -74 L-186 46" stroke={INK} strokeWidth="5" opacity="0.4" />
        </g>

        {/* The pour, and the pile it lands in. */}
        <path
          d="M690 460 q40 140 110 250 L560 710 q60 -132 74 -252 Z"
          fill={POP}
          opacity="0.35"
        />
        <path d="M300 800 q300 -150 600 0 Z" fill={POP} opacity="0.55" />
        <path
          d="M300 800 q300 -150 600 0 Z"
          fill={tone(id)}
          color={INK}
          opacity="0.3"
        />
        <path d="M300 800 q300 -150 600 0" fill="none" stroke={INK} strokeWidth="7" />

        {/* Individual grains, only near the eye. */}
        {[
          [700, 520],
          [734, 576],
          [682, 604],
          [742, 650],
          [700, 690],
          [760, 716],
          [660, 668],
          [786, 600],
          [648, 736],
          [806, 672],
          [612, 764],
          [838, 726],
        ].map(([x, y], i) => (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="13"
            ry="8"
            fill={POP}
            stroke={INK}
            strokeWidth="3"
            transform={`rotate(${(i * 47) % 180} ${x} ${y})`}
          />
        ))}
      </>
    ),
  },
});

export {};
