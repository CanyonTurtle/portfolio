
const isProd = process.env.NODE_ENV === 'production';

export const basePath = isProd ? '/portfolio' : '';
export const assetPrefix = isProd ? '/portfolio' : '';