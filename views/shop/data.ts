// import { Product } from "@/types/website";

// export const ALL_PRODUCTS: Product[] = [
//   {
//     id: "1",
//     name: "The Abuja Loafer",
//     slug: "the-abuja-loafer",
//     description:
//       "A timeless handcrafted loafer made from premium full-grain leather, designed for elegance and everyday comfort.",
//     shortDescription: "Luxury handcrafted leather loafer.",
//     basePrice: 185000,
//     salePrice: null,
//     isFeatured: true,
//     isNewArrival: true,
//     isBestSeller: true,
//     gender: "male",
//     status: "published",
//     category: "Shoes",

//     images: [
//       {
//         id: "1-img-1",
//         imageUrl:
// "https://images.unsplash.com/photo-1591884807537-0bce39888fe0?w=600&h=800&fit=crop&auto=format"    ,    imagePublicId: null,
//         altText: "Front View",
//         isPrimary: true,
//         sortOrder: 1,
//       },
//       {
//         id: "1-img-2",
//         imageUrl:
//           "https://images.unsplash.com/photo-1570800493677-12a7ad3d4d86?w=700&h=900&fit=crop&auto=format",

//         imagePublicId: null,
//         altText: "Side View",
//         isPrimary: false,
//         sortOrder: 2,
//       },
//     ],

//     collections: [
//       {
//         id: "c1",
//         name: "Executive Collection",
//         slug: "executive-collection",
//         description: "Luxury executive footwear.",
//         imageUrl: "",
//         status: "published",
//         sortOrder: 1,
//         productCount: 12,
//       },
//     ],

//     materials: [
//       {
//         id: "m1",
//         name: "Full Grain Leather",
//         slug: "full-grain-leather",
//       },
//     ],

//     colors: [
//       { id: "clr1", name: "Black", hexCode: "#111111" },
//       { id: "clr2", name: "Brown", hexCode: "#6B4423" },
//     ],

//     variants: [
//       {
//         id: "1-v1",
//         sizeLabel: "40",
//         sizeValue: 40,
//         sku: "ABL-BLK-40",
//         priceAdjustment: 0,
//         color: { id: "clr1", name: "Black", hexCode: "#111111" },
//         isAvailable: true,
//         sortOrder: 1,
//       },
//       {
//         id: "1-v2",
//         sizeLabel: "41",
//         sizeValue: 41,
//         sku: "ABL-BLK-41",
//         priceAdjustment: 0,
//         color: { id: "clr1", name: "Black", hexCode: "#111111" },
//         isAvailable: true,
//         sortOrder: 2,
//       },
//       {
//         id: "1-v3",
//         sizeLabel: "42",
//         sizeValue: 42,
//         sku: "ABL-BRN-42",
//         priceAdjustment: 0,
//         color: { id: "clr2", name: "Brown", hexCode: "#6B4423" },
//         isAvailable: true,
//         sortOrder: 3,
//       },
//     ],

//     createdAt: "2026-01-01T00:00:00.000Z",
//     updatedAt: "2026-01-01T00:00:00.000Z",
//   },

//   {
//     id: "2",
//     name: "Eko Chelsea Boot",
//     slug: "eko-chelsea-boot",
//     description:
//       "Premium Chelsea boots handcrafted with soft leather and durable soles.",
//     shortDescription: "Classic Chelsea boot.",
//     basePrice: 245000,
//     salePrice: null,
//     isFeatured: true,
//     isNewArrival: false,
//     isBestSeller: true,
//     gender: "male",
//     status: "published",
//     category: "Shoes",

//     images: [
//       {
//         id: "2-img-1",
//         imageUrl:
//           "https://images.unsplash.com/photo-1641893843833-a006778dc00b?w=700&h=900&fit=crop&auto=format",

//         imagePublicId: null,
//         altText: "Chelsea Boot",
//         isPrimary: true,
//         sortOrder: 1,
//       },
//       {
//         id: "2-img-2",
//         imageUrl:
//           "https://images.unsplash.com/photo-1653868250624-21d56ad36602?w=800&h=1000&fit=crop&auto=format",

//         imagePublicId: null,
//         altText: "Chelsea Boot Side",
//         isPrimary: false,
//         sortOrder: 2,
//       },
//     ],

//     collections: [
//       {
//         id: "c2",
//         name: "Signature Collection",
//         slug: "signature-collection",
//         description: "Signature premium designs.",
//         imageUrl: null,
//         status: "published",
//         sortOrder: 2,
//         productCount: 8,
//       },
//     ],

//     materials: [
//       {
//         id: "m2",
//         name: "Premium Nubuck",
//         slug: "premium-nubuck",
//       },
//     ],

//     colors: [
//       { id: "clr3", name: "Chestnut", hexCode: "#8B4513" },
//       { id: "clr1", name: "Black", hexCode: "#111111" },
//     ],

//     variants: [
//       {
//         id: "2-v1",
//         sizeLabel: "41",
//         sizeValue: 41,
//         sku: "ECB-CH-41",
//         priceAdjustment: 0,
//         color: { id: "clr3", name: "Chestnut", hexCode: "#8B4513" },
//         isAvailable: true,
//         sortOrder: 1,
//       },
//       {
//         id: "2-v2",
//         sizeLabel: "42",
//         sizeValue: 42,
//         sku: "ECB-BLK-42",
//         priceAdjustment: 0,
//         color: { id: "clr1", name: "Black", hexCode: "#111111" },
//         isAvailable: true,
//         sortOrder: 2,
//       },
//     ],

//     createdAt: "2026-01-01T00:00:00.000Z",
//     updatedAt: "2026-01-01T00:00:00.000Z",
//   },

//   {
//     id: "3",
//     name: "Victoria Tote",
//     slug: "victoria-tote",
//     description:
//       "A spacious leather tote designed for work, travel and everyday luxury.",
//     shortDescription: "Elegant leather tote bag.",
//     basePrice: 165000,
//     salePrice: null,
//     isFeatured: true,
//     isNewArrival: true,
//     isBestSeller: false,
//     gender: "female",
//     status: "published",
//     category: "Bags",

//     images: [
//       {
//         id: "3-img-1",
//         imageUrl:
//           "https://images.unsplash.com/photo-1563433337461-5b65f0834f3a?w=800&h=1000&fit=crop&auto=format",

//         imagePublicId: null,
//         altText: "Victoria Tote",
//         isPrimary: true,
//         sortOrder: 1,
//       },
//       {
//         id: "3-img-2",
//         imageUrl:
//           "https://images.unsplash.com/photo-1653868250624-21d56ad36602?w=800&h=1000&fit=crop&auto=format",

//         imagePublicId: null,
//         altText: "Victoria Tote Open",
//         isPrimary: false,
//         sortOrder: 2,
//       },
//     ],

//     collections: [
//       {
//         id: "c3",
//         name: "Women's Collection",
//         slug: "womens-collection",
//         description: "Luxury handbags and accessories.",
//         imageUrl: null,
//         status: "published",
//         sortOrder: 3,
//         productCount: 10,
//       },
//     ],

//     materials: [
//       {
//         id: "m3",
//         name: "Top Grain Leather",
//         slug: "top-grain-leather",
//       },
//     ],

//     colors: [
//       { id: "clr4", name: "Tan", hexCode: "#C19A6B" },
//       { id: "clr5", name: "Wine", hexCode: "#6D071A" },
//     ],

//     variants: [
//       {
//         id: "3-v1",
//         sizeLabel: "Standard",
//         sizeValue: 1,
//         sku: "VT-TAN",
//         priceAdjustment: 0,
//         color: { id: "clr4", name: "Tan", hexCode: "#C19A6B" },
//         isAvailable: true,
//         sortOrder: 1,
//       },
//       {
//         id: "3-v2",
//         sizeLabel: "Standard",
//         sizeValue: 1,
//         sku: "VT-WINE",
//         priceAdjustment: 5000,
//         color: { id: "clr5", name: "Wine", hexCode: "#6D071A" },
//         isAvailable: true,
//         sortOrder: 2,
//       },
//     ],

//     createdAt: "2026-01-01T00:00:00.000Z",
//     updatedAt: "2026-01-01T00:00:00.000Z",
//   },

//   {
//     id: "4",
//     name: "Classic Leather Belt",
//     slug: "classic-leather-belt",
//     description: "Minimal handcrafted leather belt with brushed metal buckle.",
//     shortDescription: "Premium leather belt.",
//     basePrice: 45000,
//     salePrice: null,
//     isFeatured: false,
//     isNewArrival: true,
//     isBestSeller: true,
//     gender: "unisex",
//     status: "published",
//     category: "Belts",

//     images: [
//       {
//         id: "4-img-1",
//         imageUrl:
//           "https://images.unsplash.com/photo-1570800493677-12a7ad3d4d86?w=700&h=900&fit=crop&auto=format",

//         imagePublicId: null,
//         altText: "Leather Belt",
//         isPrimary: true,
//         sortOrder: 1,
//       },
//     ],

//     collections: [
//       {
//         id: "c4",
//         name: "Accessories",
//         slug: "accessories",
//         description: "Luxury leather accessories.",
//         imageUrl: null,
//         status: "published",
//         sortOrder: 4,
//         productCount: 6,
//       },
//     ],

//     materials: [
//       {
//         id: "m1",
//         name: "Full Grain Leather",
//         slug: "full-grain-leather",
//       },
//     ],

//     colors: [
//       { id: "clr1", name: "Black", hexCode: "#111111" },
//       { id: "clr2", name: "Brown", hexCode: "#6B4423" },
//     ],

//     variants: [
//       {
//         id: "4-v1",
//         sizeLabel: "32",
//         sizeValue: 32,
//         sku: "BELT-32",
//         priceAdjustment: 0,
//         color: { id: "clr1", name: "Black", hexCode: "#111111" },
//         isAvailable: true,
//         sortOrder: 1,
//       },
//       {
//         id: "4-v2",
//         sizeLabel: "34",
//         sizeValue: 34,
//         sku: "BELT-34",
//         priceAdjustment: 0,
//         color: { id: "clr2", name: "Brown", hexCode: "#6B4423" },
//         isAvailable: true,
//         sortOrder: 2,
//       },
//     ],

//     createdAt: "2026-01-01T00:00:00.000Z",
//     updatedAt: "2026-01-01T00:00:00.000Z",
//   },

//   {
//     id: "5",
//     name: "Executive Bifold Wallet",
//     slug: "executive-bifold-wallet",
//     description:
//       "Slim handcrafted wallet with multiple card slots and premium leather finish.",
//     shortDescription: "Luxury bifold wallet.",
//     basePrice: 55000,
//     salePrice: null,
//     isFeatured: true,
//     isNewArrival: false,
//     isBestSeller: true,
//     gender: "unisex",
//     status: "published",
//     category: "Wallets",

//     images: [
//       {
//         id: "5-img-1",
//         imageUrl:
//           "https://images.unsplash.com/photo-1711356240240-2516c04b3585?w=900&h=1100&fit=crop&auto=format",

//         imagePublicId: null,
//         altText: "Wallet",
//         isPrimary: true,
//         sortOrder: 1,
//       },
//     ],

//     collections: [
//       {
//         id: "c4",
//         name: "Accessories",
//         slug: "accessories",
//         description: "Luxury leather accessories.",
//         imageUrl: null,
//         status: "published",
//         sortOrder: 4,
//         productCount: 6,
//       },
//     ],

//     materials: [
//       {
//         id: "m1",
//         name: "Full Grain Leather",
//         slug: "full-grain-leather",
//       },
//     ],

//     colors: [
//       { id: "clr1", name: "Black", hexCode: "#111111" },
//       { id: "clr5", name: "Wine", hexCode: "#6D071A" },
//     ],

//     variants: [
//       {
//         id: "5-v1",
//         sizeLabel: "Standard",
//         sizeValue: 1,
//         sku: "BW-BLK",
//         priceAdjustment: 0,
//         color: { id: "clr1", name: "Black", hexCode: "#111111" },
//         isAvailable: true,
//         sortOrder: 1,
//       },
//       {
//         id: "5-v2",
//         sizeLabel: "Standard",
//         sizeValue: 1,
//         sku: "BW-WINE",
//         priceAdjustment: 0,
//         color: { id: "clr5", name: "Wine", hexCode: "#6D071A" },
//         isAvailable: true,
//         sortOrder: 2,
//       },
//     ],

//     createdAt: "2026-01-01T00:00:00.000Z",
//     updatedAt: "2026-01-01T00:00:00.000Z",
//   },
//   {
//     id: "6",
//     name: "Lagos Oxford",
//     slug: "lagos-oxford",
//     description:
//       "A refined Oxford shoe handcrafted from premium calf leather for business and formal occasions.",
//     shortDescription: "Classic handcrafted Oxford.",
//     basePrice: 215000,
//     salePrice: null,
//     isFeatured: true,
//     isNewArrival: false,
//     isBestSeller: true,
//     gender: "male",
//     status: "published",
//     category: "Shoes",

//     images: [
//       {
//         id: "6-img-1",
//         imageUrl:
//           "https://images.unsplash.com/photo-1711356240240-2516c04b3585?w=900&h=1100&fit=crop&auto=format",

//         imagePublicId: null,
//         altText: "Lagos Oxford",
//         isPrimary: true,
//         sortOrder: 1,
//       },
//       {
//         id: "6-img-2",
//         imageUrl:
//           "https://images.unsplash.com/photo-1563433337461-5b65f0834f3a?w=800&h=1000&fit=crop&auto=format",

//         imagePublicId: null,
//         altText: "Lagos Oxford Side",
//         isPrimary: false,
//         sortOrder: 2,
//       },
//     ],

//     collections: [
//       {
//         id: "c1",
//         name: "Executive Collection",
//         slug: "executive-collection",
//         description: "Luxury executive footwear.",
//         imageUrl: null,
//         status: "published",
//         sortOrder: 1,
//         productCount: 12,
//       },
//     ],

//     materials: [
//       {
//         id: "m1",
//         name: "Full Grain Leather",
//         slug: "full-grain-leather",
//       },
//     ],

//     colors: [
//       { id: "clr1", name: "Black", hexCode: "#111111" },
//       { id: "clr2", name: "Brown", hexCode: "#6B4423" },
//     ],

//     variants: [
//       {
//         id: "6-v1",
//         sizeLabel: "40",
//         sizeValue: 40,
//         sku: "LO-BLK-40",
//         priceAdjustment: 0,
//         color: { id: "clr1", name: "Black", hexCode: "#111111" },
//         isAvailable: true,
//         sortOrder: 1,
//       },
//       {
//         id: "6-v2",
//         sizeLabel: "42",
//         sizeValue: 42,
//         sku: "LO-BRN-42",
//         priceAdjustment: 0,
//         color: { id: "clr2", name: "Brown", hexCode: "#6B4423" },
//         isAvailable: true,
//         sortOrder: 2,
//       },
//     ],

//     createdAt: "2026-01-01T00:00:00.000Z",
//     updatedAt: "2026-01-01T00:00:00.000Z",
//   },

//   {
//     id: "7",
//     name: "Ikoyi Derby",
//     slug: "ikoyi-derby",
//     description:
//       "Elegant Derby shoe finished by hand for a polished, sophisticated appearance.",
//     shortDescription: "Premium Derby shoe.",
//     basePrice: 198000,
//     salePrice: 180000,
//     isFeatured: false,
//     isNewArrival: true,
//     isBestSeller: false,
//     gender: "male",
//     status: "published",
//     category: "Shoes",

//     images: [
//       {
//         id: "7-img-1",
//         imageUrl:
//           "https://images.unsplash.com/photo-1641893843833-a006778dc00b?w=700&h=900&fit=crop&auto=format",

//         imagePublicId: null,
//         altText: "Ikoyi Derby",
//         isPrimary: true,
//         sortOrder: 1,
//       },
//     ],

//     collections: [
//       {
//         id: "c2",
//         name: "Signature Collection",
//         slug: "signature-collection",
//         description: "Signature premium designs.",
//         imageUrl: null,
//         status: "published",
//         sortOrder: 2,
//         productCount: 8,
//       },
//     ],

//     materials: [
//       {
//         id: "m1",
//         name: "Full Grain Leather",
//         slug: "full-grain-leather",
//       },
//     ],

//     colors: [{ id: "clr6", name: "Cognac", hexCode: "#9A5B2D" }],

//     variants: [
//       {
//         id: "7-v1",
//         sizeLabel: "41",
//         sizeValue: 41,
//         sku: "ID-COG-41",
//         priceAdjustment: 0,
//         color: { id: "clr6", name: "Cognac", hexCode: "#9A5B2D" },
//         isAvailable: true,
//         sortOrder: 1,
//       },
//     ],

//     createdAt: "2026-01-01T00:00:00.000Z",
//     updatedAt: "2026-01-01T00:00:00.000Z",
//   },

//   {
//     id: "8",
//     name: "Heritage Monk Strap",
//     slug: "heritage-monk-strap",
//     description:
//       "A luxurious double monk strap shoe designed for formal elegance.",
//     shortDescription: "Luxury monk strap shoe.",
//     basePrice: 235000,
//     salePrice: null,
//     isFeatured: true,
//     isNewArrival: true,
//     isBestSeller: false,
//     gender: "male",
//     status: "published",
//     category: "Shoes",

//     images: [
//       {
//         id: "8-img-1",
//         imageUrl:
//           "https://images.unsplash.com/photo-1711356240240-2516c04b3585?w=900&h=1100&fit=crop&auto=format",

//         imagePublicId: null,
//         altText: "Monk Strap",
//         isPrimary: true,
//         sortOrder: 1,
//       },
//     ],

//     collections: [
//       {
//         id: "c1",
//         name: "Executive Collection",
//         slug: "executive-collection",
//         description: "Luxury executive footwear.",
//         imageUrl: null,
//         status: "published",
//         sortOrder: 1,
//         productCount: 12,
//       },
//     ],

//     materials: [
//       {
//         id: "m1",
//         name: "Full Grain Leather",
//         slug: "full-grain-leather",
//       },
//     ],

//     colors: [{ id: "clr2", name: "Brown", hexCode: "#6B4423" }],

//     variants: [
//       {
//         id: "8-v1",
//         sizeLabel: "42",
//         sizeValue: 42,
//         sku: "HM-BRN-42",
//         priceAdjustment: 0,
//         color: { id: "clr2", name: "Brown", hexCode: "#6B4423" },
//         isAvailable: true,
//         sortOrder: 1,
//       },
//     ],

//     createdAt: "2026-01-01T00:00:00.000Z",
//     updatedAt: "2026-01-01T00:00:00.000Z",
//   },

//   {
//     id: "9",
//     name: "Weekend Duffel",
//     slug: "weekend-duffel",
//     description:
//       "Large handcrafted leather duffel perfect for business trips and weekend travel.",
//     shortDescription: "Luxury travel duffel.",
//     basePrice: 295000,
//     salePrice: null,
//     isFeatured: true,
//     isNewArrival: false,
//     isBestSeller: true,
//     gender: "unisex",
//     status: "published",
//     category: "Bags",

//     images: [
//       {
//         id: "9-img-1",
//         imageUrl:
//           "https://images.unsplash.com/photo-1570800493677-12a7ad3d4d86?w=700&h=900&fit=crop&auto=format",

//         imagePublicId: null,
//         altText: "Duffel Bag",
//         isPrimary: true,
//         sortOrder: 1,
//       },
//     ],

//     collections: [
//       {
//         id: "c5",
//         name: "Travel Collection",
//         slug: "travel-collection",
//         description: "Premium travel essentials.",
//         imageUrl: null,
//         status: "published",
//         sortOrder: 5,
//         productCount: 5,
//       },
//     ],

//     materials: [
//       {
//         id: "m3",
//         name: "Top Grain Leather",
//         slug: "top-grain-leather",
//       },
//     ],

//     colors: [{ id: "clr2", name: "Brown", hexCode: "#6B4423" }],

//     variants: [
//       {
//         id: "9-v1",
//         sizeLabel: "Standard",
//         sizeValue: 1,
//         sku: "WD-BRN",
//         priceAdjustment: 0,
//         color: { id: "clr2", name: "Brown", hexCode: "#6B4423" },
//         isAvailable: true,
//         sortOrder: 1,
//       },
//     ],

//     createdAt: "2026-01-01T00:00:00.000Z",
//     updatedAt: "2026-01-01T00:00:00.000Z",
//   },

//   {
//     id: "10",
//     name: "Slim Card Holder",
//     slug: "slim-card-holder",
//     description:
//       "A minimalist leather card holder with handcrafted stitching and RFID protection.",
//     shortDescription: "Premium card holder.",
//     basePrice: 35000,
//     salePrice: null,
//     isFeatured: false,
//     isNewArrival: true,
//     isBestSeller: true,
//     gender: "unisex",
//     status: "published",
//     category: "Accessories",

//     images: [
//       {
//         id: "10-img-1",
//         imageUrl:
//           "https://images.unsplash.com/photo-1641893843833-a006778dc00b?w=700&h=900&fit=crop&auto=format",

//         imagePublicId: null,
//         altText: "Card Holder",
//         isPrimary: true,
//         sortOrder: 1,
//       },
//     ],

//     collections: [
//       {
//         id: "c4",
//         name: "Accessories",
//         slug: "accessories",
//         description: "Luxury leather accessories.",
//         imageUrl: null,
//         status: "published",
//         sortOrder: 4,
//         productCount: 6,
//       },
//     ],

//     materials: [
//       {
//         id: "m1",
//         name: "Full Grain Leather",
//         slug: "full-grain-leather",
//       },
//     ],

//     colors: [
//       { id: "clr1", name: "Black", hexCode: "#111111" },
//       { id: "clr5", name: "Wine", hexCode: "#6D071A" },
//     ],

//     variants: [
//       {
//         id: "10-v1",
//         sizeLabel: "Standard",
//         sizeValue: 1,
//         sku: "SCH-BLK",
//         priceAdjustment: 0,
//         color: { id: "clr1", name: "Black", hexCode: "#111111" },
//         isAvailable: true,
//         sortOrder: 1,
//       },
//       {
//         id: "10-v2",
//         sizeLabel: "Standard",
//         sizeValue: 1,
//         sku: "SCH-WINE",
//         priceAdjustment: 0,
//         color: { id: "clr5", name: "Wine", hexCode: "#6D071A" },
//         isAvailable: true,
//         sortOrder: 2,
//       },
//     ],

//     createdAt: "2026-01-01T00:00:00.000Z",
//     updatedAt: "2026-01-01T00:00:00.000Z",
//   },
//   {
//     id: "11",
//     name: "Victoria Heels",
//     slug: "victoria-heels",
//     description:
//       "Elegant handcrafted leather heels designed for modern women seeking comfort and sophistication.",
//     shortDescription: "Luxury women's leather heels.",
//     basePrice: 185000,
//     salePrice: null,
//     isFeatured: true,
//     isNewArrival: true,
//     isBestSeller: false,
//     gender: "female",
//     status: "published",
//     category: "Shoes",

//     images: [
//       {
//         id: "11-img-1",
//         imageUrl:
//           "https://images.unsplash.com/photo-1563433337461-5b65f0834f3a?w=800&h=1000&fit=crop&auto=format",

//         imagePublicId: null,
//         altText: "Victoria Heels",
//         isPrimary: true,
//         sortOrder: 1,
//       },
//     ],

//     collections: [
//       {
//         id: "c3",
//         name: "Women's Collection",
//         slug: "womens-collection",
//         description: "Luxury women's footwear.",
//         imageUrl: null,
//         status: "published",
//         sortOrder: 3,
//         productCount: 10,
//       },
//     ],

//     materials: [
//       {
//         id: "m3",
//         name: "Top Grain Leather",
//         slug: "top-grain-leather",
//       },
//     ],

//     colors: [
//       { id: "clr7", name: "Cream", hexCode: "#F6F2EB" },
//       { id: "clr1", name: "Black", hexCode: "#111111" },
//     ],

//     variants: [
//       {
//         id: "11-v1",
//         sizeLabel: "38",
//         sizeValue: 38,
//         sku: "VH-CRM-38",
//         priceAdjustment: 0,
//         color: { id: "clr7", name: "Cream", hexCode: "#F6F2EB" },
//         isAvailable: true,
//         sortOrder: 1,
//       },
//       {
//         id: "11-v2",
//         sizeLabel: "39",
//         sizeValue: 39,
//         sku: "VH-BLK-39",
//         priceAdjustment: 0,
//         color: { id: "clr1", name: "Black", hexCode: "#111111" },
//         isAvailable: true,
//         sortOrder: 2,
//       },
//     ],

//     createdAt: "2026-01-01T00:00:00.000Z",
//     updatedAt: "2026-01-01T00:00:00.000Z",
//   },

//   {
//     id: "12",
//     name: "Urban Backpack",
//     slug: "urban-backpack",
//     description:
//       "Premium handcrafted backpack suitable for work, school and travel.",
//     shortDescription: "Luxury leather backpack.",
//     basePrice: 245000,
//     salePrice: null,
//     isFeatured: false,
//     isNewArrival: true,
//     isBestSeller: true,
//     gender: "unisex",
//     status: "published",
//     category: "Bags",

//     images: [
//       {
//         id: "12-img-1",
//         imageUrl:
//           "https://images.unsplash.com/photo-1641893843833-a006778dc00b?w=700&h=900&fit=crop&auto=format",

//         imagePublicId: null,
//         altText: "Urban Backpack",
//         isPrimary: true,
//         sortOrder: 1,
//       },
//     ],

//     collections: [
//       {
//         id: "c5",
//         name: "Travel Collection",
//         slug: "travel-collection",
//         description: "Luxury travel essentials.",
//         imageUrl: null,
//         status: "published",
//         sortOrder: 5,
//         productCount: 5,
//       },
//     ],

//     materials: [
//       {
//         id: "m3",
//         name: "Top Grain Leather",
//         slug: "top-grain-leather",
//       },
//     ],

//     colors: [{ id: "clr2", name: "Brown", hexCode: "#6B4423" }],

//     variants: [
//       {
//         id: "12-v1",
//         sizeLabel: "Standard",
//         sizeValue: 1,
//         sku: "UB-BRN",
//         priceAdjustment: 0,
//         color: { id: "clr2", name: "Brown", hexCode: "#6B4423" },
//         isAvailable: true,
//         sortOrder: 1,
//       },
//     ],

//     createdAt: "2026-01-01T00:00:00.000Z",
//     updatedAt: "2026-01-01T00:00:00.000Z",
//   },

//   {
//     id: "13",
//     name: "Signature Sandals",
//     slug: "signature-sandals",
//     description:
//       "Minimal handcrafted leather sandals with exceptional comfort and durability.",
//     shortDescription: "Premium leather sandals.",
//     basePrice: 85000,
//     salePrice: 75000,
//     isFeatured: false,
//     isNewArrival: false,
//     isBestSeller: true,
//     gender: "unisex",
//     status: "published",
//     category: "Shoes",

//     images: [
//       {
//         id: "13-img-1",
//         imageUrl:
//           "https://images.unsplash.com/photo-1563433337461-5b65f0834f3a?w=800&h=1000&fit=crop&auto=format",

//         imagePublicId: null,
//         altText: "Signature Sandals",
//         isPrimary: true,
//         sortOrder: 1,
//       },
//     ],

//     collections: [
//       {
//         id: "c2",
//         name: "Signature Collection",
//         slug: "signature-collection",
//         description: "Signature premium designs.",
//         imageUrl: null,
//         status: "published",
//         sortOrder: 2,
//         productCount: 8,
//       },
//     ],

//     materials: [
//       {
//         id: "m1",
//         name: "Full Grain Leather",
//         slug: "full-grain-leather",
//       },
//     ],

//     colors: [{ id: "clr6", name: "Cognac", hexCode: "#9A5B2D" }],

//     variants: [
//       {
//         id: "13-v1",
//         sizeLabel: "42",
//         sizeValue: 42,
//         sku: "SS-42",
//         priceAdjustment: 0,
//         color: { id: "clr6", name: "Cognac", hexCode: "#9A5B2D" },
//         isAvailable: true,
//         sortOrder: 1,
//       },
//     ],

//     createdAt: "2026-01-01T00:00:00.000Z",
//     updatedAt: "2026-01-01T00:00:00.000Z",
//   },

//   {
//     id: "14",
//     name: "Classic Passport Holder",
//     slug: "classic-passport-holder",
//     description:
//       "Luxury passport holder handcrafted from premium leather with multiple compartments.",
//     shortDescription: "Leather passport holder.",
//     basePrice: 48000,
//     salePrice: null,
//     isFeatured: false,
//     isNewArrival: true,
//     isBestSeller: false,
//     gender: "unisex",
//     status: "published",
//     category: "Accessories",

//     images: [
//       {
//         id: "14-img-1",
//         imageUrl:
//           "https://images.unsplash.com/photo-1711356240240-2516c04b3585?w=900&h=1100&fit=crop&auto=format",

//         imagePublicId: null,
//         altText: "Passport Holder",
//         isPrimary: true,
//         sortOrder: 1,
//       },
//     ],

//     collections: [
//       {
//         id: "c4",
//         name: "Accessories",
//         slug: "accessories",
//         description: "Luxury leather accessories.",
//         imageUrl: null,
//         status: "published",
//         sortOrder: 4,
//         productCount: 6,
//       },
//     ],

//     materials: [
//       {
//         id: "m1",
//         name: "Full Grain Leather",
//         slug: "full-grain-leather",
//       },
//     ],

//     colors: [{ id: "clr1", name: "Black", hexCode: "#111111" }],

//     variants: [
//       {
//         id: "14-v1",
//         sizeLabel: "Standard",
//         sizeValue: 1,
//         sku: "PH-BLK",
//         priceAdjustment: 0,
//         color: { id: "clr1", name: "Black", hexCode: "#111111" },
//         isAvailable: true,
//         sortOrder: 1,
//       },
//     ],

//     createdAt: "2026-01-01T00:00:00.000Z",
//     updatedAt: "2026-01-01T00:00:00.000Z",
//   },

//   {
//     id: "15",
//     name: "Executive Briefcase",
//     slug: "executive-briefcase",
//     description:
//       "A sophisticated leather briefcase handcrafted for professionals who appreciate timeless luxury.",
//     shortDescription: "Premium leather briefcase.",
//     basePrice: 315000,
//     salePrice: null,
//     isFeatured: true,
//     isNewArrival: false,
//     isBestSeller: true,
//     gender: "unisex",
//     status: "published",
//     category: "Bags",

//     images: [
//       {
//         id: "15-img-1",
//         imageUrl:
//           "https://images.unsplash.com/photo-1653868250624-21d56ad36602?w=800&h=1000&fit=crop&auto=format",

//         imagePublicId: null,
//         altText: "Executive Briefcase",
//         isPrimary: true,
//         sortOrder: 1,
//       },
//     ],

//     collections: [
//       {
//         id: "c1",
//         name: "Executive Collection",
//         slug: "executive-collection",
//         description: "Luxury executive essentials.",
//         imageUrl: null,
//         status: "published",
//         sortOrder: 1,
//         productCount: 12,
//       },
//     ],

//     materials: [
//       {
//         id: "m3",
//         name: "Top Grain Leather",
//         slug: "top-grain-leather",
//       },
//     ],

//     colors: [
//       { id: "clr2", name: "Brown", hexCode: "#6B4423" },
//       { id: "clr1", name: "Black", hexCode: "#111111" },
//     ],

//     variants: [
//       {
//         id: "15-v1",
//         sizeLabel: "Standard",
//         sizeValue: 1,
//         sku: "EB-BRN",
//         priceAdjustment: 0,
//         color: { id: "clr2", name: "Brown", hexCode: "#6B4423" },
//         isAvailable: true,
//         sortOrder: 1,
//       },
//       {
//         id: "15-v2",
//         sizeLabel: "Standard",
//         sizeValue: 1,
//         sku: "EB-BLK",
//         priceAdjustment: 0,
//         color: { id: "clr1", name: "Black", hexCode: "#111111" },
//         isAvailable: true,
//         sortOrder: 2,
//       },
//     ],

//     createdAt: "2026-01-01T00:00:00.000Z",
//     updatedAt: "2026-01-01T00:00:00.000Z",
//   },
// ];
