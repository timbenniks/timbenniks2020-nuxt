export type Tag = {
  tag: string;
};

export type Video = {
  uid: string;
  slug: string;
  title: string;
  image: string;
  // tags: Array<Tag>;
  tags: Tag[];
  day: number;
  month: string;
  year: number;
};

export type Talk = {
  day: number;
  month: string;
  year: number;
  linkToEvent: string;
  title: string;
  location: string;
  subject: string;
};

export type ImageOptions = {
  ratio: string;
  crop: string;
  width: number;
};

export type Writing = {
  uid: string;
  title: string;
  subTitle: string;
  image: string;
  day: number;
  month: string;
  year: number;
};

export type HomeHeroImage = {
  alt: string;
  url: string;
};

export type HomeHero = {
  bannerImage: HomeHeroImage;
  logo: HomeHeroImage;
  title: string;
  subtitle: string;
};
