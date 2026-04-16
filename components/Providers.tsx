'use client'

import { ThemeProvider } from "next-themes"
import { usePathname } from "next/navigation"
import Navbar from "./Navbar"
import Footer from "./Footer"
import PageTransition from "./PageTransition"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import type { Profile, SiteSettings } from "@/lib/types"

export default function Providers({ 
  children,
  profile,
  settings
}: { 
  children: React.ReactNode,
  profile?: Profile | null,
  settings?: SiteSettings | null
}) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {!isAdmin && <Navbar profile={profile} settings={settings} />}
      {!isAdmin ? (
        <PageTransition>
          <main className="flex-grow">{children}</main>
        </PageTransition>
      ) : (
        <main className="flex-grow h-full">{children}</main>
      )}
      {!isAdmin && <Footer settings={settings} />}
      <ToastContainer position="bottom-right" theme="colored" />
    </ThemeProvider>
  )
}
