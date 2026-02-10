import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import MediaRenderer from "@/components/MediaRenderer";

const SITE = {
  brand: "Ata Mantar",
  city: "Antalya / Merkez",
  phone: "+90 551 407 60 60",
  whatsapp: "905514076060",
  email: "info@atamantar.com",
  // domain gelince layout metadataBase ile uyumlu yap
};

const NAV = [
  { label: "Ürünler", href: "#urunler" },
  { label: "Üretim", href: "#surec" },
  { label: "Toptan", href: "#toptan" },
  { label: "İletişim", href: "#iletisim" },
];

type Media =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string };

const CARDS = [
  {
    title: "Kalite",
    desc: "Günlük hasat, seçilmiş boyut, hijyenik paketleme.",
    media: { type: "image" as const, src: "/images/img_1.jpg", alt: "Kalite" },
  },
  {
    title: "Hijyen",
    desc: "Restoran, market, toptancı için koli/etiket opsiyonları.",
    media: { type: "video" as const, src: "/videos/video_4.mp4", poster: "/videos/video_4.jpg" },
  },
  {
    title: "Güven",
    desc: "Talebe göre üretim planı, düzenli sevkiyat.",
    media: { type: "image" as const, src: "/images/img_2.jpg", alt: "Güven" },
  },
] satisfies Array<{
  title: string;
  desc: string;
  media: Media;
}>;

const STEPS = [
  {
    step: "01",
    title: "Üretim Alanı",
    media: { type: "video", src: "/videos/video_3.mp4", poster: "/images/video_3.jpg" },
  },
  {
    step: "02",
    title: "Hasat & Seçim",
    media: { type: "video", src: "/videos/video_7.mp4", poster: "/images/video_7.jpg" },
  },
  {
    step: "03",
    title: "Paketleme",
    media: { type: "video", src: "/videos/video_5.mp4", poster: "/images/video_5.jpg" },
  },
] satisfies Array<{ step: string; title: string; media: Media }>;


const showForm = false;

function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p className="text-[11px] tracking-[0.28em] uppercase text-zinc-500">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {desc && (
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
          {desc}
        </p>
      )}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700 shadow-sm">
      {children}
    </span>
  );
}

function MediaPlaceholder({
  label,
  ratio = "aspect-video",
}: {
  label: string;
  ratio?: string;
}) {
  return (
    <div
      className={`flex ${ratio} w-full items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50`}
    >
      <p className="px-4 text-center text-xs text-zinc-500 sm:text-sm">{label}</p>
    </div>
  );
}

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.brand,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      addressCountry: "TR",
      addressLocality: SITE.city,
    },
    url: "https://example.com",
    sameAs: [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader brand={SITE.brand} city={SITE.city} whatsapp={SITE.whatsapp} items={NAV} />

      <main>
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-4 pt-8 sm:pt-12 lg:pt-16">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <div className="flex flex-wrap gap-2">
                <Pill>Günlük taze üretim</Pill>
                <Pill>Hijyenik paketleme</Pill>
                <Pill>Perakende & Toptan</Pill>
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Taze mantarı <span className="text-zinc-500">tesisten</span> sofranıza.
              </h1>

              <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
                {SITE.brand}, modern üretim tesisinde günlük hasat edilen mantarı hızlı teslimat ve
                standart kaliteyle sunar. “Satılık mantar / toptan mantar” arayanlar için net çözüm.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#iletisim"
                  className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-sm hover:opacity-90"
                >
                  Teklif / Fiyat Al
                </a>
                {/* <a
                  href="#urunler"
                  className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-50"
                >
                  Ürünleri Gör
                </a> */}
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
                <div className="rounded-2xl border border-zinc-200 bg-white p-3 sm:p-4">
                  <p className="text-lg font-semibold sm:text-2xl">24–48s</p>
                  <p className="mt-1 text-[11px] text-zinc-600 sm:text-xs">hızlı teslimat</p>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-3 sm:p-4">
                  <p className="text-lg font-semibold sm:text-2xl">+Standart</p>
                  <p className="mt-1 text-[11px] text-zinc-600 sm:text-xs">kalite kontrol</p>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-3 sm:p-4">
                  <p className="text-lg font-semibold sm:text-2xl">B2B</p>
                  <p className="mt-1 text-[11px] text-zinc-600 sm:text-xs">toptan anlaşma</p>
                </div>
              </div>

              {/* Mobilde hızlı iletişim CTA */}
              <div className="mt-6 sm:hidden">
                <a
                  className="inline-flex w-full items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-50"
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp’tan Yaz
                </a>
              </div>
            </div>

            {/* HERO MEDIA */}
            <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
              <div className="p-3 sm:p-4">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black">
                  <video
                    className="h-full w-full object-cover"
                    src="/videos/video_8.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>

              </div>

              <div className="border-t border-zinc-200 p-4">
                <p className="text-xs text-zinc-500">
                  Günlük hasat edilen ürünlerimiz, tesis içinde <span className="text-zinc-700">standartlara uygun</span> olarak yetiştirilir.
                </p>
              </div>

              {/*
              <video className="h-full w-full object-cover"
                autoPlay muted loop playsInline preload="metadata">
                <source src="/videos/hero.mp4" type="video/mp4"/>
              </video>
              */}
            </div>
          </div>
        </section>

        {/* ÜRÜNLER */}
        <section id="urunler" className="mx-auto max-w-6xl px-4 pt-14 sm:pt-20">
          <SectionTitle
            eyebrow="Ürünler"
            title="Kaliteyi standarda bağlayan ürün hattı"
            desc="Perakende ve toptan için uygun gramaj ve paketleme seçenekleri."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {CARDS.map((x) => (
              <div key={x.title} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold">{x.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{x.desc}</p>
                <div className="mt-5">
                  <MediaRenderer media={x.media} />
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ÜRETİM SÜRECİ */}
        <section id="surec" className="mx-auto max-w-6xl px-4 pt-14 sm:pt-20">
          <SectionTitle
            eyebrow="Üretim"
            title="Tesis standardı: temiz süreç, net kalite"
            desc="Süreci kısa loop videolarla anlatacağız. Bu bölüm güveni çok yükseltir."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {STEPS.map((x) => (
              <div
                key={x.step}
                className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
              >
                <div className="p-3 sm:p-4">
                  <MediaRenderer media={x.media} />
                </div>

                <div className="px-6 pb-6">
                  <p className="text-[11px] tracking-[0.22em] uppercase text-zinc-500">{x.step}</p>
                  <h3 className="mt-1 text-lg font-semibold">{x.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600">kalite kontrol, hijyen, süreklilik.</p>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* TOPTAN */}
        <section id="toptan" className="mx-auto max-w-6xl px-4 pt-14 sm:pt-20">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-[11px] tracking-[0.28em] uppercase text-zinc-500">
                  B2B / TOPTAN
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Düzenli sevkiyat, sabit kalite, hızlı iletişim
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
                  Market, manav, restoran ve toptancılar için haftalık/aylık planlı teslimat.
                  Gramaj, koli ve etiketleme opsiyonları.
                </p>

                <ul className="mt-5 space-y-2 text-sm text-zinc-700">
                  <li>• Minimum sipariş & rota planı</li>
                  <li>• Paket standardı / talebe göre gramaj</li>
                  <li>• Anlaşmalı fiyat & düzenli tedarik</li>
                </ul>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-sm hover:opacity-90"
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Toptan Teklif Al
                  </a>
                  <a
                    className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-100"
                    href="#iletisim"
                  >
                    İletişim
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-zinc-200 bg-white p-3 sm:p-4 shadow-sm">
                <MediaRenderer
                  media={{
                    type: "video",
                    src: "/videos/video_6.mp4",
                    poster: "/images/img_2.jpg",
                  }}
                />
              </div>

            </div>
          </div>
        </section>

        {/* İLETİŞİM */}
        <section id="iletisim" className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:pb-24 sm:pt-20">
          <SectionTitle
            eyebrow="İletişim"
            title="Teklif için 30 saniye yeter"
            desc="WhatsApp ile hızlı teklif."
          />

          <div className={`mt-10 grid gap-5 ${showForm ? "lg:grid-cols-2" : ""}`}>
            <div className={`rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm ${showForm ? "" : "mx-auto w-full max-w-2xl"}`}>
              <h3 className="text-lg font-semibold">İletişim Bilgileri</h3>
              <div className="mt-4 space-y-2 text-sm text-zinc-700">
                <p><span className="text-zinc-500">Telefon:</span> {SITE.phone}</p>
                <p><span className="text-zinc-500">E-posta:</span> {SITE.email}</p>
                <p><span className="text-zinc-500">Bölge:</span> {SITE.city}</p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-sm hover:opacity-90"
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp’tan Yaz
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-50"
                  href={`mailto:${SITE.email}`}
                >
                  E-posta Gönder
                </a>
              </div>

              <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
  <div className="relative w-full">
    {/* Üst etiket (net görünür) */}
    <div className="pointer-events-none absolute left-3 top-3 z-10">
      <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-zinc-900 shadow">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        Ata Mantar
      </div>
    </div>
    <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
  <div className="relative w-full">
    {/* Üst marka etiketi */}
    <div className="pointer-events-none absolute left-4 top-4 z-10">
      <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-zinc-900 shadow">
        📍 Ata Mantar
      </div>
    </div>

    {/* Harita */}
    <div className="relative h-[340px] w-full sm:h-[440px]">
      <iframe
        title="Ata Mantar - Antalya"
        className="absolute inset-0 h-full w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src="https://maps.google.com/maps?q=36.8969,30.7133&z=14&output=embed"
      />
    </div>

    {/* Alt bar */}
    <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3">
      <p className="text-xs text-zinc-500">
        Antalya Merkez • Ata Mantar
      </p>
      <a
        href="https://www.google.com/maps?q=36.8969,30.7133"
        target="_blank"
        rel="noreferrer"
        className="text-xs font-medium text-zinc-900 hover:opacity-70"
      >
        Harita'da aç →
      </a>
    </div>
  </div>
</div>

  </div>
</div>

            </div>

            {showForm && (
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Teklif Formu (yakında)</h3>
              <p className="mt-2 text-sm text-zinc-600">
                Bir sonraki adımda: form → e-posta/CRM/WhatsApp otomatik yönlendirme.
              </p>

              <div className="mt-6 grid gap-3">
                <input
                  className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
                  placeholder="Ad Soyad / Firma"
                  disabled
                />
                <input
                  className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
                  placeholder="Telefon"
                  disabled
                />
                <textarea
                  className="min-h-[120px] rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
                  placeholder="Talep (ürün, kg, teslimat bölgesi)"
                  disabled
                />
                <button
                  className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-sm opacity-60"
                  disabled
                >
                  Gönder (yakında)
                </button>
              </div>
            </div>
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-zinc-200">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-600">
              © {new Date().getFullYear()} {SITE.brand}. Tüm hakları saklıdır.
            </p>
            <p className="text-xs text-zinc-500">
              mantar, kültür mantarı, satılık mantar, toptan mantar
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
