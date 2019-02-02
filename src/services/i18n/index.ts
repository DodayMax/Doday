import i18n from 'i18next';

i18n.init({
  lng: 'en-US',
  resources: {
    'en': {
      'translation': {
        intro: 'Hello my name is'
      }
    },
    'ru': {
      'translation': {
        intro: 'Привет'
      }
    }
  }
});

export default i18n;