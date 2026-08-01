type BujueyiSpinMarkProps = {
  active: boolean;
};

export function BujueyiSpinMark({ active }: BujueyiSpinMarkProps) {
  return (
    <span
      className={`bujueyi-spin-mark ${active ? "is-spinning" : ""}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 160 160"
        role="img"
        className="h-full w-full"
        focusable="false"
      >
        <defs>
          <linearGradient id="bujueInkStroke" x1="22" x2="138" y1="38" y2="118">
            <stop offset="0%" stopColor="#020617" />
            <stop offset="74%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>

        <circle className="mark-wash" cx="80" cy="80" r="54" />
        <path
          className="mark-one"
          d="M30 66 C56 55 105 55 130 65"
        />
        <path
          className="mark-left"
          d="M71 70 C66 86 58 99 47 112"
        />
        <path
          className="mark-right"
          d="M91 72 C101 84 112 96 126 109"
        />
        <g className="mark-eye">
          <circle cx="82" cy="86" r="13" />
          <circle cx="82" cy="86" r="4.5" />
        </g>
        <path className="mark-speedline" d="M35 81 C62 78 100 78 127 82" />
      </svg>
    </span>
  );
}
