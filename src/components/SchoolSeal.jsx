// A simple embossed-seal placeholder used in place of an uploaded school
// logo. Rendered as SVG so it stays crisp in the letterhead and on print.
export default function SchoolSeal({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Greenfield Public School seal"
    >
      <circle cx="32" cy="32" r="30" fill="#153154" />
      <circle cx="32" cy="32" r="25" fill="none" stroke="#b8873b" strokeWidth="1.5" />
      <path d="M32 15 L47 23 L32 31 L17 23 Z" fill="#b8873b" />
      <rect x="19" y="31" width="26" height="3.4" fill="#f4f6f8" />
      <rect x="19" y="37.5" width="26" height="3.4" fill="#f4f6f8" />
      <text
        x="32"
        y="52"
        textAnchor="middle"
        fontSize="6"
        fill="#f4f6f8"
        fontFamily="Georgia, serif"
        letterSpacing="0.5"
      >
        EST. 1978
      </text>
    </svg>
  );
}
