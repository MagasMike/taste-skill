export type MenuItem = { name: string; price: number; detail?: string; size?: string }
export type MenuSection = { title: string; note?: string; items: MenuItem[] }

// Mirrors the printed menu card. Prices in euro incl. VAT.
export const menu: MenuSection[] = [
  {
    title: "Pitas",
    note: "Alle Pitas werden mit Pommes, Tomaten, Tzatziki, Zwiebeln, Ketchup und Senf zubereitet.",
    items: [
      { name: "Bifteki", price: 8.2, detail: "Hacksteak aus gemischtem Hackfleisch, gefüllt mit Käse" },
      { name: "Gyros", price: 7.8, detail: "Nach Wahl mit Schweine- oder Hähnchenfleisch" },
      { name: "Souvlaki", price: 7.8, detail: "Nach Wahl mit Schweine- oder Hähnchenspieß" },
      { name: "Panseta", price: 8.2, detail: "Schweinebauch" },
      { name: "Loukaniko", price: 8.2, detail: "Griechische Bauernwurst" },
      { name: "Halloumi", price: 8.2, detail: "Griechischer Grillkäse" },
      { name: "Vegetarisch", price: 6.5, detail: "Zzgl. Fetakäse" },
    ],
  },
  {
    title: "Specials",
    items: [
      { name: "Gyros Box", price: 8.5, detail: "Mit Pommes, Tzatziki und Zwiebeln" },
      {
        name: "Gyros Tower",
        price: 14.5,
        detail: "Schwein oder Hähnchen, 2× Pitabrot, Isimike’s Sauce, Tomaten, Käse und Pommes",
      },
      {
        name: "Gyros Double Tower",
        price: 22.5,
        detail: "Schwein oder Hähnchen, 3× Pitabrot, Isimike’s Sauce, Tomaten, Käse und Pommes",
      },
    ],
  },
  {
    title: "Tellergerichte",
    note: "Alle Tellergerichte werden mit Pommes, Tzatziki, Zwiebeln und Pitabrot zubereitet.",
    items: [
      { name: "Bifteki", price: 18, detail: "2 Hacksteaks aus gemischtem Hackfleisch, gefüllt mit Käse" },
      { name: "Gyros", price: 17, detail: "Nach Wahl mit Schweine- oder Hähnchenfleisch" },
      { name: "Souvlaki", price: 17, detail: "3 Schweine- oder Hähnchenspieße" },
      { name: "Panseta", price: 17, detail: "3 Stück Schweinebauch" },
      { name: "Loukaniko", price: 18, detail: "3 griechische Bauernwürste" },
      { name: "Stückpreis", price: 4.5 },
    ],
  },
  {
    title: "Extras",
    items: [
      { name: "French Fries", price: 4.5 },
      { name: "Ketchup oder Mayo", price: 0.5, detail: "Aufpreis" },
      { name: "Tzatziki oder Fetasauce", price: 1.5, detail: "Aufpreis" },
      { name: "Tzatziki", price: 5.5, detail: "Mit Pitabrot" },
      { name: "Fetasauce", price: 7, detail: "Mit Pitabrot" },
      { name: "Feta natur", price: 6, detail: "Mit Pitabrot" },
      { name: "Oliven aus Kalamata", price: 5.5, detail: "Mit Pitabrot" },
      { name: "Pitabrot", price: 2 },
    ],
  },
  {
    title: "Salate",
    items: [
      {
        name: "Griechischer Bauernsalat",
        price: 14,
        detail: "Tomaten, Gurken, Zwiebeln, Fetakäse, Oliven, Essig & Öl und Pitabrot",
      },
      { name: "Krautsalat", price: 5.5, detail: "Mit Pitabrot" },
    ],
  },
  {
    title: "Getränke",
    items: [
      { name: "Cola, Cola Zero", size: "0,33 l", price: 3 },
      { name: "Mezzo Mix, Fanta, Sprite", size: "0,33 l", price: 3 },
      { name: "Apfelschorle", size: "0,5 l", price: 3.5 },
      { name: "Mythos Bier", size: "0,33 l", price: 4.5 },
      { name: "Zitronen- oder Pfirsichtee", size: "0,5 l", price: 3 },
      { name: "Wasser", size: "0,5 l", price: 2.5 },
      { name: "Malamatina", size: "0,5 l", price: 5 },
      { name: "Tsipouro", size: "0,05 l", price: 3.5 },
    ],
  },
]

const eur = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" })
export const formatPrice = (p: number) => eur.format(p)
