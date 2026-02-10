import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"), // domain gelince değiştir
  title: {
    default: "Ata Mantar | Taze Kültür Mantarı Üretimi ve Satışı",
    template: "%s | Ata Mantar",
  },
  description:
    "Tesisimizde günlük üretim: kültür mantarı (ve varsa istiridye). Toptan/perakende satış, hızlı teslimat, hijyenik paketleme.",
  keywords: [
    "mantar",
    "kültür mantarı",
    "istiridye mantarı",
    "toptan mantar",
    "satılık mantar",
    "mantar üreticisi",
    "mantar tesisi",
  ],
  openGraph: {
    title: "Ata Mantar | Taze Mantarı Kaynağından",
    description: "Günlük taze üretim, hijyenik paketleme, toptan/perakende satış.",
    url: "https://example.com",
    siteName: "Ata Mantar",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "Ata Mantar - Mantar Tesisi" },
    ],
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-white text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  );
}
