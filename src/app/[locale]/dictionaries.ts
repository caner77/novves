import "server-only";

const dictionaries = {
  tr: async () => {
    const common = (await import("./dictionaries/tr/common.json")).default;
    const home = (await import("./dictionaries/tr/home.json")).default;
    const solutions = (await import("./dictionaries/tr/solutions.json")).default;
    const products = (await import("./dictionaries/tr/products.json")).default;
    const services = (await import("./dictionaries/tr/services.json")).default;
    const technical = (await import("./dictionaries/tr/technical.json")).default;
    const corporate = (await import("./dictionaries/tr/corporate.json")).default;
    const contact = (await import("./dictionaries/tr/contact.json")).default;
    const sustainability = (await import("./dictionaries/tr/sustainability.json")).default;
    const kvkk = (await import("./dictionaries/tr/kvkk.json")).default;
    return { common, home, solutions, products, services, technical, corporate, contact, sustainability, kvkk };
  },
  en: async () => {
    const common = (await import("./dictionaries/en/common.json")).default;
    const home = (await import("./dictionaries/en/home.json")).default;
    const solutions = (await import("./dictionaries/en/solutions.json")).default;
    const products = (await import("./dictionaries/en/products.json")).default;
    const services = (await import("./dictionaries/en/services.json")).default;
    const technical = (await import("./dictionaries/en/technical.json")).default;
    const corporate = (await import("./dictionaries/en/corporate.json")).default;
    const contact = (await import("./dictionaries/en/contact.json")).default;
    const sustainability = (await import("./dictionaries/en/sustainability.json")).default;
    const kvkk = (await import("./dictionaries/en/kvkk.json")).default;
    return { common, home, solutions, products, services, technical, corporate, contact, sustainability, kvkk };
  },
  ru: async () => {
    const common = (await import("./dictionaries/ru/common.json")).default;
    const home = (await import("./dictionaries/ru/home.json")).default;
    const solutions = (await import("./dictionaries/ru/solutions.json")).default;
    const products = (await import("./dictionaries/ru/products.json")).default;
    const services = (await import("./dictionaries/ru/services.json")).default;
    const technical = (await import("./dictionaries/ru/technical.json")).default;
    const corporate = (await import("./dictionaries/ru/corporate.json")).default;
    const contact = (await import("./dictionaries/ru/contact.json")).default;
    const sustainability = (await import("./dictionaries/ru/sustainability.json")).default;
    const kvkk = (await import("./dictionaries/ru/kvkk.json")).default;
    return { common, home, solutions, products, services, technical, corporate, contact, sustainability, kvkk };
  },
};

export type Locale = keyof typeof dictionaries;

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
