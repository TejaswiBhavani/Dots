/**
 * Product Service for Dots Marketplace
 * Handles product catalog, search, and e-commerce operations
 */

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  artistId: string;
  artistName: string;
  category: string;
  subcategory?: string;
  tags: string[];
  images: string[];
  colors?: string[];
  materials: string[];
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    weight?: number;
  };
  availability: 'in_stock' | 'limited' | 'out_of_stock' | 'custom_order';
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isHandmade: boolean;
  region?: string;
  craftTechnique?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFilter {
  category?: string;
  priceRange?: { min: number; max: number };
  tags?: string[];
  artist?: string;
  availability?: string[];
  rating?: number;
  region?: string;
  materials?: string[];
  search?: string;
}

export interface ProductSearchResult {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  filters: {
    categories: Array<{ name: string; count: number }>;
    priceRanges: Array<{ range: string; count: number }>;
    artists: Array<{ name: string; count: number }>;
    regions: Array<{ name: string; count: number }>;
  };
}

export class ProductService {
  /**
   * Search products with filters and pagination
   */
  static async searchProducts(
    filters: ProductFilter = {},
    page: number = 1,
    limit: number = 20
  ): Promise<ProductSearchResult> {
    try {
      // In a real implementation, this would call Wix Stores API
      // For now, return mock data
      return this.getMockSearchResults(filters, page, limit);
    } catch (error) {
      console.error('Error searching products:', error);
      throw new Error('Failed to search products');
    }
  }

  /**
   * Get product by ID
   */
  static async getProductById(id: string): Promise<Product | null> {
    try {
      // Mock implementation
      const mockProduct = this.getMockProduct(id);
      return mockProduct;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product');
    }
  }

  /**
   * Get featured products
   */
  static async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    try {
      // Mock implementation
      return this.getMockFeaturedProducts(limit);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw new Error('Failed to fetch featured products');
    }
  }

  /**
   * Get products by category
   */
  static async getProductsByCategory(category: string, limit: number = 20): Promise<Product[]> {
    try {
      // Mock implementation
      return this.getMockProductsByCategory(category, limit);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw new Error('Failed to fetch products by category');
    }
  }

  /**
   * Get product recommendations
   */
  static async getRecommendations(productId: string, limit: number = 4): Promise<Product[]> {
    try {
      // Mock implementation
      return this.getMockRecommendations(productId, limit);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw new Error('Failed to fetch recommendations');
    }
  }

  // Mock data methods (to be replaced with real API calls)
  private static getMockSearchResults(filters: ProductFilter, page: number, limit: number): ProductSearchResult {
    const mockProducts = this.getAllMockProducts();
    let filteredProducts = mockProducts;

    // Apply filters
    if (filters.category) {
      filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === filters.category?.toLowerCase());
    }
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    if (filters.priceRange) {
      filteredProducts = filteredProducts.filter(p => 
        p.price >= filters.priceRange!.min && p.price <= filters.priceRange!.max
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      total: filteredProducts.length,
      page,
      totalPages: Math.ceil(filteredProducts.length / limit),
      filters: {
        categories: [
          { name: 'Pottery', count: 15 },
          { name: 'Paintings', count: 23 },
          { name: 'Embroidery', count: 18 },
          { name: 'Metal Craft', count: 12 },
          { name: 'Jewelry', count: 20 }
        ],
        priceRanges: [
          { range: '₹0 - ₹1000', count: 45 },
          { range: '₹1000 - ₹3000', count: 32 },
          { range: '₹3000 - ₹5000', count: 18 },
          { range: '₹5000+', count: 12 }
        ],
        artists: [
          { name: 'Priya Sharma', count: 8 },
          { name: 'Rajesh Kumar', count: 6 },
          { name: 'Meera Devi', count: 9 },
          { name: 'Amit Patel', count: 7 }
        ],
        regions: [
          { name: 'Rajasthan', count: 25 },
          { name: 'Gujarat', count: 20 },
          { name: 'West Bengal', count: 18 },
          { name: 'Uttar Pradesh', count: 15 }
        ]
      }
    };
  }

  private static getMockProduct(id: string): Product {
    return {
      _id: id,
      name: "Handpainted Madhubani Art",
      description: "Beautiful traditional Madhubani painting featuring intricate patterns and vibrant colors. This piece represents the rich cultural heritage of Bihar and showcases the traditional fish and bird motifs that are symbolic of prosperity and good fortune.",
      price: 2500,
      originalPrice: 3000,
      artistId: "artist-1",
      artistName: "Priya Sharma",
      category: "Paintings",
      subcategory: "Traditional",
      tags: ["madhubani", "traditional", "handmade", "bihar", "vibrant"],
      images: [
        "https://static.wixstatic.com/media/d7d9fb_ad3f9457377f4bc081242fa7abbdcbe9~mv2.png",
        "https://static.wixstatic.com/media/d7d9fb_759a6b92129a4699a10d339643bc662a~mv2.png"
      ],
      colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
      materials: ["Canvas", "Acrylic Paint", "Natural Dyes"],
      dimensions: {
        length: 40,
        width: 30,
        height: 2,
        weight: 0.5
      },
      availability: 'in_stock',
      rating: 4.8,
      reviewCount: 124,
      isFeatured: true,
      isHandmade: true,
      region: "Bihar",
      craftTechnique: "Madhubani Painting",
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  private static getMockFeaturedProducts(limit: number): Product[] {
    const allProducts = this.getAllMockProducts();
    return allProducts.filter(p => p.isFeatured).slice(0, limit);
  }

  private static getMockProductsByCategory(category: string, limit: number): Product[] {
    const allProducts = this.getAllMockProducts();
    return allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase()).slice(0, limit);
  }

  private static getMockRecommendations(productId: string, limit: number): Product[] {
    const allProducts = this.getAllMockProducts();
    return allProducts.filter(p => p._id !== productId).slice(0, limit);
  }

  private static getAllMockProducts(): Product[] {
    return [
      {
        _id: "1",
        name: "Handpainted Madhubani Art",
        description: "Traditional Madhubani painting with intricate patterns",
        price: 2500,
        originalPrice: 3000,
        artistId: "artist-1",
        artistName: "Priya Sharma",
        category: "Paintings",
        tags: ["Traditional", "Bestseller"],
        images: ["https://static.wixstatic.com/media/d7d9fb_ad3f9457377f4bc081242fa7abbdcbe9~mv2.png"],
        colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
        materials: ["Canvas", "Acrylic Paint"],
        availability: 'in_stock',
        rating: 4.8,
        reviewCount: 124,
        isFeatured: true,
        isHandmade: true,
        region: "Bihar",
        craftTechnique: "Madhubani",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: "2",
        name: "Brass Ganesha Sculpture",
        description: "Handcrafted brass Ganesha sculpture",
        price: 4200,
        originalPrice: 5000,
        artistId: "artist-2",
        artistName: "Rajesh Kumar",
        category: "Metal Craft",
        tags: ["New", "Spiritual"],
        images: ["https://static.wixstatic.com/media/d7d9fb_f89183149b6f4c7683323919db071fab~mv2.png"],
        colors: ["#FFD700", "#CD7F32"],
        materials: ["Brass"],
        availability: 'in_stock',
        rating: 4.9,
        reviewCount: 89,
        isFeatured: true,
        isHandmade: true,
        region: "Rajasthan",
        craftTechnique: "Brass Work",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: "3",
        name: "Embroidered Wall Hanging",
        description: "Beautiful embroidered wall hanging with traditional motifs",
        price: 1800,
        originalPrice: 2200,
        artistId: "artist-3",
        artistName: "Meera Devi",
        category: "Embroidery",
        tags: ["Handmade", "Colorful"],
        images: ["https://static.wixstatic.com/media/d7d9fb_759a6b92129a4699a10d339643bc662a~mv2.png"],
        colors: ["#E74C3C", "#F39C12", "#8E44AD"],
        materials: ["Cotton", "Silk Thread"],
        availability: 'in_stock',
        rating: 4.7,
        reviewCount: 156,
        isFeatured: true,
        isHandmade: true,
        region: "Gujarat",
        craftTechnique: "Mirror Work",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: "4",
        name: "Terracotta Vase Set",
        description: "Set of handmade terracotta vases",
        price: 3200,
        originalPrice: 3800,
        artistId: "artist-4",
        artistName: "Amit Patel",
        category: "Pottery",
        tags: ["Eco-friendly", "Home Decor"],
        images: ["https://static.wixstatic.com/media/d7d9fb_916264f4325d49de88b09aa5764c73c3~mv2.png"],
        colors: ["#D2691E", "#8B4513"],
        materials: ["Terracotta", "Natural Clay"],
        availability: 'in_stock',
        rating: 4.6,
        reviewCount: 78,
        isFeatured: true,
        isHandmade: true,
        region: "West Bengal",
        craftTechnique: "Pottery",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }
}