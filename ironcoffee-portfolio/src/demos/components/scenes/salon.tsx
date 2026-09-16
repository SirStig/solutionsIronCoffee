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
 * A country salon.
 *
 * Deliberately the opposite of the barbershop set next door. Same trade, same
 * tools, and the two must never look like one set with the colors changed, so
 * everything here is rounder, lighter and stood in daylight: a bulb-lit
 * mirror rather than tile, a potted plant, a window. The barber set is chrome
 * and black leather.
 *
 * The pines are in here because the business calls itself country and is in a
 * town of a few hundred people on the edge of the plains. A salon that could
 * be in any strip mall in America is the thing a small town salon is not.
 */

registerScenes({
  /* --- Hero. The station, with the left of the frame kept clear. -------- */
  'salon-station': {
    alt: 'a styling chair at a bulb-lit mirror, with a plant and a window beside it',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />

        {/* Window, and the light it puts on the wall. */}
        <rect x="120" y="150" width="250" height="330" rx="10" fill={WASH} opacity="0.55" />
        <path d="M120 150 h250 v330 h-250 Z M245 150 v330 M120 315 h250" fill="none" stroke={INK} strokeWidth="7" />

        {/* Mirror with bulbs. The bulbs are the whole reason a salon mirror
            reads as a salon mirror and not as a picture frame. */}
        <rect x="690" y="180" width="360" height="400" rx="180" fill={WASH} />
        <rect x="690" y="180" width="360" height="400" rx="180" fill="none" stroke={INK} strokeWidth="10" />
        <path d="M730 430 L1000 226" stroke={PAPER} strokeWidth="24" opacity="0.4" />
        {Array.from({ length: 14 }, (_, i) => {
          const a = (i / 14) * Math.PI * 2 - Math.PI / 2;
          return (
            <circle
              key={i}
              cx={870 + Math.cos(a) * 216}
              cy={380 + Math.sin(a) * 236}
              r="17"
              fill={POP}
              stroke={INK}
              strokeWidth="5"
            />
          );
        })}

        {/* Counter, bottles, and a plant, because every salon has one. */}
        <rect x="620" y="616" width="500" height="24" rx="6" fill={INK} />
        {[700, 748, 796].map((bx, i) => (
          <g key={bx}>
            <rect x={bx} y={552 + i * 14} width="32" height={64 - i * 14} rx="8" fill={i === 1 ? POP : MID} />
            <rect x={bx + 10} y={538 + i * 14} width="12" height="16" fill={INK} />
          </g>
        ))}
        <g transform="translate(1030 560)">
          <path d="M-36 56 h72 l-10 60 h-52 Z" fill={POP} />
          <path d="M-36 56 h72 l-10 60 h-52 Z" fill="none" stroke={INK} strokeWidth="6" />
          <g fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round">
            <path d="M0 56 V-16 M0 6 q-40 -12 -46 -52 M0 -10 q40 -14 46 -54 M0 22 q-36 -6 -40 -40" />
          </g>
        </g>

        {/* Styling chair, side on and facing the mirror.
            Drawn from behind it was a rectangle with a lump on top; from the
            side the silhouette does the work and no detail is needed. */}
        <g transform="translate(404 560)">
          <ellipse cx="0" cy="250" rx="130" ry="24" fill={INK} />
          <rect x="-28" y="156" width="56" height="96" rx="8" fill={MID} />
          <rect x="-28" y="156" width="56" height="96" rx="8" fill="none" stroke={INK} strokeWidth="6" />

          {/* Seat, with a rounded front edge rather than a squared one. */}
          <path
            d="M-150 88 H104 a30 30 0 0 1 30 30 v18 a30 30 0 0 1 -30 30 H-150
               a34 34 0 0 1 0 -78 Z"
            fill={MID}
          />
          <path
            d="M-150 88 H104 a30 30 0 0 1 30 30 v18 a30 30 0 0 1 -30 30 H-150
               a34 34 0 0 1 0 -78 Z"
            fill="none"
            stroke={INK}
            strokeWidth="7"
          />

          {/* Back, curved and reclined, with a roll at the top. */}
          <path
            d="M70 92 q28 -110 24 -172 a44 44 0 0 1 88 6 q6 84 -28 166 Z"
            fill={MID}
          />
          <path
            d="M70 92 q28 -110 24 -172 a44 44 0 0 1 88 6 q6 84 -28 166 Z"
            fill="none"
            stroke={INK}
            strokeWidth="7"
            strokeLinejoin="round"
          />
          <path d="M92 -10 q46 10 74 4 M100 -62 q42 10 70 4" stroke={INK} strokeWidth="5" opacity="0.35" fill="none" />

          {/* Armrest and footrest. */}
          <path d="M-128 40 H74" stroke={INK} strokeWidth="15" strokeLinecap="round" />
          <path d="M-116 48 V92" stroke={INK} strokeWidth="9" />
          <path d="M-150 166 L-214 200 h84" fill="none" stroke={INK} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        <rect y="790" width="1200" height="110" fill={MID} opacity="0.2" />
        <rect y="790" width="1200" height="110" fill={hatch(id)} color={MID} opacity="0.12" />
      </>
    ),
  },

  /* --- Backwash. -------------------------------------------------------- */
  'salon-basin': {
    alt: 'a ceramic shampoo basin with its spray head resting in the bowl',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        <rect x="0" y="0" width="1200" height="470" fill={MID} opacity="0.16" />
        <g stroke={INK} strokeWidth="3" opacity="0.14">
          <path d="M0 160 H1200 M0 310 H1200 M400 0 V470 M800 0 V470" />
        </g>

        {/* Basin. A neck cut-out on the near rim is the only thing that makes
            this a shampoo bowl rather than a kitchen sink. */}
        <path
          d="M250 430 H950 a40 40 0 0 1 40 40 v56 a300 200 0 0 1 -380 190
             a300 200 0 0 1 -380 -190 v-56 a40 40 0 0 1 40 -40 Z"
          fill={WASH}
        />
        <path
          d="M250 430 H950 a40 40 0 0 1 40 40 v56 a300 200 0 0 1 -380 190
             a300 200 0 0 1 -380 -190 v-56 a40 40 0 0 1 40 -40 Z"
          fill="none"
          stroke={INK}
          strokeWidth="10"
          strokeLinejoin="round"
        />
        <path d="M480 430 a120 54 0 0 1 240 0" fill={PAPER} stroke={INK} strokeWidth="10" />
        <ellipse cx="600" cy="596" rx="230" ry="96" fill={MID} opacity="0.28" />
        <ellipse cx="600" cy="596" rx="230" ry="96" fill={toneFine(id)} color={MID} opacity="0.3" />
        <circle cx="600" cy="612" r="26" fill="none" stroke={INK} strokeWidth="7" />

        {/* Mixer and spray on its hose. */}
        <path d="M600 430 V352 q0 -40 -46 -40 h-70" fill="none" stroke={INK} strokeWidth="13" strokeLinecap="round" />
        <circle cx="470" cy="312" r="24" fill={POP} stroke={INK} strokeWidth="7" />
        <path
          d="M760 430 q120 -60 96 -150 q-16 -60 -92 -48"
          fill="none"
          stroke={INK}
          strokeWidth="11"
          strokeLinecap="round"
        />
        <g transform="translate(748 236) rotate(-24)">
          <rect x="-70" y="-22" width="140" height="44" rx="20" fill={MID} stroke={INK} strokeWidth="7" />
          <rect x="60" y="-30" width="34" height="60" rx="10" fill={POP} stroke={INK} strokeWidth="6" />
        </g>
      </>
    ),
  },

  /* --- Color. ----------------------------------------------------------- */
  'salon-color': {
    alt: 'a tint bowl and brush with foils folded beside it',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        <rect x="100" y="180" width="1000" height="560" rx="20" fill={MID} opacity="0.2" />
        <rect x="100" y="180" width="1000" height="560" rx="20" fill={tone(id)} color={MID} opacity="0.16" />

        {/* Foils, fanned. */}
        {[-22, -8, 6, 20].map((rot, i) => (
          <g key={rot} transform={`translate(${330 + i * 74} ${430}) rotate(${rot})`}>
            <rect x="-104" y="-150" width="208" height="300" rx="10" fill={WASH} />
            <rect x="-104" y="-150" width="208" height="300" rx="10" fill="none" stroke={INK} strokeWidth="6" />
            <path d="M-104 -60 H104 M-104 40 H104" stroke={INK} strokeWidth="4" opacity="0.4" />
          </g>
        ))}

        {/* Bowl, tipped toward the eye so the color in it reads. */}
        <g transform="translate(840 540)">
          <ellipse cx="0" cy="-54" rx="180" ry="70" fill={POP} />
          <path d="M-180 -54 a180 70 0 0 0 360 0 l-26 116 a154 60 0 0 1 -308 0 Z" fill={MID} />
          <path d="M-180 -54 a180 70 0 0 0 360 0 l-26 116 a154 60 0 0 1 -308 0 Z" fill="none" stroke={INK} strokeWidth="8" />
          <ellipse cx="0" cy="-54" rx="180" ry="70" fill="none" stroke={INK} strokeWidth="8" />
          <ellipse cx="0" cy="-48" rx="132" ry="48" fill={POP} />
          <ellipse cx="0" cy="-48" rx="132" ry="48" fill={tone(id)} color={INK} opacity="0.2" />
        </g>

        {/* Tint brush, resting across the rim. */}
        <g transform="translate(880 400) rotate(-38)">
          <rect x="-16" y="-230" width="32" height="300" rx="14" fill={INK} />
          <path d="M-40 70 H40 L30 160 H-30 Z" fill={MID} stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M-24 104 H24 M-20 132 H20" stroke={INK} strokeWidth="5" opacity="0.5" />
        </g>
      </>
    ),
  },

  /* --- Shears and comb, as a still life rather than a tool photo. ------- */
  'salon-shears': {
    alt: 'a pair of shears crossed over a cutting comb and a spray bottle',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        <circle cx="600" cy="440" r="330" fill={toneFine(id)} color={MID} opacity="0.32" />

        {/* Spray bottle behind. */}
        <g transform="translate(910 520)">
          <path d="M-70 220 V20 q0 -34 24 -54 V-40 h92 v6 q24 20 24 54 v200 Z" fill={MID} />
          <path d="M-70 220 V20 q0 -34 24 -54 V-40 h92 v6 q24 20 24 54 v200 Z" fill="none" stroke={INK} strokeWidth="8" />
          <rect x="-46" y="60" width="92" height="96" rx="8" fill={PAPER} opacity="0.7" />
          <path d="M-22 -40 V-96 h44 v56" fill={INK} />
          <path d="M22 -80 h54 l-18 34" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" />
        </g>

        {/* Comb, laid on the diagonal. */}
        <g transform="translate(560 640) rotate(-16)">
          <rect x="-300" y="-22" width="600" height="28" rx="8" fill={INK} />
          {Array.from({ length: 30 }, (_, i) => (
            <path
              key={i}
              d={`M${-286 + i * 19} 6 v${i < 15 ? 50 : 34}`}
              stroke={INK}
              strokeWidth="6"
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* Shears, open, on top. */}
        <g transform="translate(560 360) rotate(-26)">
          <circle cx="-150" cy="-52" r="42" fill="none" stroke={INK} strokeWidth="16" />
          <circle cx="-150" cy="52" r="42" fill="none" stroke={INK} strokeWidth="16" />
          <path d="M-114 -34 L250 62" stroke={WASH} strokeWidth="26" strokeLinecap="round" />
          <path d="M-114 34 L250 -62" stroke={WASH} strokeWidth="26" strokeLinecap="round" />
          <path d="M-114 -34 L250 62" stroke={INK} strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M-114 34 L250 -62" stroke={INK} strokeWidth="7" fill="none" strokeLinecap="round" />
          <circle cx="-40" cy="0" r="17" fill={POP} stroke={INK} strokeWidth="7" />
        </g>
      </>
    ),
  },

  /* --- The dryer, which is the one object nobody else's set will have. -- */
  'salon-dryer': {
    alt: 'a hooded dryer on its stand beside a waiting chair',
    draw: () => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        <rect y="700" width="1200" height="200" fill={MID} opacity="0.2" />
        <path d="M0 700 H1200" stroke={INK} strokeWidth="6" opacity="0.3" />

        {/* Stand. */}
        <ellipse cx="560" cy="710" rx="130" ry="26" fill={INK} />
        <rect x="540" y="400" width="40" height="308" fill={MID} stroke={INK} strokeWidth="7" />

        {/* Hood.
            The shape that makes this a dryer and not a lamp is the open mouth
            underneath: a dome, then an ellipse cut across its bottom so you are
            looking slightly up into it. Without that it reads as a mushroom. */}
        <path d="M356 366 a204 196 0 0 1 408 0 Z" fill={MID} />
        <ellipse cx="560" cy="366" rx="204" ry="62" fill={MID} />
        <ellipse cx="560" cy="366" rx="204" ry="62" fill="none" stroke={INK} strokeWidth="9" />
        <path d="M356 366 a204 196 0 0 1 408 0" fill="none" stroke={INK} strokeWidth="9" />
        {/* The inside, darker, seen through the mouth. */}
        <path d="M400 372 a160 44 0 0 0 320 0 a160 48 0 0 1 -320 0 Z" fill={INK} opacity="0.5" />
        <ellipse cx="560" cy="374" rx="160" ry="44" fill={INK} opacity="0.35" />
        {/* Vents and the control dial. */}
        <path d="M430 250 a150 130 0 0 1 260 0" fill="none" stroke={INK} strokeWidth="6" opacity="0.35" />
        <path d="M464 198 a118 104 0 0 1 192 0" fill="none" stroke={INK} strokeWidth="6" opacity="0.25" />
        <circle cx="560" cy="188" r="30" fill={POP} stroke={INK} strokeWidth="8" />

        {/* Chair under it, with a back, because a bar on two legs is a bench. */}
        <g transform="translate(560 540)">
          <path d="M128 76 q26 -96 20 -150 a34 34 0 0 0 -68 4 q-2 76 -14 146 Z" fill={MID} />
          <path d="M128 76 q26 -96 20 -150 a34 34 0 0 0 -68 4 q-2 76 -14 146 Z" fill="none" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <rect x="-140" y="76" width="288" height="48" rx="20" fill={MID} />
          <rect x="-140" y="76" width="288" height="48" rx="20" fill="none" stroke={INK} strokeWidth="7" />
          <path d="M-112 124 V160 M112 124 V160" stroke={INK} strokeWidth="12" strokeLinecap="round" />
        </g>

        {/* Magazine on a side table, because a dryer chair always has one. */}
        <g transform="translate(940 640)">
          <rect x="-110" y="-16" width="220" height="20" rx="6" fill={INK} />
          <path d="M-70 4 V70 M70 4 V70" stroke={INK} strokeWidth="10" strokeLinecap="round" />
          <g transform="rotate(-8)">
            <rect x="-78" y="-64" width="156" height="50" rx="6" fill={WASH} stroke={INK} strokeWidth="6" />
            <path d="M0 -64 V-14" stroke={INK} strokeWidth="5" opacity="0.5" />
          </g>
        </g>
      </>
    ),
  },

  /* --- The country half of the name. ------------------------------------ */
  'salon-pines': {
    alt: 'a stand of ponderosa pines on a ridge above open grassland',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        <circle cx="300" cy="230" r="128" fill={POP} opacity="0.2" />
        <circle cx="300" cy="230" r="96" fill={toneFine(id)} color={POP} opacity="0.7" />

        {/* Ridge. */}
        <path
          d="M0 616 q160 -70 330 -34 q200 42 360 -22 q190 -76 510 6 L1200 900 L0 900 Z"
          fill={MID}
          opacity="0.3"
        />
        <path d="M0 616 q160 -70 330 -34 q200 42 360 -22 q190 -76 510 6" fill="none" stroke={INK} strokeWidth="6" opacity="0.5" />

        {/* Pines.
            Ponderosa, which means a long bare trunk and an open crown of
            separate angular tufts rather than a solid triangle. Round clumps
            were the first attempt and came out as cotton balls on sticks;
            christmas trees were never an option, because that is what makes a
            Colorado illustration look like it was drawn in Vermont. */}
        {[
          { x: 196, h: 330, w: 1 },
          { x: 330, h: 424, w: 1.16 },
          { x: 456, h: 292, w: 0.86 },
          { x: 712, h: 376, w: 1.04 },
          { x: 842, h: 272, w: 0.8 },
          { x: 990, h: 444, w: 1.22 },
        ].map((t, i) => {
          const base = 608 - (i % 2) * 16;
          const top = base - t.h;
          // Four tufts down the crown, each a flattened arrowhead, alternating
          // which side of the trunk they lean off.
          const tufts = [0.05, 0.22, 0.4, 0.58].map((f, k) => ({
            y: top + t.h * f,
            r: (74 - k * 4) * t.w * (1 + f * 0.5),
            lean: k % 2 ? 1 : -1,
          }));
          return (
            <g key={i}>
              <path
                d={`M${t.x + 4} ${base} L${t.x - 6} ${top + t.h * 0.12}`}
                stroke={INK}
                strokeWidth={16 * t.w}
                strokeLinecap="round"
              />
              {tufts.map((tf, k) => (
                <path
                  key={k}
                  d={`M${t.x + tf.lean * 8} ${tf.y - tf.r * 0.5}
                      L${t.x + tf.lean * tf.r} ${tf.y + tf.r * 0.14}
                      L${t.x + tf.lean * tf.r * 0.5} ${tf.y + tf.r * 0.2}
                      L${t.x + tf.lean * tf.r * 0.86} ${tf.y + tf.r * 0.44}
                      L${t.x + tf.lean * 6} ${tf.y + tf.r * 0.34} Z`}
                  fill={MID}
                  stroke={INK}
                  strokeWidth="5"
                  strokeLinejoin="round"
                />
              ))}
              {tufts.map((tf, k) => (
                <path
                  key={`m${k}`}
                  d={`M${t.x - tf.lean * 6} ${tf.y - tf.r * 0.34}
                      L${t.x - tf.lean * tf.r * 0.72} ${tf.y + tf.r * 0.1}
                      L${t.x - tf.lean * tf.r * 0.34} ${tf.y + tf.r * 0.16}
                      L${t.x - tf.lean * tf.r * 0.6} ${tf.y + tf.r * 0.38}
                      L${t.x - tf.lean * 4} ${tf.y + tf.r * 0.3} Z`}
                  fill={MID}
                  stroke={INK}
                  strokeWidth="5"
                  strokeLinejoin="round"
                  opacity="0.88"
                />
              ))}
            </g>
          );
        })}

        {/* Grass. */}
        <g stroke={MID} strokeWidth="7" strokeLinecap="round" opacity="0.8">
          <path d="M80 900 L94 796 M150 900 L140 820 M560 900 L574 800 M630 900 L620 824 M1040 900 L1054 794 M1110 900 L1100 818" />
        </g>
      </>
    ),
  },
});

export {};
