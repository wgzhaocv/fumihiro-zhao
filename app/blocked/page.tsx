const BlockedPage = () => {
  return (
    <main className="h-full w-full flex items-center justify-center flex-col bg-zinc-200 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
      <h1 className="mb-4 text-4xl font-black tracking-tighter">
        You have been <strong>blocked</strong> from me.
      </h1>
      <span className="text-sm">
        if you thing this is a mistake, please contact me at{" "}
        <a href="mailto:wgzhaocv@gmail.com" className="font-bold underline">
          wgzhaocv@gmail.com
        </a>
      </span>
    </main>
  );
};

export default BlockedPage;
