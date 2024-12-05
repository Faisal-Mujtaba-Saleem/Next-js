import localFont from "next/font/local";
// Globals CSS
import "./styles/globals.css";
// Toast UI Editor & its Plugins CSS
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
// Toast UI CSS
import 'react-toastify/dist/ReactToastify.css';
// Prism Themes CSS
import 'prism-themes/themes/prism-atom-dark.css';
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { PostsContextProvider } from "@/contexts/posts-context/context";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <PostsContextProvider>
              <Navbar />
              <ToastContainer />
              {children}
            </PostsContextProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}