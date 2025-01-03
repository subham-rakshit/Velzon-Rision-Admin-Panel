const imageTypeOptions = [
  { id: "image-type-1", name: "Profile Picture", value: "profile-pictures" },
  { id: "image-type-2", name: "Blog Article", value: "blog-article" },
  { id: "image-type-3", name: "Web Banner", value: "web-banner" },
  {
    id: "image-type-4",
    name: "E-Commerce Product Image",
    value: "ecommerce-product-image",
  },
  { id: "image-type-5", name: "General Web Use", value: "general-web-use" },
  { id: "image-type-6", name: "Meta Image", value: "meta-image" },
];

const imageTypeConfig = {
  "profile-pictures": {
    minWidthOptions: [300],
    minHeightOptions: [300],
  },
  "meta-image": {
    minWidthOptions: [200],
    minHeightOptions: [200],
  },
  thumbnails: {
    minWidthOptions: [150, 200, 250, 300],
    minHeightOptions: [150, 200, 250, 300],
  },
  "blog-article": {
    minWidthOptions: [
      800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350,
    ],
    minHeightOptions: [600, 650, 700, 750, 800, 850, 900],
  },
  "web-banner": {
    minWidthOptions: [
      1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750,
      1800, 1850, 1900, 1950,
    ],
    minHeightOptions: [
      600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100,
    ],
  },
  "ecommerce-product-image": {
    minWidthOptions: [800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200],
    minHeightOptions: [800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200],
  },
  "general-web-use": {
    minWidthOptions: [
      600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200,
    ],
    minHeightOptions: [
      600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200,
    ],
  },
};

export { imageTypeConfig, imageTypeOptions };
