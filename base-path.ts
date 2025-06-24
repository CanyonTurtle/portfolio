
const isProd = process.env.NODE_ENV === 'production';

export const baseUri = "https://canyonturtle.github.io";
export const basePath = isProd ? '/portfolio' : '';
export const assetPrefix = undefined;

export const baseUrl = `${baseUri}${basePath}`;

export const getImageFullPath = (path: string) => {

  if (process.env.NODE_ENV === 'production') {
    return `${baseUri}${basePath}${path}`;
  }

  return path;
}