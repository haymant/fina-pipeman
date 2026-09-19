import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fina Pipeman Demo",
  description: "Showcase for the Fina Pipeman visual ETL authoring library."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
