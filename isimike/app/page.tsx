import Image from "next/image";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";

import SculptureHero from "@/components/ui/liquid-sculpture-hero";
import { site } from "@/lib/site";

const collection = [
  {
    title: "Neuheiten",
    text: "Was gerade neu in unseren Regalen steht – Stück für Stück ausgewählt.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    alt: "Heller Ladenraum mit Regalen und Kleiderstangen",
  },
  {
    title: "Lieblingsstücke",
    text: "Die Produkte, nach denen Sie immer wieder fragen.",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80",
    alt: "Ordentlich präsentierte Produkte in einer Ladenauslage",
  },
  {
    title: "Zum Verschenken",
    text: "Ideen für jeden Anlass – auf Wunsch schön verpackt.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
    alt: "Schaufenster eines Ladens an der Straße",
  },
];

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <SculptureHero
        brand={site.name}
        navLinks={[
          { label: "Der Laden", href: "#about" },
          { label: "Sortiment", href: "#collection" },
          { label: "Öffnungszeiten", href: "#visit" },
        ]}
        navCta={{ label: "Kontakt", href: "#visit" }}
        themeToggle={false}
        eyebrow={site.tagline}
        headline={"Qualität, die\nauffällt."}
        headlineAccent="auffällt."
        body="Bei ISIMIKE finden Sie sorgfältig ausgewählte Produkte, freundliche Beratung und Menschen, die wissen, was sie verkaufen."
        primaryCta={{ label: "Zum Sortiment", href: "#collection" }}
        secondaryCta={{ label: "So finden Sie uns", href: "#visit" }}
        hint="Fahren Sie mit der Maus darüber"
        hintTouch="Berühren Sie die Form"
        imageAlt="Abstrakte Skulptur aus verflochtenen metallischen Fäden und Partikeln"
        backdropText="isimike"
        loadFonts={false}
        headingFont="var(--font-sans)"
        bodyFont="var(--font-sans)"
        accentFont="var(--font-serif)"
      />

      <section id="about" className="mx-auto grid max-w-6xl gap-10 px-5 py-24 md:grid-cols-[1.1fr_1fr] md:items-center md:px-12 md:py-32">
        <div>
          <p className="mb-5 text-xs uppercase tracking-[0.14em] text-muted-foreground">Der Laden</p>
          <h2 className="text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-balance md:text-6xl">
            Kleiner Laden, <span className="font-serif font-normal italic">große Sorgfalt.</span>
          </h2>
        </div>
        <div className="space-y-5 text-[17px] leading-relaxed text-muted-foreground text-pretty">
          <p>
            ISIMIKE begann mit einer einfachen Idee: wenige, aber gute Dinge – und Zeit für jeden Kunden. Jedes Produkt
            in unseren Regalen haben wir selbst getestet und empfehlen es mit gutem Gewissen.
          </p>
          <p>Schauen Sie vorbei und lernen Sie uns kennen – wir freuen uns auf ein Gespräch.</p>
        </div>
      </section>

      <section id="collection" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-12 md:py-32">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-4xl font-medium tracking-[-0.035em] md:text-5xl">Sortiment</h2>
            <p className="max-w-sm text-muted-foreground">Ein Vorgeschmack auf das, was Sie im Laden erwartet. Das ganze Sortiment entdecken Sie vor Ort.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {collection.map((item) => (
              <article key={item.title} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-5 text-lg font-medium tracking-[-0.01em]">{item.title}</h3>
                <p className="mt-1 text-muted-foreground">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 md:grid-cols-2 md:px-12 md:py-32">
          <div>
            <h2 className="text-4xl font-medium leading-[1.02] tracking-[-0.035em] md:text-6xl">
              Besuchen Sie <span className="font-serif font-normal italic">uns.</span>
            </h2>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener"
              className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-primary-foreground px-6 font-medium text-primary transition-transform hover:-translate-y-px"
            >
              Route in Google Maps <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>

          <dl className="grid gap-8 sm:grid-cols-2">
            <div>
              <dt className="mb-2 flex items-center gap-2 text-sm opacity-60">
                <MapPin className="size-4" aria-hidden /> Adresse
              </dt>
              <dd>{site.address}</dd>
            </div>
            <div>
              <dt className="mb-2 flex items-center gap-2 text-sm opacity-60">
                <Phone className="size-4" aria-hidden /> Telefon
              </dt>
              <dd>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="underline-offset-4 hover:underline">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="mb-2 flex items-center gap-2 text-sm opacity-60">
                <Mail className="size-4" aria-hidden /> Email
              </dt>
              <dd>
                <a href={`mailto:${site.email}`} className="underline-offset-4 hover:underline">
                  {site.email}
                </a>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="mb-2 flex items-center gap-2 text-sm opacity-60">
                <Clock className="size-4" aria-hidden /> Öffnungszeiten
              </dt>
              <dd className="max-w-sm space-y-1">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4">
                    <span>{h.days}</span>
                    <span className="tabular-nums opacity-80">{h.time}</span>
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
