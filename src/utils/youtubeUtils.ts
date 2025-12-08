export const getYouTubeID = (url: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export const getYouTubeThumbnail = (id: string, quality: 'maxres' | 'hq' = 'maxres'): string => {
  if (quality === 'maxres') {
    return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  }
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
};