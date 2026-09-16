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
 * A barbershop.
 *
 * Drawn hard: heavy outline, flat inks, nothing soft. A barbershop and a salon
 * are the same trade and want opposite pictures, and the difference is almost
 * entirely weight. This set is chrome, black leather and a straight razor. The
 * salon set next door is warm wood and daylight, and if the two ever start
 * looking like each other, one of them has been drawn carelessly.
 */

/** The chair, facing left, standing on its own pedestal. */
function Chair({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* Pedestal. */}
      <ellipse cx="0" cy="306" rx="156" ry="30" fill={INK} />
      <rect x="-48" y="198" width="96" height="112" rx="10" fill={MID} />
      <rect
        x="-48"
        y="198"
        width="96"
        height="112"
        rx="10"
        fill="none"
        stroke={INK}
        strokeWidth="7"
      />
      <rect x="-26" y="148" width="52" height="58" fill={INK} />

      {/* Footrest, which is the part everyone draws and nobody looks at. */}
      <path
        d="M-176 152 L-262 196"
        stroke={INK}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <rect x="-304" y="188" width="96" height="22" rx="10" fill={INK} />

      {/* Seat. */}
      <path
        d="M-168 94 H150 a24 24 0 0 1 24 24 v30 a24 24 0 0 1 -24 24 H-168
           a24 24 0 0 1 -24 -24 v-30 a24 24 0 0 1 24 -24 Z"
        fill={MID}
      />
      <path
        d="M-168 94 H150 a24 24 0 0 1 24 24 v30 a24 24 0 0 1 -24 24 H-168
           a24 24 0 0 1 -24 -24 v-30 a24 24 0 0 1 24 -24 Z"
        fill="none"
        stroke={INK}
        strokeWidth="8"
      />
      <path d="M-150 118 H140" stroke={INK} strokeWidth="5" opacity="0.4" />

      {/* Back and headrest, reclined a few degrees. */}
      <g transform="rotate(-7 112 94)">
        <rect x="96" y="-196" width="102" height="298" rx="28" fill={MID} />
        <rect
          x="96"
          y="-196"
          width="102"
          height="298"
          rx="28"
          fill="none"
          stroke={INK}
          strokeWidth="8"
        />
        <path
          d="M114 -110 H180 M114 -30 H180 M114 50 H180"
          stroke={INK}
          strokeWidth="5"
          opacity="0.4"
        />
        <rect x="108" y="-282" width="88" height="66" rx="30" fill={POP} />
        <rect
          x="108"
          y="-282"
          width="88"
          height="66"
          rx="30"
          fill="none"
          stroke={INK}
          strokeWidth="8"
        />
      </g>

      {/* Armrest. */}
      <path
        d="M-160 24 H108"
        stroke={INK}
        strokeWidth="19"
        strokeLinecap="round"
      />
      <path d="M-146 32 V94 M94 32 V94" stroke={INK} strokeWidth="11" />
    </g>
  );
}

registerScenes({
  /* --- Hero. The room, with the left half left empty for the headline. -- */
  'barber-room': {
    alt: 'a barber chair in front of a wall mirror, with a counter of bottles beside it',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />

        {/* Tiled wall. Small enough to read as tile, not as graph paper. */}
        <g stroke={INK} strokeWidth="3" opacity="0.16">
          <path d="M0 200 H1200 M0 300 H1200 M0 400 H1200 M0 500 H1200 M0 600 H1200" />
          <path d="M700 200 V600 M800 200 V600 M900 200 V600 M1000 200 V600 M1100 200 V600" />
        </g>

        {/* Mirror, with its own light over it. */}
        <rect x="780" y="196" width="330" height="360" rx="14" fill={WASH} />
        <rect
          x="780"
          y="196"
          width="330"
          height="360"
          rx="14"
          fill="none"
          stroke={INK}
          strokeWidth="10"
        />
        <path d="M800 470 L1090 226" stroke={PAPER} strokeWidth="26" opacity="0.4" />
        <path d="M800 540 L1090 296" stroke={PAPER} strokeWidth="14" opacity="0.28" />
        <path d="M900 196 V150 H990" stroke={INK} strokeWidth="8" fill="none" />
        <path d="M946 130 a44 30 0 0 1 88 0 Z" fill={POP} />

        {/* Counter and bottles. */}
        <rect x="760" y="600" width="440" height="26" fill={INK} />
        {[812, 866, 920, 974].map((bx, i) => (
          <g key={bx}>
            <rect
              x={bx}
              y={520 + (i % 2) * 22}
              width="34"
              height={80 - (i % 2) * 22}
              rx="6"
              fill={i % 2 ? POP : MID}
            />
            <rect x={bx + 11} y={506 + (i % 2) * 22} width="12" height="18" fill={INK} />
          </g>
        ))}

        <Chair x={492} y={452} s={0.94} />

        {/* Floor. */}
        <rect y="760" width="1200" height="140" fill={INK} opacity="0.5" />
        <rect y="760" width="1200" height="140" fill={hatch(id)} color={INK} opacity="0.18" />
      </>
    ),
  },

  /* --- The chair as an object. ------------------------------------------ */
  'barber-chair': {
    alt: 'a hydraulic barber chair with a headrest and a chrome footrest',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        <circle cx="620" cy="430" r="336" fill={toneFine(id)} color={MID} opacity="0.34" />
        <Chair x={640} y={480} s={1.18} />
        <ellipse cx="640" cy="852" rx="330" ry="26" fill={INK} opacity="0.2" />
      </>
    ),
  },

  /* --- Flat lay. -------------------------------------------------------- */
  'barber-tools': {
    alt: 'clippers, guards, a comb, shears and a neck brush laid out on a towel',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        {/* Towel under everything, on the diagonal so the lay is not a grid. */}
        <g transform="rotate(-6 600 450)">
          <rect x="120" y="180" width="960" height="540" rx="18" fill={MID} opacity="0.34" />
          <rect x="120" y="180" width="960" height="540" rx="18" fill={tone(id)} color={MID} opacity="0.22" />
          <path d="M120 240 H1080 M120 660 H1080" stroke={INK} strokeWidth="6" opacity="0.3" />
        </g>

        {/* Clippers. */}
        <g transform="translate(360 400) rotate(-14)">
          <rect x="-110" y="-64" width="220" height="130" rx="22" fill={INK} />
          <rect x="-84" y="-40" width="72" height="34" rx="8" fill={POP} />
          <path d="M110 -40 L188 -22 L188 26 L110 46 Z" fill={MID} />
          <path d="M110 -40 L188 -22 L188 26 L110 46 Z" fill="none" stroke={INK} strokeWidth="7" />
          <path d="M150 -30 V38 M170 -26 V34" stroke={INK} strokeWidth="5" opacity="0.5" />
          <path d="M-110 20 L-210 44" stroke={INK} strokeWidth="13" strokeLinecap="round" />
        </g>

        {/* Guards, stepped, because a stack of identical ones says nothing. */}
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${760 + i * 96} ${250 + i * 18})`}>
            <rect x="-38" y={-20 - i * 9} width="76" height={44 + i * 9} rx="8" fill={MID} />
            <rect
              x="-38"
              y={-20 - i * 9}
              width="76"
              height={44 + i * 9}
              rx="8"
              fill="none"
              stroke={INK}
              strokeWidth="6"
            />
          </g>
        ))}

        {/* Comb. */}
        <g transform="translate(420 700) rotate(-8)">
          <rect x="-230" y="-26" width="460" height="30" rx="8" fill={INK} />
          {Array.from({ length: 24 }, (_, i) => (
            <path key={i} d={`M${-216 + i * 18} 4 v${i < 12 ? 44 : 30}`} stroke={INK} strokeWidth="6" strokeLinecap="round" />
          ))}
        </g>

        {/* Shears. */}
        <g transform="translate(880 590) rotate(34)">
          <circle cx="-88" cy="-36" r="30" fill="none" stroke={INK} strokeWidth="13" />
          <circle cx="-88" cy="36" r="30" fill="none" stroke={INK} strokeWidth="13" />
          <path d="M-62 -24 L150 42" stroke={INK} strokeWidth="15" strokeLinecap="round" />
          <path d="M-62 24 L150 -42" stroke={INK} strokeWidth="15" strokeLinecap="round" />
          <circle cx="-8" cy="0" r="12" fill={POP} stroke={INK} strokeWidth="6" />
        </g>
      </>
    ),
  },

  /* --- The fade, drawn as what it is: a gradient in hair. --------------- */
  'barber-fade': {
    alt: 'a head in profile showing a skin fade graduating up into the length on top',
    draw: (id) => (
      <>
        <defs>
          <clipPath id={`${id}-head`}>
            <path
              d="M600 168 C692 174 748 244 750 328 C752 412 742 472 728 524
                 C720 562 716 586 710 616 L710 720 L560 720
                 C554 666 540 630 512 608 C488 590 458 584 442 566
                 C428 552 430 528 432 512 C434 496 418 490 408 478
                 C396 464 398 454 412 446 C426 438 444 428 448 412
                 C452 394 434 388 436 372 C440 320 462 252 516 204
                 C542 182 570 170 600 168 Z"
            />
          </clipPath>
        </defs>

        <rect width="1200" height="900" fill={PAPER} />
        <circle cx="600" cy="420" r="340" fill={MID} opacity="0.18" />

        {/* Skin. */}
        <path
          d="M600 168 C692 174 748 244 750 328 C752 412 742 472 728 524
             C720 562 716 586 710 616 L710 720 L560 720
             C554 666 540 630 512 608 C488 590 458 584 442 566
             C428 552 430 528 432 512 C434 496 418 490 408 478
             C396 464 398 454 412 446 C426 438 444 428 448 412
             C452 394 434 388 436 372 C440 320 462 252 516 204
             C542 182 570 170 600 168 Z"
          fill={WASH}
        />

        {/* The fade itself: four bands of thinning tone inside the head,
            which is exactly how a fade is cut and exactly how it is drawn. */}
        <g clipPath={`url(#${id}-head)`}>
          <rect x="380" y="470" width="400" height="120" fill={toneFine(id)} color={INK} opacity="0.3" />
          <rect x="380" y="386" width="400" height="90" fill={toneFine(id)} color={INK} opacity="0.55" />
          <rect x="380" y="316" width="400" height="76" fill={tone(id)} color={INK} opacity="0.7" />
          <rect x="380" y="150" width="400" height="172" fill={INK} />
          {/* Length on top, with the cut line a comb would leave. */}
          <path
            d="M420 322 q70 -156 200 -150 q120 6 150 150 Z"
            fill={INK}
          />
        </g>

        {/* Outline last so nothing muddies it. */}
        <path
          d="M600 168 C692 174 748 244 750 328 C752 412 742 472 728 524
             C720 562 716 586 710 616 L710 720 L560 720
             C554 666 540 630 512 608 C488 590 458 584 442 566
             C428 552 430 528 432 512 C434 496 418 490 408 478
             C396 464 398 454 412 446 C426 438 444 428 448 412
             C452 394 434 388 436 372 C440 320 462 252 516 204
             C542 182 570 170 600 168 Z"
          fill="none"
          stroke={INK}
          strokeWidth="9"
          strokeLinejoin="round"
        />

        {/* Ear and jaw, which is all the face anybody needs from this angle. */}
        <path d="M660 430 q46 -18 46 34 q0 50 -42 44" fill="none" stroke={INK} strokeWidth="8" />
        <path d="M448 412 q-16 12 -6 26" fill="none" stroke={INK} strokeWidth="7" />

        {/* The guard numbers, set as ticks rather than as type. */}
        <g stroke={POP} strokeWidth="8" strokeLinecap="round">
          <path d="M830 560 h56 M830 470 h44 M830 388 h32 M830 300 h20" />
        </g>
      </>
    ),
  },

  /* --- Hot towel and a straight razor. ---------------------------------- */
  'barber-razor': {
    alt: 'an open straight razor beside a folded hot towel, on a leather strop',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        <circle cx="600" cy="420" r="340" fill={toneFine(id)} color={MID} opacity="0.3" />

        {/* Strop, demoted to a surface. It used to be drawn at the same weight
            as the razor and the two read as a pair of black bars. */}
        <g transform="rotate(-8 600 560)">
          <rect x="120" y="486" width="960" height="150" rx="18" fill={MID} opacity="0.5" />
          <rect x="120" y="486" width="960" height="150" rx="18" fill={hatch(id)} color={MID} opacity="0.2" />
          <rect x="120" y="486" width="960" height="150" rx="18" fill="none" stroke={INK} strokeWidth="7" />
          <path d="M120 534 H1080" stroke={INK} strokeWidth="4" opacity="0.3" />
        </g>

        {/*
         * Razor, open past straight, the way one sits when you put it down.
         *
         * Everything is built out from the pivot at the origin: blade to the
         * left, scales rotated off to the right. Drawn as two separately
         * placed shapes they came out as two unrelated objects lying near each
         * other, which is the giveaway that nobody checked the hinge.
         */}
        <g transform="translate(590 400) rotate(-10)">
          {/* Scales, hinged at the pivot and swung back under the blade. */}
          <g transform="rotate(24)">
            <rect x="-26" y="-36" width="368" height="72" rx="34" fill={INK} />
            <rect x="24" y="-13" width="272" height="15" rx="7" fill={POP} opacity="0.85" />
            <circle cx="316" cy="0" r="11" fill={PAPER} opacity="0.55" />
          </g>

          {/* Blade: tang, then a spine and a hollow-ground edge running left. */}
          <path
            d="M-6 -30 h-296 a14 14 0 0 0 -14 14 v20 a14 14 0 0 0 14 14 h268
               q26 0 40 -20 Z"
            fill={WASH}
          />
          <path
            d="M-6 -30 h-296 a14 14 0 0 0 -14 14 v20 a14 14 0 0 0 14 14 h268
               q26 0 40 -20 Z"
            fill="none"
            stroke={INK}
            strokeWidth="8"
            strokeLinejoin="round"
          />
          {/* The spine line and the ground edge, which is what says "razor"
              rather than "butter knife". */}
          <path d="M-296 -14 H-2" stroke={INK} strokeWidth="6" opacity="0.35" />
          <path d="M-300 12 H-30" stroke={PAPER} strokeWidth="9" opacity="0.7" />

          {/* The pivot itself, drawn last so it sits over both halves. */}
          <circle cx="0" cy="0" r="15" fill={POP} stroke={INK} strokeWidth="7" />
        </g>

        {/* Folded hot towel, steaming, sat where the frame will not cut it. */}
        <g transform="translate(838 662)">
          <rect x="-180" y="-56" width="360" height="112" rx="56" fill={POP} opacity="0.6" />
          <rect x="-180" y="-56" width="360" height="112" rx="56" fill="none" stroke={INK} strokeWidth="8" />
          <path
            d="M-90 -56 a56 56 0 0 0 0 112 M20 -56 a56 56 0 0 0 0 112"
            fill="none"
            stroke={INK}
            strokeWidth="6"
            opacity="0.45"
          />
          <g fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" opacity="0.5">
            <path d="M-70 -90 q22 -30 0 -60 M30 -90 q22 -30 0 -60 M-20 -108 q22 -34 0 -68" />
          </g>
        </g>
      </>
    ),
  },

  /* --- The pole. -------------------------------------------------------- */
  'barber-pole': {
    alt: 'a barber pole, its helix turning inside a chrome cylinder',
    draw: (id) => (
      <>
        <rect width="1200" height="900" fill={PAPER} />
        <rect x="380" y="0" width="440" height="900" fill={MID} opacity="0.14" />
        <rect x="380" y="0" width="440" height="900" fill={hatch(id)} color={MID} opacity="0.1" />

        {/* Cylinder. */}
        <rect x="506" y="180" width="188" height="540" rx="94" fill={WASH} />
        <g clipPath="none">
          {Array.from({ length: 9 }, (_, i) => (
            <path
              key={i}
              d={`M506 ${212 + i * 66} L694 ${152 + i * 66} L694 ${196 + i * 66} L506 ${256 + i * 66} Z`}
              fill={i % 2 ? POP : INK}
              opacity={i % 2 ? 0.9 : 0.85}
            />
          ))}
        </g>
        <rect x="506" y="180" width="188" height="540" rx="94" fill={PAPER} opacity="0" />
        {/* The glass over it: the cylinder's own edge, redrawn on top so the
            stripes stop where the tube does. */}
        <path
          d="M506 274 V180 a94 94 0 0 1 188 0 v94 M506 626 v94 a94 94 0 0 0 188 0 v-94"
          fill={PAPER}
        />
        <rect x="506" y="180" width="188" height="540" rx="94" fill="none" stroke={INK} strokeWidth="11" />
        <path d="M546 250 V650" stroke={PAPER} strokeWidth="20" opacity="0.4" />

        {/* Caps. */}
        <rect x="474" y="120" width="252" height="70" rx="20" fill={INK} />
        <rect x="474" y="710" width="252" height="70" rx="20" fill={INK} />
        <circle cx="600" cy="100" r="30" fill={POP} stroke={INK} strokeWidth="9" />
      </>
    ),
  },
});

export {};
