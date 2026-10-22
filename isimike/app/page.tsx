import type { CSSProperties } from "react";
import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";

import { DishWheel } from "@/components/dish-wheel";
import { Reveal } from "@/components/reveal";
import { CoverFlowCarousel } from "@/components/ui/3-d-coverflow-carousel";
import SculptureHero from "@/components/ui/liquid-sculpture-hero";
import { formatPrice, menu, type MenuSection } from "@/lib/menu";
import { dishes, highlights, photoCredits } from "@/lib/photos";
import { site } from "@/lib/site";

const logo = "/isimike-logo.png";

// Stagger index for the section entrances (see globals.css).
const step = (i: number) => ({ "--i": i }) as CSSProperties;

const press = "transition-transform duration-150 ease-out active:scale-[0.97]";

function MenuBlock({ section, index }: { section: MenuSection; index: number }) {
  return (
    <div className="mb-6 break-inside-avoid rounded-2xl bg-card p-6 md:p-9" data-reveal style={step(index % 2)}>
      <h3 className="text-3xl font-medium tracking-[-0.03em] md:text-4xl">{section.title}</h3>
      {section.note ? <p className="mt-3 max-w-md text-muted-foreground">{section.note}</p> : null}
      <ul className="mt-6 space-y-1">
        {section.items.map((item) => (
          <li key={item.name} className="-mx-3 flex items-baseline justify-between gap-6 rounded-lg px-3 py-3 transition-colors duration-200 hover:bg-muted">
            <div className="min-w-0">
              <p className="text-lg font-medium">{item.name}</p>
              {item.detail ? <p className="mt-0.5 text-muted-foreground">{item.detail}</p> : null}
            </div>
            <p className="shrink-0 text-lg tabular-nums">
              {item.size ? <span className="mr-4 text-muted-foreground">{item.size}</span> : null}
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
      <Reveal />

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
        textColor="#f2f2f0"
        eyebrow=""
        headline={"Gyros wie in\nThessaloniki."}
        headlineAccent=""
        body={`Knusprige Pita, frisch vom Grill, mit Pommes, Tzatziki und Zwiebeln – so wie man es in Thessaloniki isst. Foodtruck in Winnenden, direkt am OBI-Parkplatz. ${site.tagline}.`}
        primaryCta={{ label: "Zur Speisekarte", href: "#menu" }}
        secondaryCta={{ label: "Jetzt bestellen", href: "#order" }}
        hint=""
        hintTouch=""
        backdropText=""
        sculptureScale={0.85}
        mobileSculptureScale={0.72}
        loadFonts={false}
        headingFont="var(--font-sans)"
        bodyFont="var(--font-sans)"
        accentFont="var(--font-sans)"
      />

      <section id="about" className="mx-auto grid max-w-6xl gap-10 px-5 py-28 md:px-12 md:py-40 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <h2 className="text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-balance md:text-6xl" data-reveal>
          Isi &amp; Mike. Ein Stück Thessaloniki.
        </h2>
        <div className="max-w-[60ch] space-y-5 text-lg leading-relaxed text-pretty">
          <p data-reveal style={step(1)}>
            Hinter ISIMIKE stehen Isi und Mike. Mit unserem Foodtruck bringen wir das Streetfood aus Thessaloniki nach
            Winnenden: Gyros und Souvlaki vom Grill, Bifteki, Panseta und Loukaniko, eingerollt in warme Pita.
          </p>
          <p data-reveal style={step(2)}>
            Kommen Sie mittags oder abends vorbei, bestellen Sie zum Mitnehmen oder lassen Sie sich liefern.
          </p>
        </div>
      </section>

      <section aria-labelledby="klassiker" className="bg-card pt-24 md:pt-32">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 md:flex-row md:items-end md:justify-between md:px-12">
          <h2 id="klassiker" className="text-4xl font-medium leading-[1.02] tracking-[-0.035em] md:text-6xl" data-reveal>
            Unsere Klassiker
          </h2>
          <p className="max-w-sm text-lg text-muted-foreground" data-reveal style={step(1)}>
            Scrollen, ziehen oder mit den Pfeiltasten drehen. Jedes Gericht führt zur Speisekarte.
          </p>
        </div>
        <DishWheel items={dishes} label="Klassiker" action="Zur Karte" />
      </section>

      <section id="menu">
        <div className="mx-auto max-w-6xl px-5 pt-24 pb-28 md:px-12 md:pt-32 md:pb-40">
          <h2 className="mb-14 text-4xl font-medium tracking-[-0.035em] md:text-6xl" data-reveal>Speisekarte</h2>
          <div className="gap-6 lg:columns-2">
            {menu.map((section, i) => (
              <MenuBlock key={section.title} section={section} index={i} />
            ))}
          </div>
          <p className="mt-4 text-muted-foreground">Alle Preise in Euro inkl. MwSt.</p>
        </div>
      </section>

      <CoverFlowCarousel
        items={highlights}
        sectionLabel="Aus Thessaloniki"
        accentColor="#b3242a"
        accentForeground="#ffffff"
        backgroundColor="#0f0e0d"
        fontFamily="var(--font-sans)"
      />

      <section id="order" className="bg-accent text-accent-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-24 md:px-12 md:py-32 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-5xl font-medium leading-[1.02] tracking-[-0.035em] md:text-7xl" data-reveal>
              Hunger? Wir liefern.
            </h2>
            <p className="mt-6 max-w-md text-lg" data-reveal style={step(1)}>
              Online bestellen und liefern lassen – oder kurz anrufen und frisch abholen.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0" data-reveal style={step(2)}>
            {site.order.map((o) => (
              <a
                key={o.label}
                href={o.href}
                target="_blank"
                rel="noopener"
                className={`inline-flex h-14 items-center gap-2 rounded-full bg-background px-7 text-lg font-medium text-foreground hover:bg-muted ${press}`}
              >
                {o.label} <ArrowUpRight className="size-4" aria-hidden />
              </a>
            ))}
            <a
              href={site.phoneHref}
              className={`inline-flex h-14 items-center gap-2 rounded-full bg-primary px-7 text-lg font-medium text-primary-foreground ${press}`}
            >
              <Phone className="size-4" aria-hidden /> Anrufen
            </a>
          </div>
        </div>
      </section>

      <section id="visit" className="bg-card">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-28 md:grid-cols-2 md:px-12 md:py-40">
          <div>
            <h2 className="text-4xl font-medium leading-[1.02] tracking-[-0.035em] md:text-6xl" data-reveal>
              Hier finden Sie uns.
            </h2>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener"
              className={`mt-10 inline-flex h-14 items-center gap-2 rounded-full bg-primary px-7 text-lg font-medium text-primary-foreground ${press}`}
              data-reveal
              style={step(1)}
            >
              Route in Google Maps <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>

          <dl className="grid gap-10 text-lg sm:grid-cols-2">
            <div data-reveal style={step(1)}>
              <dt className="mb-2 flex items-center gap-2 text-muted-foreground">
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
            <div data-reveal style={step(2)}>
              <dt className="mb-2 flex items-center gap-2 text-muted-foreground">
                <Phone className="size-4" aria-hidden /> Telefon
              </dt>
              <dd>
                <a href={site.phoneHref} className="underline-offset-4 hover:underline">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div className="sm:col-span-2" data-reveal style={step(3)}>
              <dt className="mb-2 flex items-center gap-2 text-muted-foreground">
                <Clock className="size-4" aria-hidden /> Öffnungszeiten
              </dt>
              <dd className="max-w-sm space-y-1">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4">
                    <span>{h.days}</span>
                    <span className="tabular-nums">{h.time}</span>
                  </div>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-5 pt-24 pb-10 md:px-12">
        <p className="text-[clamp(4.5rem,19vw,16rem)] font-semibold leading-[0.85] tracking-[-0.05em]" aria-hidden>
          {site.name}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-muted-foreground">
          <span>{site.tagline} · Winnenden</span>
          <span>© {new Date().getFullYear()} {site.name}. Alle Rechte vorbehalten.</span>
        </div>
        <p className="mt-6 text-[13px] leading-relaxed text-muted-foreground">
          Fotos von Unsplash:{" "}
          {photoCredits.map((c, i) => (
            <span key={c.src}>
              <a href={c.page} target="_blank" rel="noopener" className="underline-offset-2 hover:underline">
                {c.author}
              </a>
              {i < photoCredits.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
      </footer>
    </main>
  );
}
