"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import ToastNotificationComp from "@/components/ToastNotificationComp";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
const inter = Inter({ subsets: ["latin"] });
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Helmet } from "react-helmet";
import AuthProvider from "@/app/AuthProvider";
import "@lexicalLib/theme/EditorTheme.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const specificPath = [
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/forgot-password",
    "/unauthenticated",
    "/auth/reset-password",
    "/update-info",
  ];

  const hideSidebar = ["/admin"];
  const pathName = usePathname();
  const isSpecified = specificPath.includes(pathName);
  const resetPass = pathName.startsWith("/auth/reset-password");
  const isHideSidebar = hideSidebar.includes(pathName);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Provider store={store}>
          <AuthProvider>
            <Helmet>
              <title>FU-BLOG Community</title>
              <meta name="description" content="FU-BLOG" />
            </Helmet>
            {!isSpecified && !resetPass && <Header></Header>}
            {!isSpecified && !resetPass && !isHideSidebar && (
              <Sidebar></Sidebar>
            )}
            {children} <ToastNotificationComp />
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
