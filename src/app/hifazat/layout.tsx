import type { Metadata } from "next";
import "./styles.css";
import HifazatNavigation from "@/components/hifazat/Navbar";

export const metadata: Metadata = {
  title: "Hifazat - Your Safe Space for Legal Assistance",
  description:
    " Ask questions, get AI-driven legal insights, and access curated support networks in real time. Hifazat ensures that every woman has access to the information and help she needs—confidentially and securely.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="Hifazat">
        <div className="navbar">
          <HifazatNavigation />
        </div>
        <main className="scroll-container mt-20">{children}</main>
      </div>
    </>
  );
}
