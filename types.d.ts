type Category = {
  id: string;
  name: string;
  categoryFilter: string;
  type: string;
};

type Game = {
  id: string;
  gameText: string;
  betSize: { min: number };
  image: {
    alt: string;
    original: Image;
    small: Image;
    thumbnail: Image;
  };
  liveRtp: string;
  platformId: string;
  provider: string;
  provider_slug: string;
  slug: string;
  type: string;
};

type Image = {
  src: string;
  metadata: any;
};
