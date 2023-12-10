import clsx from "clsx";

type ProseProps = {
  children: React.ReactNode;
  className?: string;
};

const Prose = ({ children, className }: ProseProps) => {
  return (
    <div className={clsx(className, "prose dark:prose-invert")}>{children}</div>
  );
};

export default Prose;
