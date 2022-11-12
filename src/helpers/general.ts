export const marvelApiEndpoint = 'https://marvelcdb.com/api/public';

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const snakeCaseToCapitalized = (str: string): string => {
  return str.split('_')
    .map(item => capitalize(item))
    .join(' ');
}