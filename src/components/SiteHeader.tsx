"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

type NavItem = { label: string; href: string };

function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
}

function useActiveHash(items: NavItem[]) {
  const [active, setActive] = useState<string>("#");

  useEffect(() => {
    const onHash = () => setActive(window.location.hash || "#");
    onHash();

    const sections = items
      .map((i) => document.querySelector(i.href))
      .filter(Boolean) as Element[];

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      { root: null, threshold: [0.25, 0.35, 0.5], rootMargin: "-20% 0px -65% 0px" }
    );

    sections.forEach((s) => obs.observe(s));
    window.addEventListener("hashchange", onHash);

    return () => {
      window.removeEventListener("hashchange", onHash);
      obs.disconnect();
    };
  }, [items]);

  return active;
}

/**
 * Scroll davranışı:
 * - Aşağı scroll => header gizlenir
 * - En ufak yukarı scroll => header görünür
 * - En üstte (top) => header görünür
 */
function useAutoHideHeader(enabled: boolean, freeze: boolean) {
  const [visible, setVisible] = useState(true);
  const lastYRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      setVisible(true);
      return;
    }
    if (freeze) {
      setVisible(true);
      return;
    }

    lastYRef.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const lastY = lastYRef.current;
      const delta = y - lastY;

      // En üstte her zaman görünür
      if (y <= 8) {
        setVisible(true);
        lastYRef.current = y;
        return;
      }

      // Çok küçük jitter'ı yok say (trackpad titreşim vs.)
      if (Math.abs(delta) < 2) return;

      // Aşağı gidiyorsa gizle, yukarı gidiyorsa göster
      if (delta > 0) setVisible(false);
      else setVisible(true);

      lastYRef.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled, freeze]);

  return visible;
}

export default function SiteHeader({
  brand,
  city,
  whatsapp,
  items,
}: {
  brand: string;
  city: string;
  whatsapp: string;
  items: NavItem[];
}) {
  const [open, setOpen] = useState(false);
  useBodyScrollLock(open);

  const navItems = useMemo(() => items, [items]);
  const active = useActiveHash(navItems);

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Drawer açıkken header saklanmasın (freeze)
  const headerVisible = useAutoHideHeader(true, open);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(t);
    };
  }, [open]);

  const linkCls = (href: string) =>
    `transition-colors hover:text-zinc-900 ${
      active === href ? "text-zinc-900" : "text-zinc-600"
    }`;

  return (
    <>
      <header
        className={[
          "sticky top-0 z-50 border-b border-zinc-200/70 bg-white/80 backdrop-blur",
          "transition-transform duration-200 ease-out will-change-transform",
          headerVisible ? "translate-y-0" : "-translate-y-full",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Brand */}
          <a href="#" className="flex items-center gap-3">
            <Image
                src="/images/logo.png"
                alt="Ata Mantar Logo"
                width={32}
                height={32}
                className="rounded-lg"
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">{brand}</div>
              <div className="text-xs text-zinc-500 md:hidden">{city}</div>
            </div>
            <span className="hidden text-sm text-zinc-500 md:inline">{city}</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navItems.map((i) => (
              <a key={i.href} className={linkCls(i.href)} href={i.href}>
                {i.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              className="hidden rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 md:inline-flex"
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>

            {/* Mobile hamburger */}
            <button
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-2 shadow-sm hover:bg-zinc-50 md:hidden"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden">
          {/* overlay */}
          <div
            className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-sm"
            aria-hidden="true"
          >
            <button
              className="h-full w-full"
              aria-label="Menüyü kapat"
              onClick={() => setOpen(false)}
            />
          </div>

          {/* panel */}
          <aside
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            className="
              fixed right-0 top-0 z-[90]
              h-dvh w-[92vw] max-w-[360px]
              border-l border-zinc-200 bg-white shadow-2xl
              outline-none
            "
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
                <div className="text-sm font-semibold">{brand}</div>
                <button
                  ref={closeBtnRef}
                  className="rounded-xl border border-zinc-200 p-2 hover:bg-zinc-50"
                  onClick={() => setOpen(false)}
                  aria-label="Kapat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-1">
                  {navItems.map((i) => (
                    <a
                      key={i.href}
                      href={i.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-xl px-3 py-3 text-sm ${
                        active === i.href
                          ? "bg-zinc-900 text-white"
                          : "text-zinc-800 hover:bg-zinc-50"
                      }`}
                    >
                      {i.label}
                    </a>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-xs text-zinc-600">Hızlı iletişim</p>
                  <a
                    className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:opacity-90"
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp’tan Yaz
                  </a>
                </div>

                <p className="mt-4 text-xs text-zinc-500">
                  {city} • {brand}
                </p>
              </div>

              <div className="h-[env(safe-area-inset-bottom)]" />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
