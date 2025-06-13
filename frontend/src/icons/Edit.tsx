
export default function EditIcon({ onClick }: { onClick?: () => void }) {
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
        d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182L6.75 19.963 3 21l1.037-3.75L16.862 3.487z"
      />
    </svg>
  );
}
