import type { CarouselItem } from "@/components/ui/3-d-coverflow-carousel"
import type { WorksWheelItem } from "@/components/ui/works-wheel"

// Photos from Unsplash (Unsplash License), downloaded and cropped into public/photos.
// Wheel photos are 1200×828 to match the wheel's card ratio; carousel photos are 2:3.
const unsplash = (slug: string) => `https://unsplash.com/photos/${slug}`

export const photos = {
  pitaGyrosHand: { src: "photos/pita-gyros-hand.jpg", author: "Bruna Santos", page: unsplash("TlJMk-f73lw") },
  gyrosCloseup: { src: "photos/gyros-closeup.jpg", author: "Nick Nice", page: unsplash("t_MgBtiEZV4") },
  bifteki: { src: "photos/bifteki.jpg", author: "Arne Buss", page: unsplash("7JeWJHeHtWA") },
  grillBoard: { src: "photos/grill-board.jpg", author: "Victoria Shes", page: unsplash("UC0HZdUitWY") },
  bauernsalat: { src: "photos/bauernsalat.jpg", author: "William Wallace", page: unsplash("Dk4RNTHXlAA") },
  tzatziki: { src: "photos/tzatziki.jpg", author: "Arne Buss", page: unsplash("gNWwfcsD4ZQ") },
  pitaPaper: { src: "photos/pita-paper.jpg", author: "Jojo Yuen", page: unsplash("_NRm7Xna_KY") },
  whiteTower: { src: "photos/white-tower.jpg", author: "Merve Sağlam", page: unsplash("s5jAiWZFFQQ") },
  souvlakiCharcoal: { src: "photos/souvlaki-charcoal.jpg", author: "Mihir Sabnis", page: unsplash("FOZbF67e-DE") },
  pitaFries: { src: "photos/pita-fries.jpg", author: "irws", page: unsplash("pUCck5WyUH4") },
  souvlakiPlate: { src: "photos/souvlaki-plate.jpg", author: "Markus Winkler", page: unsplash("WHtVB-RiW2I") },
  aristotelous: { src: "photos/aristotelous.jpg", author: "Ayad Hendy", page: unsplash("6gMvxGRF5dg") },
  gyrosSpit: { src: "photos/gyros-spit.jpg", author: "Syed Hussaini", page: unsplash("SbdKIToYH1c") },
}

export const photoCredits = Object.values(photos)

// The wheel turns through dishes from the menu; every card leads to it.
export const dishes: WorksWheelItem[] = [
  { title: "Pita Gyros", image: photos.pitaGyrosHand.src, href: "#menu" },
  { title: "Souvlaki", image: photos.grillBoard.src, href: "#menu" },
  { title: "Bifteki", image: photos.bifteki.src, href: "#menu" },
  { title: "Gyros", image: photos.gyrosCloseup.src, href: "#menu" },
  { title: "Bauernsalat", image: photos.bauernsalat.src, href: "#menu" },
  { title: "Tzatziki", image: photos.tzatziki.src, href: "#menu" },
]

export const highlights: CarouselItem[] = [
  {
    tag: "#Bestseller",
    titleLine1: "Pita Gyros",
    titleLine2: "– wie in Thessaloniki",
    desc: "Mit Pommes, Tomaten, Tzatziki und Zwiebeln, eingerollt in warme Pita",
    img: photos.pitaPaper.src,
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
    img: photos.souvlakiCharcoal.src,
    ctaText: "Zur Speisekarte",
    ctaUrl: "#menu",
  },
  {
    tag: "#Handgemacht",
    titleLine1: "Pitabrot",
    titleLine2: "– warm von der Platte",
    desc: "Jede Pita wird frisch für Sie gebacken",
    img: photos.pitaFries.src,
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
    img: photos.gyrosSpit.src,
    ctaText: "Jetzt bestellen",
    ctaUrl: "#order",
  },
]
