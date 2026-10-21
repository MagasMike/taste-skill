import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";

import SculptureHero from "@/components/ui/liquid-sculpture-hero";
import { formatPrice, menu, type MenuSection } from "@/lib/menu";
import { site } from "@/lib/site";

const logo = "/isimike-logo.png";

function MenuBlock({ section }: { section: MenuSection }) {
  return (
    <div className="break-inside-avoid pb-14">
      <h3 className="font-serif text-3xl italic text-accent md:text-4xl">{section.title}</h3>
      {section.note ? <p className="mt-2 max-w-md text-sm text-muted-foreground">{section.note}</p> : null}
      <ul className="mt-6 divide-y divide-border border-y border-border">
        {section.items.map((item) => (
          <li key={item.name} className="flex items-baseline justify-between gap-6 py-4">
            <div className="min-w-0">
              <p className="font-medium uppercase tracking-[0.04em]">{item.name}</p>
              {item.detail ? <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p> : null}
            </div>
            <p className="shrink-0 tabular-nums">
              {item.size ? <span className="mr-4 text-sm text-muted-foreground">{item.size}</span> : null}
              {item.detail === "Aufpreis" ? "+" : ""}
              {formatPrice(item.price)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <SculptureHero
        src={logo}
        darkSrc={logo}
        mobileSrc={logo}
        mobileDarkSrc={logo}
        imageAlt="ISIMIKE Logo"
        brand={site.name}
        navLinks={[
          { label: "Speisekarte", href: "#menu" },
          { label: "Über uns", href: "#about" },
          { label: "Öffnungszeiten", href: "#visit" },
        ]}
        navCta={{ label: "Bestellen", href: "#order" }}
        theme="dark"
        darkBackground="#0f0e0d"
        themeToggle={false}
        accentColor="#c9302f"
        eyebrow={`Foodtruck · Winnenden · ${site.tagline}`}
        headline={"Gyros wie in\nThessaloniki."}
        headlineAccent="Thessaloniki."
        body="Knusprige Pita, frisch vom Grill, mit Pommes, Tzatziki und Zwiebeln – so wie man es in Thessaloniki isst. Direkt am OBI-Parkplatz in Winnenden."
        primaryCta={{ label: "Zur Speisekarte", href: "#menu" }}
        secondaryCta={{ label: "Jetzt bestellen", href: "#order" }}
        hint=""
        hintTouch=""
        backdropText="gyros"
        sculptureScale={0.85}
        mobileSculptureScale={0.72}
        loadFonts={false}
        headingFont="var(--font-sans)"
        bodyFont="var(--font-sans)"
        accentFont="var(--font-serif)"
      />

      <section id="about" className="mx-auto grid max-w-6xl gap-10 px-5 py-24 md:grid-cols-[1.1fr_1fr] md:items-center md:px-12 md:py-32">
        <div>
          <p className="mb-5 text-xs uppercase tracking-[0.14em] text-muted-foreground">Über uns</p>
          <h2 className="text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-balance md:text-6xl">
            Isi &amp; Mike. <span className="font-serif font-normal italic text-accent">Ein Stück Thessaloniki.</span>
          </h2>
        </div>
        <div className="space-y-5 text-[17px] leading-relaxed text-muted-foreground text-pretty">
          <p>
            Hinter ISIMIKE stehen Isi und Mike. Mit unserem Foodtruck bringen wir das Streetfood aus Thessaloniki nach
            Winnenden: Gyros und Souvlaki vom Grill, Bifteki, Panseta und Loukaniko, eingerollt in warme Pita.
          </p>
          <p>Kommen Sie mittags oder abends vorbei, bestellen Sie zum Mitnehmen oder lassen Sie sich liefern.</p>
        </div>
      </section>

      <section id="menu" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-12 md:py-32">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-4xl font-medium tracking-[-0.035em] md:text-6xl">Speisekarte</h2>
            <p className="text-sm text-muted-foreground">Alle Preise in Euro inkl. MwSt.</p>
          </div>
          <div className="gap-16 md:columns-2">
            {menu.map((section) => (
              <MenuBlock key={section.title} section={section} />
            ))}
          </div>
        </div>
      </section>

      <section id="order" className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-24 md:flex-row md:items-end md:justify-between md:px-12 md:py-28">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.14em] text-muted-foreground">Bestellen</p>
            <h2 className="text-4xl font-medium leading-[1.02] tracking-[-0.035em] md:text-6xl">
              Hunger? <span className="font-serif font-normal italic text-accent">Wir liefern.</span>
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Online bestellen und liefern lassen – oder kurz anrufen und frisch abholen.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {site.order.map((o) => (
              <a
                key={o.label}
                href={o.href}
                target="_blank"
                rel="noopener"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-6 font-medium transition-colors hover:bg-foreground hover:text-background"
              >
                {o.label} <ArrowUpRight className="size-4" aria-hidden />
              </a>
            ))}
            <a
              href={site.phoneHref}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-medium text-accent-foreground transition-transform hover:-translate-y-px"
            >
              <Phone className="size-4" aria-hidden /> Anrufen
            </a>
          </div>
        </div>
      </section>

      <section id="visit" className="bg-card">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 md:grid-cols-2 md:px-12 md:py-32">
          <div>
            <h2 className="text-4xl font-medium leading-[1.02] tracking-[-0.035em] md:text-6xl">
              Hier <span className="font-serif font-normal italic text-accent">finden Sie uns.</span>
            </h2>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener"
              className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground transition-transform hover:-translate-y-px"
            >
              Route in Google Maps <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>

          <dl className="grid gap-8 sm:grid-cols-2">
            <div>
              <dt className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4" aria-hidden /> Adresse
              </dt>
              <dd>
                {site.street}
                <br />
                {site.city}
                <br />
                <span className="text-muted-foreground">{site.note}</span>
              </dd>
            </div>
            <div>
              <dt className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="size-4" aria-hidden /> Telefon
              </dt>
              <dd>
                <a href={site.phoneHref} className="underline-offset-4 hover:underline">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="size-4" aria-hidden /> Öffnungszeiten
              </dt>
              <dd className="max-w-sm space-y-1">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4">
                    <span>{h.days}</span>
                    <span className="tabular-nums text-muted-foreground">{h.time}</span>
                  </div>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground md:px-12">
        <span className="font-semibold text-foreground">{site.name}</span>
        <span>© {new Date().getFullYear()} {site.name}. Alle Rechte vorbehalten.</span>
      </footer>
    </main>
  );
}
