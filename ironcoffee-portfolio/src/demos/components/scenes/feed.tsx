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
        <path d="M600 40 L600 150" stroke={INK} strokeWidth="8" />
        <path d="M470 258 q130 -130 260 0 Z" fill={INK} />
        <path
          d="M470 258 q130 -130 260 0 Z"
          fill="none"
          stroke={INK}
          strokeWidth="6"
        />
        <circle cx="600" cy="262" r="34" fill={POP} />
        <path d="M566 286 L300 900 L900 900 Z" fill={POP} opacity="0.16" />

        {/* Galvanized brooder ring. */}
        <ellipse cx="600" cy="690" rx="450" ry="150" fill={WASH} />
        <ellipse
          cx="600"
          cy="690"
          rx="450"
          ry="150"
          fill="none"
          stroke={INK}
          strokeWidth="7"
        />
        <path
          d="M150 690 a450 150 0 0 0 900 0 l0 62 a450 150 0 0 1 -900 0 Z"
          fill={MID}
        />
        <path
          d="M150 690 a450 150 0 0 0 900 0 l0 62 a450 150 0 0 1 -900 0 Z"
          fill="none"
          stroke={INK}
          strokeWidth="7"
        />
        {/* Shavings. */}
        <ellipse
          cx="600"
          cy="700"
          rx="404"
          ry="124"
          fill={tone(id)}
          color={POP}
          opacity="0.4"
        />

        {/* Chicks. Two ovals and a beak is genuinely all a chick is at this
          size, and adding legs made them read as ducks. */}
        {[
          { x: 396, y: 636, s: 1, f: 1 },
          { x: 530, y: 700, s: 1.18, f: 1 },
          { x: 690, y: 660, s: 1.04, f: -1 },
          { x: 826, y: 706, s: 0.92, f: -1 },
          { x: 600, y: 600, s: 0.82, f: 1 },
          { x: 470, y: 570, s: 0.7, f: -1 },
          { x: 762, y: 578, s: 0.74, f: 1 },
        ].map((c, i) => (
          <g
            key={i}
            transform={`translate(${c.x} ${c.y}) scale(${c.s * c.f} ${c.s})`}
          >
            <ellipse cx="0" cy="0" rx="52" ry="42" fill={POP} />
            <ellipse
              cx="0"
              cy="0"
              rx="52"
              ry="42"
              fill="none"
              stroke={INK}
              strokeWidth="5"
            />
            <circle cx="38" cy="-34" r="27" fill={POP} />
            <circle
              cx="38"
              cy="-34"
              r="27"
              fill="none"
              stroke={INK}
              strokeWidth="5"
            />
            <circle cx="46" cy="-40" r="4.6" fill={INK} />
            <path d="M62 -32 L78 -26 L62 -20 Z" fill={INK} />
            <path
              d="M-14 -4 q26 16 0 32"
              fill="none"
              stroke={INK}
              strokeWidth="4"
              opacity="0.65"
            />
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
        <g stroke={INK} strokeWidth="4" opacity="0.28">
          <path d="M60 0 L60 900 M220 0 L220 900 M380 0 L380 900 M540 0 L540 900 M700 0 L700 900 M860 0 L860 900 M1020 0 L1020 900 M1180 0 L1180 900" />
        </g>

        {/* Square bales, stacked with the courses crossed the way they are
          stacked so the stack does not fall over. */}
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
              rx="12"
              fill={POP}
              opacity="0.5"
            />
            <rect
              x={b.x}
              y={b.y}
              width="308"
              height="204"
              rx="12"
              fill={tone(id)}
              color={MID}
              opacity="0.5"
            />
            <rect
              x={b.x}
              y={b.y}
              width="308"
              height="204"
              rx="12"
              fill="none"
              stroke={INK}
              strokeWidth="6"
            />
            {/* Baling twine. */}
            <path
              d={`M${b.x + 76} ${b.y} L${b.x + 76} ${b.y + 204} M${b.x + 232} ${b.y} L${b.x + 232} ${b.y + 204}`}
              stroke={INK}
              strokeWidth="5"
              opacity="0.8"
            />
            {/* Cut ends of the stems. */}
            <g stroke={INK} strokeWidth="3" opacity="0.35">
              <path
                d={`M${b.x + 20} ${b.y + 40} h268 M${b.x + 20} ${b.y + 96} h268 M${b.x + 20} ${b.y + 152} h268`}
              />
            </g>
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
        <rect y="620" width="1200" height="280" fill={MID} opacity="0.14" />

        {/* Cage. */}
        <rect
          x="150"
          y="250"
          width="900"
          height="470"
          fill="none"
          stroke={INK}
          strokeWidth="9"
        />
        <g stroke={INK} strokeWidth="4" opacity="0.4">
          <path d="M150 370 h900 M150 490 h900 M150 610 h900 M330 250 v470 M510 250 v470 M690 250 v470 M870 250 v470" />
        </g>

        {/* Cylinders. */}
        {[240, 460, 680, 900].map((x, i) => (
          <g key={x}>
            <rect
              x={x - 62}
              y="400"
              width="124"
              height="250"
              rx="22"
              fill={i % 2 ? MID : POP}
            />
            <rect
              x={x - 62}
              y="400"
              width="124"
              height="250"
              rx="22"
              fill="none"
              stroke={INK}
              strokeWidth="6"
            />
            <rect
              x={x - 62}
              y="470"
              width="124"
              height="46"
              fill={tone(id)}
              color={INK}
              opacity="0.4"
            />
            {/* Collar and valve. */}
            <path
              d={`M${x - 42} 400 q0 -46 42 -46 q42 0 42 46`}
              fill="none"
              stroke={INK}
              strokeWidth="8"
            />
            <rect x={x - 14} y="362" width="28" height="26" rx="6" fill={INK} />
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
