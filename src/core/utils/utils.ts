export function convertToName(value: string): string | undefined {
  if (!value) return;
  const words = value.split('_');
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  );
  return capitalizedWords.join(' ');
}
