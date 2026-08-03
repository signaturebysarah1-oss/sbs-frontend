export interface HeroCarousel {
  id: string;
  imageUrl: string;
  imagePublicId: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;

  basePrice: number;
  salePrice?: number | null;

  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;

  gender: "male" | "female" | "unisex";
  status: "published" | "draft";
  category: string;
  images: ProductImage[];
  collections: Collection[];
  variants: ProductVariant[];
  materials: Material[];
  colors: Color[];
sizes:number[]
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  imageUrl: string;
  imagePublicId?: string | null;
  altText?: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductVariant {
  id: string;
  sizeLabel: string;
  sizeValue: number;
  sku: string;
  priceAdjustment: number;
  color: Color;
  isAvailable: boolean;
  sortOrder: number;
}

export interface Collection {
  id?: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  imagePublicId: string;
  status: "draft" | "published" | "archived";
  isFeatured: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Material {
  id: string;
  name: string;
  slug: string;
}

export interface Color {
  id: string;
  name: string;
  hexCode: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  imagePublicId?: string;
  category: string;
  sortOrder: number;
  isPublished: boolean;
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface CartItem {
  id: string;
  quantity: number;
  unitPriceSnapshot: number;
  product: Product;
  variant?: ProductVariant;
}

export interface Favorite {
  id: string;
  product: Product;
}

export interface ContactForm {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface QuoteRequest {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  productId?: string;
  quantity?: number;
}

export interface AcademyApplication {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  message?: string;
}

export interface AuthUser {
  id: string;
  authUserId: string;
  email: string;
  fullName: string;
  avatarUrl?: string | null;
  phone?: string | null;
  role: "customer" | "admin" | "super-admin";
  isActive: boolean;
}



export interface QuoteItem {
  productId: string;
  productNameSnapshot: string;

  quantity: number;
  unitPriceSnapshot: number;

  variantLabelSnapshot?: string;
  imageUrlSnapshot?:string
  materialNameSnapshot?: string;
  colorNameSnapshot?: string;

  customMeasurements?: string;

  customNotes?: string;
}

export interface QuoteStorage {
  customerNotes?: string;
  items: QuoteItem[];
}