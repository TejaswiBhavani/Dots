/**
 * Configuration service for Dots Platform
 * Manages environment variables and API configurations
 */

export interface AppConfig {
  // API Configuration
  apiBaseUrl: string;
  wixApiKey?: string;
  
  // AI Assistant Configuration
  aiProvider: 'openai' | 'anthropic' | 'local';
  aiApiKey?: string;
  aiModel?: string;
  aiEndpoint?: string;
  
  // E-commerce Configuration
  paymentGateway: 'stripe' | 'razorpay' | 'wix' | 'mock';
  paymentPublicKey?: string;
  
  // Feature Flags
  features: {
    aiAssistant: boolean;
    customOrders: boolean;
    internationalShipping: boolean;
    wishlist: boolean;
    reviews: boolean;
    socialLogin: boolean;
  };
  
  // Business Configuration
  business: {
    currency: string;
    defaultShippingCost: number;
    freeShippingThreshold: number;
    taxRate: number;
    supportEmail: string;
    supportPhone: string;
  };
  
  // UI Configuration
  ui: {
    itemsPerPage: number;
    maxImageSize: number;
    supportedImageFormats: string[];
    theme: 'light' | 'dark' | 'auto';
  };
}

class ConfigService {
  private static instance: ConfigService;
  private config: AppConfig;

  private constructor() {
    this.config = this.loadConfiguration();
  }

  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  private loadConfiguration(): AppConfig {
    // In a real app, these would come from environment variables
    // For this demo, we'll use default values
    return {
      apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.dots.com',
      wixApiKey: import.meta.env.VITE_WIX_API_KEY,
      
      aiProvider: (import.meta.env.VITE_AI_PROVIDER as any) || 'local',
      aiApiKey: import.meta.env.VITE_AI_API_KEY,
      aiModel: import.meta.env.VITE_AI_MODEL || 'gpt-3.5-turbo',
      aiEndpoint: import.meta.env.VITE_AI_ENDPOINT,
      
      paymentGateway: (import.meta.env.VITE_PAYMENT_GATEWAY as any) || 'mock',
      paymentPublicKey: import.meta.env.VITE_PAYMENT_PUBLIC_KEY,
      
      features: {
        aiAssistant: import.meta.env.VITE_FEATURE_AI_ASSISTANT !== 'false',
        customOrders: import.meta.env.VITE_FEATURE_CUSTOM_ORDERS !== 'false',
        internationalShipping: import.meta.env.VITE_FEATURE_INTERNATIONAL_SHIPPING !== 'false',
        wishlist: import.meta.env.VITE_FEATURE_WISHLIST !== 'false',
        reviews: import.meta.env.VITE_FEATURE_REVIEWS !== 'false',
        socialLogin: import.meta.env.VITE_FEATURE_SOCIAL_LOGIN !== 'false',
      },
      
      business: {
        currency: import.meta.env.VITE_CURRENCY || 'INR',
        defaultShippingCost: parseInt(import.meta.env.VITE_DEFAULT_SHIPPING_COST || '100'),
        freeShippingThreshold: parseInt(import.meta.env.VITE_FREE_SHIPPING_THRESHOLD || '2000'),
        taxRate: parseFloat(import.meta.env.VITE_TAX_RATE || '0.18'),
        supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'support@dots.com',
        supportPhone: import.meta.env.VITE_SUPPORT_PHONE || '+91-9999999999',
      },
      
      ui: {
        itemsPerPage: parseInt(import.meta.env.VITE_ITEMS_PER_PAGE || '20'),
        maxImageSize: parseInt(import.meta.env.VITE_MAX_IMAGE_SIZE || '5242880'), // 5MB
        supportedImageFormats: (import.meta.env.VITE_SUPPORTED_IMAGE_FORMATS || 'jpeg,jpg,png,webp').split(','),
        theme: (import.meta.env.VITE_THEME as any) || 'light',
      },
    };
  }

  public getConfig(): AppConfig {
    return this.config;
  }

  public get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.config[key];
  }

  public getFeature(feature: keyof AppConfig['features']): boolean {
    return this.config.features[feature];
  }

  public getBusiness<K extends keyof AppConfig['business']>(key: K): AppConfig['business'][K] {
    return this.config.business[key];
  }

  public getUI<K extends keyof AppConfig['ui']>(key: K): AppConfig['ui'][K] {
    return this.config.ui[key];
  }

  public updateConfig(updates: Partial<AppConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  public isFeatureEnabled(feature: keyof AppConfig['features']): boolean {
    return this.config.features[feature];
  }

  public isDevelopment(): boolean {
    return import.meta.env.DEV;
  }

  public isProduction(): boolean {
    return import.meta.env.PROD;
  }

  public getEnvironment(): string {
    return import.meta.env.MODE || 'development';
  }
}

// Export singleton instance
export const configService = ConfigService.getInstance();

// Export individual getters for convenience
export const getConfig = () => configService.getConfig();
export const getFeature = (feature: keyof AppConfig['features']) => configService.getFeature(feature);
export const getBusiness = <K extends keyof AppConfig['business']>(key: K) => configService.getBusiness(key);
export const getUI = <K extends keyof AppConfig['ui']>(key: K) => configService.getUI(key);
export const isFeatureEnabled = (feature: keyof AppConfig['features']) => configService.isFeatureEnabled(feature);

// Environment helpers
export const isDevelopment = () => configService.isDevelopment();
export const isProduction = () => configService.isProduction();
export const getEnvironment = () => configService.getEnvironment();