import type { CarouselItem } from "@/components/ui/3-d-coverflow-carousel"

// Photos from Wikimedia Commons, cropped to 2:3. Licences require the credits below.
export const photos = {
  gyrosWrap: { src: "photos/gyros-wrap.jpg", author: "Andy Li", license: "CC0", file: "Mix_Gyros_(Chicken_&_Pork)_Pitta_Wrap_-_Montague_Gyros_2025-12-06.jpg" },
  gyrosPita: { src: "photos/gyros-pita.jpg", author: "Benoît Prieur", license: "CC0", file: "Pita_Gyros_à_Almyrida_(juillet_2021)_-_4.jpg" },
  gyrosMaking: { src: "photos/gyros-making.jpg", author: "Neon Tommy", license: "CC BY-SA 2.0", file: "Gyros_pita_making.jpg" },
  souvlakiGrill: { src: "photos/souvlaki-grill.jpg", author: "George M. Groutas", license: "CC BY 2.0", file: "Preparing_souvlaki.jpg" },
  souvlakiPlate: { src: "photos/souvlaki-plate.jpg", author: "Cifo Buscemi", license: "CC BY 3.0", file: "Souvlakiplate.jpg" },
  whiteTower: { src: "photos/white-tower.jpg", author: "Hermann Hammer", license: "CC BY-SA 4.0", file: "White_Tower_in_Thessaloniki.jpg" },
  aristotelous: { src: "photos/aristotelous.jpg", author: "Park Hotel-1", license: "CC0", file: "View_of_Aristotelous_Square_in_Thessaloniki.jpg" },
}

export const photoCredits = Object.values(photos).map((p) => ({
  ...p,
  href: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(p.file)}`,
}))

export const highlights: CarouselItem[] = [
  {
    tag: "#Bestseller",
    titleLine1: "Pita Gyros",
    titleLine2: "– wie in Thessaloniki",
    desc: "Mit Pommes, Tomaten, Tzatziki und Zwiebeln, eingerollt in warme Pita",
    img: photos.gyrosWrap.src,
    ctaText: "Zur Speisekarte",
    ctaUrl: "#menu",
  },
  {
    tag: "#Thessaloniki",
    titleLine1: "Lefkos Pyrgos",
    titleLine2: "– der Weiße Turm",
    desc: "Das Wahrzeichen unserer Heimatstadt am Meer",
    img: photos.whiteTower.src,
    ctaText: "Über uns",
    ctaUrl: "#about",
  },
  {
    tag: "#VomGrill",
    titleLine1: "Souvlaki",
    titleLine2: "– frisch am Spieß",
    desc: "Schwein oder Hähnchen, über Holzkohle gegrillt",
    img: photos.souvlakiGrill.src,
    ctaText: "Zur Speisekarte",
    ctaUrl: "#menu",
  },
  {
    tag: "#Handgemacht",
    titleLine1: "Pitabrot",
    titleLine2: "– warm von der Platte",
    desc: "Jede Pita wird frisch für Sie gebacken",
    img: photos.gyrosMaking.src,
    ctaText: "Jetzt bestellen",
    ctaUrl: "#order",
  },
  {
    tag: "#Tellergericht",
    titleLine1: "Souvlaki-Teller",
    titleLine2: "– mit Pommes",
    desc: "Drei Spieße mit Pommes, Tzatziki, Zwiebeln und Pitabrot",
    img: photos.souvlakiPlate.src,
    ctaText: "Zur Speisekarte",
    ctaUrl: "#menu",
  },
  {
    tag: "#Thessaloniki",
    titleLine1: "Aristotelous",
    titleLine2: "– Platz am Meer",
    desc: "Wo die Stadt sich trifft – und Gyros an jeder Ecke wartet",
    img: photos.aristotelous.src,
    ctaText: "Über uns",
    ctaUrl: "#about",
  },
  {
    tag: "#Klassiker",
    titleLine1: "Gyros Pita",
    titleLine2: "– Schwein oder Hähnchen",
    desc: "Knusprig vom Spieß geschnitten, mit hausgemachtem Tzatziki",
    img: photos.gyrosPita.src,
    ctaText: "Jetzt bestellen",
    ctaUrl: "#order",
  },
]
