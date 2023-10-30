import slugify from 'slugify';

const makeSlug = (str: string): string =>
  slugify(str, { lower: true });

export default makeSlug;
