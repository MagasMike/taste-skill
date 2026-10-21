import Image from "next/image";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";

import SculptureHero from "@/components/ui/liquid-sculpture-hero";
import { site } from "@/lib/site";

const collection = [
  {
    title: "Νέες αφίξεις",
    text: "Ό,τι μόλις ήρθε στα ράφια μας, διαλεγμένο ένα προς ένα.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    alt: "Φωτεινό εσωτερικό καταστήματος με ράφια και κρεμάστρες",
  },
  {
    title: "Τα αγαπημένα",
    text: "Τα προϊόντα που ξαναζητάτε ξανά και ξανά.",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80",
    alt: "Προϊόντα τακτοποιημένα σε προθήκη καταστήματος",
  },
  {
    title: "Για δώρο",
    text: "Ιδέες για κάθε περίσταση, με περιτύλιγμα από εμάς.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
    alt: "Βιτρίνα καταστήματος στον δρόμο",
  },
];

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <SculptureHero
        brand={site.name}
        navLinks={[
          { label: "Το μαγαζί", href: "#about" },
          { label: "Συλλογή", href: "#collection" },
          { label: "Ωράριο", href: "#visit" },
        ]}
        navCta={{ label: "Επικοινωνία", href: "#visit" }}
        themeToggle={false}
        eyebrow={site.tagline}
        headline={"Ποιότητα που\nξεχωρίζει."}
        headlineAccent="ξεχωρίζει."
        body="Στο ISIMIKE θα βρείτε προσεγμένα προϊόντα, φιλική εξυπηρέτηση και ανθρώπους που ξέρουν τι πουλάνε."
        primaryCta={{ label: "Δείτε τη συλλογή", href: "#collection" }}
        secondaryCta={{ label: "Πού θα μας βρείτε", href: "#visit" }}
        hint="Περάστε τον κέρσορα από πάνω"
        hintTouch="Αγγίξτε το σχήμα"
        backdropText="isimike"
        loadFonts={false}
        headingFont="var(--font-sans)"
        bodyFont="var(--font-sans)"
        accentFont="var(--font-serif)"
      />

      <section id="about" className="mx-auto grid max-w-6xl gap-10 px-5 py-24 md:grid-cols-[1.1fr_1fr] md:items-center md:px-12 md:py-32">
        <div>
          <p className="mb-5 text-xs uppercase tracking-[0.14em] text-muted-foreground">Το μαγαζί</p>
          <h2 className="text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-balance md:text-6xl">
            Μικρό μαγαζί, <span className="font-serif font-normal italic">μεγάλη φροντίδα.</span>
          </h2>
        </div>
        <div className="space-y-5 text-[17px] leading-relaxed text-muted-foreground text-pretty">
          <p>
            Το ISIMIKE ξεκίνησε με μια απλή ιδέα: λίγα αλλά καλά πράγματα, και χρόνο για κάθε πελάτη. Κάθε προϊόν στα
            ράφια μας το έχουμε δοκιμάσει και το προτείνουμε με σιγουριά.
          </p>
          <p>Περάστε να γνωριστούμε, θα σας κεράσουμε και μια κουβέντα.</p>
        </div>
      </section>

      <section id="collection" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-12 md:py-32">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-4xl font-medium tracking-[-0.035em] md:text-5xl">Συλλογή</h2>
            <p className="max-w-sm text-muted-foreground">Μια γεύση από όσα θα βρείτε στο κατάστημα. Η πλήρης γκάμα σας περιμένει από κοντά.</p>
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
              Ελάτε να <span className="font-serif font-normal italic">μας δείτε.</span>
            </h2>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener"
              className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-primary-foreground px-6 font-medium text-primary transition-transform hover:-translate-y-px"
            >
              Οδηγίες στον χάρτη <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>

          <dl className="grid gap-8 sm:grid-cols-2">
            <div>
              <dt className="mb-2 flex items-center gap-2 text-sm opacity-60">
                <MapPin className="size-4" aria-hidden /> Διεύθυνση
              </dt>
              <dd>{site.address}</dd>
            </div>
            <div>
              <dt className="mb-2 flex items-center gap-2 text-sm opacity-60">
                <Phone className="size-4" aria-hidden /> Τηλέφωνο
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
                <Clock className="size-4" aria-hidden /> Ωράριο
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
        <span>© {new Date().getFullYear()} {site.name}. Με επιφύλαξη παντός δικαιώματος.</span>
      </footer>
    </main>
  );
}
