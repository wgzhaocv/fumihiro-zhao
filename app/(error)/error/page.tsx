import Link from "next/link";

const ErrorPage = () => {
  return (
    <main className="h-full w-full flex justify-center items-cente flex-col  text-zinc-700 bg-zinc-200 dark:text-zinc-300 dark:bg-zinc-800">
      <h1>Server Error</h1>
      <Link href="/">Return To Home</Link>
    </main>
  );
};

export default ErrorPage;
