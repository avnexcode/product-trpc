import { TRPCReactProvider } from "@/lib/trpc/client";
import { ThemeProvider } from "./ThemeProvider";

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </ThemeProvider>
  );
};
