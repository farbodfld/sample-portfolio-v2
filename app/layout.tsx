import "./globals.css";
import Providers from "../components/Providers";
import { getSiteSettings, getProfile } from "@/lib/data";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  const profile = await getProfile();

  const title = settings?.meta_title || profile?.full_name || "My Portfolio";
  const description = settings?.meta_description || profile?.short_bio || "Welcome to my portfolio";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: title,
      images: [
        {
          url: settings?.og_image_url || profile?.image_url || '/assets/hero-banner.jpg',
          width: 1200,
          height: 630,
        }
      ],
      locale: 'en_US',
      type: 'website',
    },
  }
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();
  const settings = await getSiteSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50 flex flex-col min-h-screen transition-colors duration-300">
        <Providers profile={profile} settings={settings}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
