import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between p-24">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
