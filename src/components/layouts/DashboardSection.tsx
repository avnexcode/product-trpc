import { cn } from "@/lib/utils";
import { Heading } from "../ui/heading";

type DashboardSectionProps = {
  children: React.ReactNode;
  className?: string;
  sectionClassName?: string;
  title: string;
  description: string;
};

export const DashboardSection = ({
  children,
  className,
  sectionClassName,
  ...props
}: DashboardSectionProps) => {
  return (
    <section className={cn("w-full", sectionClassName)}>
      <header className="mb-20 mt-10 space-y-3">
        <Heading size={"h2"}>{props.title}</Heading>
        <h1 className="text-muted-foreground">{props.description}</h1>
      </header>
      <main className={cn("w-full", className)}>{children}</main>
    </section>
  );
};
