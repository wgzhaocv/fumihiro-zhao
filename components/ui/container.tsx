import clsx from "clsx";
import React from "react";

type ContainerProps = React.ComponentPropsWithoutRef<"div">;

const OutterContainer = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx("sm:px-8")} {...props}>
        <div className="mx-auto max-x-7xl lg:px-8">{children}</div>
      </div>
    );
  }
);

const InnerContainer = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx("relative px-4 sm:px-8 lg:px-12", className)}
        {...props}
      >
        <div className={"mx-auto max-w-2xl lg:max-w-5xl"}>{children}</div>
      </div>
    );
  }
);

const ContainerComponent = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, ...props }, ref) => {
    return (
      <OutterContainer ref={ref} {...props}>
        <InnerContainer>{children}</InnerContainer>
      </OutterContainer>
    );
  }
);

export const Container = Object.assign(ContainerComponent, {
  Outter: OutterContainer,
  Inner: InnerContainer,
});
