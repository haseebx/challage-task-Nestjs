import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material";
import theme from "@/constants/theme";
import StyledComponentsRegistry from "../../lib/registry";
import CustomToastContainer from "@/components/core/toast/index.styles";
import "./globals.css";
export const metadata: Metadata = {
  title: "E-Commernce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`backgroundClass`}
        suppressHydrationWarning={false}
        suppressContentEditableWarning={false}
      >
        <StyledComponentsRegistry>
            <NextTopLoader
              color="white"
              zIndex={1600}
              showAtBottom={false}
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow="0 0 10px #FFABC8,0 0 5px #FFABC8"
            />
            <CustomToastContainer />
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
