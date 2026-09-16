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
 * A small-town bottle shop.
 *
 * Every bottle here is drawn from its silhouette outward, because that is how
 * anybody recognizes one: a bordeaux shoulder, a burgundy slope, the squat
 * bourbon, the long neck of a beer. Get the outlines right and a row of them
 * reads instantly without a single label on it, which is just as well, since
 * putting a real brand's label on a page for a real store would be somebody
 * else's trademark on somebody else's website.
 *
 * So the labels are blank bands of color. It looks deliberate, which it is.
 */

type BottleShape = 'bordeaux' | 'burgundy' | 'spirit' | 'flask' | 'longneck';

/**
 * One bottle, on its base line.
 *
 * `h` is overall height and the shapes scale from it, so a shelf can be a list
 * of five numbers rather than five hand-placed drawings.
 */
function Bottle({
  x,
  y,
  h,
  shape,
  fill,
  label,
}: {
  x: number;
  y: number;
  h: number;
  shape: BottleShape;
  fill: string;
  label: string;
}) {
  const w = h * (shape === 'spirit' ? 0.34 : shape === 'flask' ? 0.38 : 0.27);
  const half = w / 2;
  const neck = w * (shape === 'longneck' ? 0.2 : 0.26);

  const body =
    shape === 'burgundy'
      ? `M${-half} 0 V${-h * 0.42} Q${-half} ${-h * 0.66} ${-neck} ${-h * 0.76}
         V${-h} h${neck * 2} V${-h * 0.76} Q${half} ${-h * 0.66} ${half} ${-h * 0.42} V0 Z`
      : shape === 'spirit'
        ? `M${-half} 0 V${-h * 0.56} L${-neck} ${-h * 0.72} V${-h} h${neck * 2}
           V${-h * 0.72} L${half} ${-h * 0.56} V0 Z`
        : shape === 'flask'
          ? `M${-half} 0 V${-h * 0.62} Q${-half} ${-h * 0.78} ${-neck} ${-h * 0.82}
             V${-h} h${neck * 2} V${-h * 0.82} Q${half} ${-h * 0.78} ${half} ${-h * 0.62} V0 Z`
          : shape === 'longneck'
            ? `M${-half} 0 V${-h * 0.5} Q${-half} ${-h * 0.62} ${-neck} ${-h * 0.7}
               V${-h} h${neck * 2} V${-h * 0.7} Q${half} ${-h * 0.62} ${half} ${-h * 0.5} V0 Z`
            : `M${-half} 0 V${-h * 0.58} L${-neck} ${-h * 0.74} V${-h} h${neck * 2}
               V${-h * 0.74} L${half} ${-h * 0.58} V0 Z`;

  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={body} fill={fill} />
      <path d={body} fill="none" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
      {/* Capsule over the cork. */}
      <rect x={-neck - 2} y={-h} width={neck * 2 + 4} height={h * 0.07} fill={INK} />
      {/* Label. Blank on purpose: a real brand mark on a real store's page is
          somebody else's trademark on somebody else's website. */}
      <rect
        x={-half * 0.82}
        y={-h * 0.44}
        width={half * 1.64}
        height={h * 0.24}
        rx="4"
        fill={label}
      />
      <rect
        x={-half * 0.82}
        y={-h * 0.44}
        width={half * 1.64}
        height={h * 0.24}
        rx="4"
        fill="none"
        stroke={INK}
        strokeWidth="4"
      />
      {/* One highlight down the left of the glass. */}
      <path
        d={`M${-half * 0.66} ${-h * 0.54} V${-h * 0.08}`}
        stroke={PAPER}
        strokeWidth={w * 0.1}
        opacity="0.35"
        strokeLinecap="round"
      />
    </g>
  );
}

registerScenes({
  /* --- Hero. The shelf, with the left of the frame kept clear. ---------- */
  'bottle-shelf': {
    alt: 'three shelves of bottles in a small store, lit from above',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        <rect x="560" y="80" width="660" height="760" fill={MID} opacity="0.12" />
        <rect x="560" y="80" width="660" height="760" fill={hatch(id)} color={MID} opacity="0.1" />

        {/* Shelf lighting, as flat wedges rather than glows. */}
        <path d="M580 120 L1200 120 L1200 200 L580 240 Z" fill={POP} opacity="0.14" />

        {[
          {
            y: 366,
            items: [
              { x: 640, h: 168, s: 'bordeaux' },
              { x: 706, h: 176, s: 'burgundy' },
              { x: 772, h: 160, s: 'bordeaux' },
              { x: 840, h: 182, s: 'burgundy' },
              { x: 908, h: 164, s: 'bordeaux' },
              { x: 974, h: 174, s: 'burgundy' },
              { x: 1042, h: 160, s: 'bordeaux' },
              { x: 1110, h: 178, s: 'burgundy' },
            ],
          },
          {
            y: 592,
            items: [
              { x: 648, h: 186, s: 'spirit' },
              { x: 736, h: 200, s: 'flask' },
              { x: 830, h: 178, s: 'spirit' },
              { x: 920, h: 196, s: 'flask' },
              { x: 1014, h: 182, s: 'spirit' },
              { x: 1108, h: 198, s: 'flask' },
            ],
          },
          {
            y: 806,
            items: [
              { x: 636, h: 150, s: 'longneck' },
              { x: 700, h: 150, s: 'longneck' },
              { x: 764, h: 150, s: 'longneck' },
              { x: 828, h: 150, s: 'longneck' },
              { x: 892, h: 150, s: 'longneck' },
              { x: 956, h: 150, s: 'longneck' },
              { x: 1020, h: 150, s: 'longneck' },
              { x: 1084, h: 150, s: 'longneck' },
              { x: 1148, h: 150, s: 'longneck' },
            ],
          },
        ].map((shelf, si) => (
          <g key={shelf.y}>
            {shelf.items.map((b, i) => (
              <Bottle
                key={b.x}
                x={b.x}
                y={shelf.y}
                h={b.h}
                shape={b.s as BottleShape}
                fill={i % 3 === 0 ? MID : i % 3 === 1 ? INK : WASH}
                label={i % 2 ? POP : PAPER}
              />
            ))}
            <rect x="560" y={shelf.y} width="660" height="18" fill={INK} />
            <rect x="560" y={shelf.y + 18} width="660" height="10" fill={INK} opacity="0.45" />
            {si === 0 && (
              <path d="M580 348 L1200 348" stroke={POP} strokeWidth="5" opacity="0.5" />
            )}
          </g>
        ))}
      </>
    ),
  },

  /* --- A row, front on. -------------------------------------------------- */
  'bottle-row': {
    alt: 'a row of bottles of different shapes, from a long neck beer to a squat bourbon',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        <circle cx="600" cy="420" r="350" fill={toneFine(id)} color={MID} opacity="0.32" />
        {[
          { x: 250, h: 330, s: 'longneck', f: MID },
          { x: 410, h: 430, s: 'bordeaux', f: INK },
          { x: 580, h: 400, s: 'burgundy', f: WASH },
          { x: 760, h: 370, s: 'spirit', f: MID },
          { x: 950, h: 310, s: 'flask', f: INK },
        ].map((b, i) => (
          <Bottle
            key={b.x}
            x={b.x}
            y={720}
            h={b.h}
            shape={b.s as BottleShape}
            fill={b.f}
            label={i % 2 ? POP : PAPER}
          />
        ))}
        <rect y="720" width="1200" height="20" fill={INK} />
        <ellipse cx="600" cy="790" rx="450" ry="30" fill={INK} opacity="0.14" />
      </>
    ),
  },

  /* --- The cooler, which is where half a bottle shop's takings are. ----- */
  'bottle-cooler': {
    alt: 'glass cooler doors with cans and six packs stacked behind them',
    draw: () => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        {[0, 1, 2].map((d) => {
          const x = 80 + d * 360;
          return (
            <g key={d}>
              <rect x={x} y="80" width="330" height="760" rx="12" fill={WASH} opacity="0.4" />
              {/* Cans, in courses. */}
              {[0, 1, 2, 3].map((row) =>
                [0, 1, 2, 3, 4].map((c) => (
                  <g key={`${row}-${c}`}>
                    <rect
                      x={x + 26 + c * 58}
                      y={168 + row * 166}
                      width="46"
                      height="112"
                      rx="10"
                      fill={(row + c + d) % 3 === 0 ? POP : (row + c) % 2 ? MID : INK}
                    />
                    <rect
                      x={x + 26 + c * 58}
                      y={168 + row * 166}
                      width="46"
                      height="112"
                      rx="10"
                      fill="none"
                      stroke={INK}
                      strokeWidth="4"
                    />
                    <path
                      d={`M${x + 32 + c * 58} ${196 + row * 166} h34`}
                      stroke={PAPER}
                      strokeWidth="6"
                      opacity="0.45"
                    />
                  </g>
                ))
              )}
              {/* Shelf rails. */}
              {[0, 1, 2, 3].map((row) => (
                <rect
                  key={row}
                  x={x + 14}
                  y={280 + row * 166}
                  width="302"
                  height="12"
                  fill={INK}
                  opacity="0.75"
                />
              ))}
              {/* Door, frame, handle, and the reflection that makes it glass. */}
              <rect x={x} y="80" width="330" height="760" rx="12" fill="none" stroke={INK} strokeWidth="11" />
              <path d={`M${x + 40} 800 L${x + 290} 180`} stroke={PAPER} strokeWidth="34" opacity="0.28" />
              <path d={`M${x + 110} 820 L${x + 320} 300`} stroke={PAPER} strokeWidth="16" opacity="0.2" />
              <rect x={x + 296} y="360" width="18" height="200" rx="9" fill={INK} />
            </g>
          );
        })}
      </>
    ),
  },

  /* --- Wine, racked. ---------------------------------------------------- */
  'bottle-wine': {
    alt: 'wine bottles lying on their sides in a timber rack',
    draw: () => (
      <>
        <rect width="1200" height="900" fill={PAPER} />

        {/*
         * Bottles lying down, side on.
         *
         * The first version drew the rack end on, as diamonds with a bottle
         * base in each, which is what a wine rack actually looks like and is
         * also completely unreadable: it came out as a grid of olives. Seen
         * from the side the silhouette does the work, and a row of shoulders
         * and necks says wine before anybody has looked properly.
         */}
        {[0, 1, 2, 3].map((row) => {
          const y = 190 + row * 178;
          return (
            <g key={row}>
              {/* Shelf the bottles rest on. */}
              <rect x="60" y={y + 78} width="1080" height="20" fill={INK} />
              <rect x="60" y={y + 98} width="1080" height="10" fill={INK} opacity="0.4" />

              {[0, 1, 2, 3].map((col) => {
                const x = 150 + col * 262;
                const fill = (row + col) % 3 === 0 ? INK : (row + col) % 3 === 1 ? MID : WASH;
                return (
                  <g key={col} transform={`translate(${x} ${y + 40})`}>
                    {/* Body, shoulder, neck, all one silhouette. */}
                    <path
                      d="M-120 -38 H36 q34 0 46 16 q10 14 40 16 h44 v12 h-44 q-30 2 -40 16
                         q-12 16 -46 16 H-120 a12 12 0 0 1 -12 -12 v-52 a12 12 0 0 1 12 -12 Z"
                      fill={fill}
                    />
                    <path
                      d="M-120 -38 H36 q34 0 46 16 q10 14 40 16 h44 v12 h-44 q-30 2 -40 16
                         q-12 16 -46 16 H-120 a12 12 0 0 1 -12 -12 v-52 a12 12 0 0 1 12 -12 Z"
                      fill="none"
                      stroke={INK}
                      strokeWidth="6"
                      strokeLinejoin="round"
                    />
                    {/* Capsule over the cork. */}
                    <rect x="130" y="-14" width="34" height="28" rx="6" fill={INK} />
                    {/* Blank label. No real brand goes on a real store's page. */}
                    <rect x="-98" y="-26" width="96" height="52" rx="5" fill={POP} opacity="0.85" />
                    <rect
                      x="-98"
                      y="-26"
                      width="96"
                      height="52"
                      rx="5"
                      fill="none"
                      stroke={INK}
                      strokeWidth="4"
                    />
                    {/* One highlight along the top of the glass. */}
                    <path
                      d="M-116 -24 H24"
                      stroke={PAPER}
                      strokeWidth="9"
                      opacity="0.35"
                      strokeLinecap="round"
                    />
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Rack uprights, in front, which is what turns four rows of bottles
            into a piece of furniture. */}
        <g fill={INK} opacity="0.9">
          <rect x="60" y="120" width="26" height="780" />
          <rect x="1114" y="120" width="26" height="780" />
        </g>
      </>
    ),
  },

  /* --- Where the whiskey comes from. ------------------------------------ */
  'bottle-barrel': {
    alt: 'an oak barrel on its side with heads of barley beside it',
    draw: () => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        <circle cx="560" cy="430" r="320" fill={POP} opacity="0.14" />

        {/* Barrel, on its side, bellied. */}
        <path
          d="M320 300 q280 -70 560 0 q60 150 0 300 q-280 70 -560 0 q-60 -150 0 -300 Z"
          fill={MID}
        />
        <path
          d="M320 300 q280 -70 560 0 q60 150 0 300 q-280 70 -560 0 q-60 -150 0 -300 Z"
          fill="none"
          stroke={INK}
          strokeWidth="10"
          strokeLinejoin="round"
        />
        {/* Staves. */}
        <g stroke={INK} strokeWidth="5" opacity="0.35">
          <path d="M432 276 q-24 160 0 336 M544 262 q-14 168 0 356 M656 258 q-4 172 0 364 M768 266 q10 166 0 350" />
        </g>
        {/* Hoops. */}
        <g stroke={INK} strokeWidth="16" fill="none">
          <path d="M374 286 q-38 156 0 322" opacity="0.9" />
          <path d="M826 286 q38 156 0 322" opacity="0.9" />
        </g>
        {/* Head, and the bung. */}
        <ellipse cx="880" cy="450" rx="52" ry="152" fill={WASH} />
        <ellipse cx="880" cy="450" rx="52" ry="152" fill="none" stroke={INK} strokeWidth="9" />
        <circle cx="600" cy="288" r="34" fill={INK} />
        <circle cx="600" cy="288" r="16" fill={POP} />

        {/* Barley. */}
        {[
          { x: 200, y: 760, h: 300 },
          { x: 148, y: 780, h: 248 },
          { x: 254, y: 786, h: 210 },
        ].map((st, i) => (
          <g key={i} stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round">
            <path d={`M${st.x} ${st.y} V${st.y - st.h}`} />
            {Array.from({ length: 6 }, (_, k) => {
              const yy = st.y - st.h * 0.3 - k * (st.h * 0.11);
              return (
                <path
                  key={k}
                  d={`M${st.x} ${yy} q-22 -14 -22 -34 q22 4 22 34 M${st.x} ${yy} q22 -14 22 -34 q-22 4 -22 34`}
                />
              );
            })}
          </g>
        ))}
        <rect y="810" width="1200" height="90" fill={INK} opacity="0.14" />
      </>
    ),
  },

  /* --- Glassware, for the about block. ---------------------------------- */
  'bottle-glasses': {
    alt: 'a wine glass, a rocks glass and a beer glass standing together',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        <rect y="700" width="1200" height="200" fill={MID} opacity="0.18" />
        <path d="M0 700 H1200" stroke={INK} strokeWidth="7" opacity="0.35" />
        <circle cx="600" cy="380" r="300" fill={tone(id)} color={MID} opacity="0.22" />

        {/* Wine glass. */}
        <g transform="translate(320 700)">
          <path d="M-110 -390 h220 q0 170 -90 200 v130 h70 v20 h-180 v-20 h70 V-190 q-90 -30 -90 -200 Z" fill={WASH} />
          <path d="M-110 -390 h220 q0 170 -90 200 v130 h70 v20 h-180 v-20 h70 V-190 q-90 -30 -90 -200 Z" fill="none" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
          <path d="M-98 -300 q98 60 196 0 q-16 100 -98 118 q-82 -18 -98 -118 Z" fill={POP} opacity="0.75" />
        </g>

        {/* Rocks glass, with ice. */}
        <g transform="translate(620 700)">
          <path d="M-96 -250 h192 l-16 250 h-160 Z" fill={WASH} />
          <path d="M-96 -250 h192 l-16 250 h-160 Z" fill="none" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
          <path d="M-82 -130 h164 l-10 130 h-144 Z" fill={POP} opacity="0.6" />
          <g fill={PAPER} stroke={INK} strokeWidth="6" opacity="0.9">
            <rect x="-62" y="-160" width="70" height="70" rx="8" transform="rotate(-14 -27 -125)" />
            <rect x="6" y="-126" width="62" height="62" rx="8" transform="rotate(18 37 -95)" />
          </g>
        </g>

        {/* Beer glass. */}
        <g transform="translate(900 700)">
          <path d="M-88 -390 h176 l-18 390 h-140 Z" fill={WASH} />
          <path d="M-88 -390 h176 l-18 390 h-140 Z" fill="none" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
          <path d="M-74 -280 h148 l-16 280 h-116 Z" fill={POP} opacity="0.7" />
          <path d="M-84 -366 q40 -34 84 0 q44 -34 84 0 l-4 86 h-160 Z" fill={PAPER} />
          <path d="M-84 -366 q40 -34 84 0 q44 -34 84 0" fill="none" stroke={INK} strokeWidth="8" />
        </g>
      </>
    ),
  },
});

export {};
