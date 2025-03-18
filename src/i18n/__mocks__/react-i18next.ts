/* eslint-disable @typescript-eslint/no-explicit-any */
import en from '../locales/en';

const useTranslation = () => {
  return {
    t: (key: string, params?: Record<string, any>) => {
      // Split the key by dots to traverse the translations object
      const keys = key.split('.');
      let value = keys.reduce((obj, key) => obj?.[key], en as any);

      // If the value is not found, return the key
      if (!value) return key;

      // If there are interpolation params, replace them
      if (params) {
        Object.entries(params).forEach(([param, replacement]) => {
          // If replacement is a React element, just use a placeholder
          const replaceValue = typeof replacement === 'object' ? `{{${param}}}` : replacement;
          value = value.replace(`{{${param}}}`, replaceValue);
        });
      }

      return value;
    },
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  };
};

module.exports = {
  useTranslation,
};
