
export default function ShareIcon({ onClick }: { onClick?: () => void }) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-5 cursor-pointer hover:bg-slate-200 rounded-lg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5H19.5V10.5M10.5 13.5L19.5 4.5M19.5 19.5H4.5V4.5"
      />
    </svg>
  );
}
