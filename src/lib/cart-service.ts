/**
 * Cart Service for Dots Marketplace
 * Handles shopping cart operations and checkout functionality
 */

export interface CartItem {
  productId: string;
  productName: string;
  productImage: string;
  artistName: string;
  price: number;
  quantity: number;
  customization?: {
    size?: string;
    color?: string;
    personalMessage?: string;
  };
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}

export interface ShippingAddress {
  fullName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface OrderSummary {
  orderId: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
  estimatedDelivery?: Date;
}

export class CartService {
  private static CART_STORAGE_KEY = 'dots_cart';

  /**
   * Get current cart from localStorage
   */
  static getCart(): Cart {
    try {
      const cartData = localStorage.getItem(this.CART_STORAGE_KEY);
      if (!cartData) {
        return this.createEmptyCart();
      }

      const parsedCart = JSON.parse(cartData);
      return this.calculateCartTotals(parsedCart.items || []);
    } catch (error) {
      console.error('Error loading cart:', error);
      return this.createEmptyCart();
    }
  }

  /**
   * Add item to cart
   */
  static addToCart(item: Omit<CartItem, 'quantity'>, quantity: number = 1): Cart {
    try {
      const currentCart = this.getCart();
      const existingItemIndex = currentCart.items.findIndex(
        cartItem => cartItem.productId === item.productId &&
        JSON.stringify(cartItem.customization) === JSON.stringify(item.customization)
      );

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        currentCart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        currentCart.items.push({ ...item, quantity });
      }

      const updatedCart = this.calculateCartTotals(currentCart.items);
      this.saveCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw new Error('Failed to add item to cart');
    }
  }

  /**
   * Update item quantity in cart
   */
  static updateCartItem(productId: string, quantity: number, customization?: CartItem['customization']): Cart {
    try {
      const currentCart = this.getCart();
      const itemIndex = currentCart.items.findIndex(
        item => item.productId === productId &&
        JSON.stringify(item.customization) === JSON.stringify(customization)
      );

      if (itemIndex > -1) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or negative
          currentCart.items.splice(itemIndex, 1);
        } else {
          currentCart.items[itemIndex].quantity = quantity;
        }
      }

      const updatedCart = this.calculateCartTotals(currentCart.items);
      this.saveCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw new Error('Failed to update cart item');
    }
  }

  /**
   * Remove item from cart
   */
  static removeFromCart(productId: string, customization?: CartItem['customization']): Cart {
    try {
      const currentCart = this.getCart();
      currentCart.items = currentCart.items.filter(
        item => !(item.productId === productId &&
        JSON.stringify(item.customization) === JSON.stringify(customization))
      );

      const updatedCart = this.calculateCartTotals(currentCart.items);
      this.saveCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw new Error('Failed to remove item from cart');
    }
  }

  /**
   * Clear entire cart
   */
  static clearCart(): Cart {
    try {
      const emptyCart = this.createEmptyCart();
      this.saveCart(emptyCart);
      return emptyCart;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw new Error('Failed to clear cart');
    }
  }

  /**
   * Calculate shipping cost based on cart contents and address
   */
  static calculateShipping(items: CartItem[], address?: ShippingAddress): number {
    // Basic shipping calculation logic
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Free shipping over ₹2000
    if (subtotal >= 2000) {
      return 0;
    }

    // International shipping
    if (address && address.country !== 'India') {
      return 500;
    }

    // Domestic shipping
    return 100;
  }

  /**
   * Calculate tax based on cart contents and address
   */
  static calculateTax(items: CartItem[], address?: ShippingAddress): number {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // GST for India
    if (!address || address.country === 'India') {
      return Math.round(subtotal * 0.18); // 18% GST
    }

    // No tax for international orders (included in product price)
    return 0;
  }

  /**
   * Process checkout and create order
   */
  static async processCheckout(
    cart: Cart,
    shippingAddress: ShippingAddress,
    paymentMethod: string
  ): Promise<OrderSummary> {
    try {
      // In a real implementation, this would integrate with Wix eCommerce
      // For now, simulate order creation
      const orderId = `ORD-${Date.now()}`;
      const estimatedDelivery = new Date();
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 7); // 7 days from now

      const order: OrderSummary = {
        orderId,
        items: cart.items,
        shippingAddress,
        subtotal: cart.subtotal,
        shipping: cart.shipping,
        tax: cart.tax,
        total: cart.total,
        status: 'pending',
        createdAt: new Date(),
        estimatedDelivery
      };

      // Clear cart after successful order
      this.clearCart();

      // In a real app, save order to database
      this.saveOrderToHistory(order);

      return order;
    } catch (error) {
      console.error('Error processing checkout:', error);
      throw new Error('Failed to process checkout');
    }
  }

  /**
   * Get order history for user
   */
  static getOrderHistory(): OrderSummary[] {
    try {
      const historyData = localStorage.getItem('dots_order_history');
      if (!historyData) {
        return [];
      }
      return JSON.parse(historyData);
    } catch (error) {
      console.error('Error loading order history:', error);
      return [];
    }
  }

  /**
   * Get order by ID
   */
  static getOrderById(orderId: string): OrderSummary | null {
    try {
      const history = this.getOrderHistory();
      return history.find(order => order.orderId === orderId) || null;
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  }

  // Private helper methods
  private static createEmptyCart(): Cart {
    return {
      items: [],
      subtotal: 0,
      shipping: 0,
      tax: 0,
      total: 0,
      itemCount: 0
    };
  }

  private static calculateCartTotals(items: CartItem[]): Cart {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = this.calculateShipping(items);
    const tax = this.calculateTax(items);
    const total = subtotal + shipping + tax;
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items,
      subtotal,
      shipping,
      tax,
      total,
      itemCount
    };
  }

  private static saveCart(cart: Cart): void {
    try {
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  private static saveOrderToHistory(order: OrderSummary): void {
    try {
      const history = this.getOrderHistory();
      history.unshift(order); // Add to beginning of array
      
      // Keep only last 50 orders
      if (history.length > 50) {
        history.splice(50);
      }
      
      localStorage.setItem('dots_order_history', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving order to history:', error);
    }
  }
}

// Export cart state management hook for React components
export function useCart() {
  const [cart, setCart] = useState<Cart>(CartService.getCart());

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    const updatedCart = CartService.addToCart(item, quantity);
    setCart(updatedCart);
  };

  const updateCartItem = (productId: string, quantity: number, customization?: CartItem['customization']) => {
    const updatedCart = CartService.updateCartItem(productId, quantity, customization);
    setCart(updatedCart);
  };

  const removeFromCart = (productId: string, customization?: CartItem['customization']) => {
    const updatedCart = CartService.removeFromCart(productId, customization);
    setCart(updatedCart);
  };

  const clearCart = () => {
    const updatedCart = CartService.clearCart();
    setCart(updatedCart);
  };

  const refreshCart = () => {
    setCart(CartService.getCart());
  };

  return {
    cart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    refreshCart
  };
}

// We need to import useState
import { useState } from 'react';