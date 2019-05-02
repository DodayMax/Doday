export const parseMetadataFromUrl = (url: string) => {
  return fetch(`/api/utils/parse?url=${url}`).then((res: Response) => {
    return res.status === 200 ? res.json() : '';
  });
};
