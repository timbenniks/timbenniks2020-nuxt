export type Tag = {
  tag: string;
};

export type Video = {
  uid: string;
  slug: string;
  title: string;
  image: string;
  tags: Array<Tag>;
  day: number;
  month: string;
  year: number;
}


