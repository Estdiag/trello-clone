export const removeAllSpaces = (text: string) => {
  if (text) return text.trim().replace(/\s+/g, '');
  return '';
};
