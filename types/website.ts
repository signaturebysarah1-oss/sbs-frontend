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
  images?:string[];
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


export interface CustomMeasurements {
  footLength?: string;
  footWidth?: string;
  extra?: {
    label: string;
    value: string;
  }[];
}

export interface QuoteItem {
  productId: string;
  id:string;
  selectedColor?:string;
  selectedMaterial?:string
  productNameSnapshot: string;
  customerNotes?: string;

  quantity: number;
  unitPriceSnapshot: number;

  variantLabelSnapshot?: string;
  imageUrlSnapshot?: string;

  materialNameSnapshot?: string;
  colorNameSnapshot?: string;

  customNotes?: string;
  customMeasurements?: CustomMeasurements;
}

export interface QuoteStorage {
  customerNotes?: string;
  items: QuoteItem[];
}

export interface QuoteItemPayload {
  productId?: string;
  productNameSnapshot: string;

  variantLabelSnapshot?: string;
  imageUrlSnapshot?: string;
  materialNameSnapshot?: string;
  colorNameSnapshot?: string;

  quantity: number;
  unitPriceSnapshot: number;

  customNotes?: string;
}

export interface CreateQuotePayload {
  productId?:string
  guestName?: string;
  guestEmail?: string;
  guestPhone?: string;
customerStatus?: "pending" | "completed";
  customerNotes?: string;

  items: QuoteItemPayload[];
}

export interface QuoteData {
  id: string;
  customerNotes?: string;
  items: QuoteItem[];
  
  customerStatus: "pending" | "completed";
  status?: "pending" | "reviewing" | "approved" | "completed" | "cancelled";
}
export type QuoteDraft = {
  guestName: string | null;
  guestEmail: string | null;
  guestPhone: string | null;
  customerNotes: string | null;
  customerStatus: "pending" | "completed";
  items: [
    {
      productId: string;
      productNameSnapshot: string | null;
      imageUrlSnapshot: string | null;
      shoeNameSnapshot: string | null;
      toeStyleSnapshot: string | null;
      size: number | null;
      materialNameSnapshot: string | null;
      colorNameSnapshot: string | null;
      quantity: number;
      unitPriceSnapshot: number | null;
      customMeasurements: Record<string, unknown> | null;
      customNotes: string | null;
    }
  ];
};

export type ContactMethod = "email" | "whatsapp";

export interface CreateCartPayload {
  productId?: string | null;
  productNameSnapshot?: string | null;
  imageUrlSnapshot?: string | null;
  quantity: number;
  selectedSize?: number | null;
  selectedColor?: string | null;
  selectedMaterial?: string | null;
  unitPriceSnapshot: number;
}

export interface UpdateCartPayload {
  quantity?: number;
  selectedSize?: number | null;
  selectedColor?: string | null;
  selectedMaterial?: string | null;
}

export interface SubmitCartPayload {
  contactMethod: ContactMethod;
  phoneNumber?: string;
}
export interface CartItemPayload {
  productId?: string | null;
  productNameSnapshot: string;
  imageUrlSnapshot: string;
  quantity: number;
  variantId?: string,

  selectedSize?: number | null;
  selectedColor?: string | null;
  selectedMaterial?: string | null;
  unitPriceSnapshot: number;
}



export interface UpdateCartItemPayload {
  quantity?: number;
  selectedSize?: number | null;
  selectedColor?: string | null;
  selectedMaterial?: string | null;
}


export interface CartItem {
  id: string;
  productId: string | null;
  productNameSnapshot: string;
  imageUrlSnapshot: string;
  quantity: number;
  selectedSize: number | null;
  selectedColor: string | null;
  selectedMaterial: string | null;
  unitPriceSnapshot: number;
}


export interface Cart {
  id: string;
  profileId: string;
  status: "active" | "submitted" | "abandoned";
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}



export interface TrackingItem {
  productId?: string | null;
  productNameSnapshot?: string | null;
  imageUrlSnapshot?: string | null;
  quantity: number;
  selectedSize?: number | string | null;
  selectedColor?: string | null;
  selectedMaterial?: string | null;
  unitPriceSnapshot: number;
}

export interface StatusHistory {
  id?:string
  status: string;
  note?: string | null;
  createdAt: string;
}

export interface TrackingOrder {
  orderNumber: string;
  orderType?: string;
  status: string;
  items: TrackingItem[];
  total?: number;
  totalSnapshot?: number;
  paymentUrl?: string | null;
  receiptUrl?: string | null;
  receiptPublicId?: string | null;
  shippingTrackingNumber?: string | null;
  shippingTrackingUrl?: string | null;
  shippingDetails?: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    [key: string]: unknown;
  } | null;
  createdAt: string;
  completedAt?: string | null;
  statusHistory?: StatusHistory[];
}

interface OrderItem {
  productId?: string | null;
  productNameSnapshot?: string | null;
  imageUrlSnapshot?: string | null;
  quantity: number;
  selectedSize?: number | string | null;
  selectedColor?: string | null;
  selectedMaterial?: string | null;
  unitPriceSnapshot: number;
}


export interface Order {
  id: string;
  originalCartId?: string;
  orderNumber?: string;
  profileId?: string;

  items: OrderItem[];
  totalSnapshot: number;

  status: string;
  completedAt?: string | null;
  createdAt: string;

  paymentUrl?: string | null;
  receiptUrl?: string | null;
  receiptPublicId?: string | null;

  shippingTrackingNumber?: string | null;
  shippingTrackingUrl?: string | null;
  shippingDetails?: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    [key: string]: unknown;
  } | null;

  statusHistory?: StatusHistory[];
}
