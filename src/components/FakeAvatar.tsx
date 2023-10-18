import { cn } from "~/utils/tw";

interface FakeAvatarProps {
  className: React.HTMLProps<HTMLElement>["className"] | undefined | null;
}

const FakeAvatar: React.FC<FakeAvatarProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("rounded-full", className ?? "h-8 w-8")}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 11a3 3 0 100-6 3 3 0 000 6zm0 1c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"
      />
    </svg>
  );
};

export default FakeAvatar;
