// "use server";

// import { createInstance } from "i18next";
// import { initReactI18next } from "react-i18next/initReactI18next";
// import { getOptions } from "./settings";

// import enCommon from "./locales/en/common.json";
// import ukCommon from "./locales/uk/common.json";

// const resources = {
//   en: {
//     common: enCommon,
//   },
//   uk: {
//     common: ukCommon,
//   },
// };

// async function initI18next(lng: string, ns: string) {
//   const i18nInstance = createInstance();
//   await i18nInstance.use(initReactI18next).init({
//     ...getOptions(lng, ns),
//     resources,
//     interpolation: {
//       escapeValue: false,
//     },
//   });
//   return i18nInstance;
// }

// export async function getTranslation(
//   lng: string,
//   ns: string = "common",
//   options: { keyPrefix?: string } = {},
// ) {
//   const i18nextInstance = await initI18next(lng, ns);
//   return {
//     t: i18nextInstance.getFixedT(
//       lng,
//       Array.isArray(ns) ? ns[0] : ns,
//       options.keyPrefix,
//     ),
//     i18n: i18nextInstance,
//   };
// }
