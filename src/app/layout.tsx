import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "健康管理",
  description: "个人健康数据管理应用",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50`}>
        <div className="min-h-full pb-20">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
