export const parseMetadataFromUrl = (url: string) => {
  return fetch(`/api/utils/parse?url=${url}`).then((res: Response) => {
    return res.status === 200 ? res.json() : '';
  });
};

export const encodeQueryData = (data: any) => {
  const ret = [];
  for (let d in data) {
    if (data[d]) {
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    }
  }
  return ret.join('&');
};
