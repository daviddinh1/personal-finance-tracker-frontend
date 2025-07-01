import { ModeToggle } from "./ModeToggle";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="font-bold text-2xl">Finance Tracker</div>
      <ModeToggle />
    </div>
  );
}
