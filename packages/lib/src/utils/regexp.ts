export const detectURL = (input: string) => {
  const regexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
  return input.match(regexp);
};

export const detectActivityType = (metadata: any) => {
  const contentType: string = metadata && metadata.type;
  if (contentType) {
    if (contentType.startsWith('video')) {
      return 'watch';
    } else if (
      contentType.startsWith('article') ||
      contentType.startsWith('book') ||
      contentType.startsWith('website')
    ) {
      return 'read';
    }
  }

  return 'do';
};
