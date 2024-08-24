import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  de: {
    translation: {
      next: 'Weiter',
      back: 'Zurück',
      address: 'Adresse',
      roofType: 'Dachtyp',
      consumption: 'Verbrauch',
      kWh: 'kWh',
      selectRoofType: 'Wählen Sie Ihren Dachtyp',
      analyzingRoof: 'Dach wird analysiert...',
      enterConsumption: 'Geben Sie Ihren jährlichen Stromverbrauch ein',
      recommendation: 'Produktempfehlung',
      // Add more translations as needed
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'de',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;