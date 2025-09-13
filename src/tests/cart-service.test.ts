import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CartService } from '../lib/cart-service';

describe('Cart Service', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up after each test
    localStorage.clear();
  });

  describe('Cart Initialization', () => {
    it('should return empty cart when no cart exists', () => {
      const cart = CartService.getCart();
      expect(cart.items).toEqual([]);
      expect(cart.itemCount).toBe(0);
      expect(cart.total).toBe(0);
    });
  });

  describe('Adding Items', () => {
    it('should add item to empty cart', () => {
      const item = {
        productId: '1',
        productName: 'Test Product',
        productImage: 'test.jpg',
        artistName: 'Test Artist',
        price: 1000
      };

      const cart = CartService.addToCart(item, 2);
      
      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].quantity).toBe(2);
      expect(cart.itemCount).toBe(2);
      expect(cart.subtotal).toBe(2000);
    });

    it('should update quantity when adding existing item', () => {
      const item = {
        productId: '1',
        productName: 'Test Product',
        productImage: 'test.jpg',
        artistName: 'Test Artist',
        price: 1000
      };

      CartService.addToCart(item, 1);
      const cart = CartService.addToCart(item, 2);
      
      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].quantity).toBe(3);
      expect(cart.itemCount).toBe(3);
    });
  });

  describe('Updating Items', () => {
    it('should update item quantity', () => {
      const item = {
        productId: '1',
        productName: 'Test Product',
        productImage: 'test.jpg',
        artistName: 'Test Artist',
        price: 1000
      };

      CartService.addToCart(item, 2);
      const cart = CartService.updateCartItem('1', 5);
      
      expect(cart.items[0].quantity).toBe(5);
      expect(cart.itemCount).toBe(5);
    });

    it('should remove item when quantity is set to 0', () => {
      const item = {
        productId: '1',
        productName: 'Test Product',
        productImage: 'test.jpg',
        artistName: 'Test Artist',
        price: 1000
      };

      CartService.addToCart(item, 2);
      const cart = CartService.updateCartItem('1', 0);
      
      expect(cart.items).toHaveLength(0);
      expect(cart.itemCount).toBe(0);
    });
  });

  describe('Removing Items', () => {
    it('should remove specific item from cart', () => {
      const item1 = {
        productId: '1',
        productName: 'Test Product 1',
        productImage: 'test1.jpg',
        artistName: 'Test Artist 1',
        price: 1000
      };

      const item2 = {
        productId: '2',
        productName: 'Test Product 2',
        productImage: 'test2.jpg',
        artistName: 'Test Artist 2',
        price: 2000
      };

      CartService.addToCart(item1, 1);
      CartService.addToCart(item2, 1);
      
      const cart = CartService.removeFromCart('1');
      
      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].productId).toBe('2');
    });
  });

  describe('Cart Calculations', () => {
    it('should calculate correct totals', () => {
      const item = {
        productId: '1',
        productName: 'Test Product',
        productImage: 'test.jpg',
        artistName: 'Test Artist',
        price: 1000
      };

      const cart = CartService.addToCart(item, 2);
      
      // Subtotal should be 2000
      expect(cart.subtotal).toBe(2000);
      
      // Should include shipping (100 for orders under 2000)
      expect(cart.shipping).toBe(100);
      
      // Should include tax (18% GST)
      expect(cart.tax).toBe(360); // 2000 * 0.18
      
      // Total should be subtotal + shipping + tax
      expect(cart.total).toBe(2460);
    });

    it('should provide free shipping for orders over threshold', () => {
      const item = {
        productId: '1',
        productName: 'Expensive Product',
        productImage: 'test.jpg',
        artistName: 'Test Artist',
        price: 3000
      };

      const cart = CartService.addToCart(item, 1);
      
      expect(cart.subtotal).toBe(3000);
      expect(cart.shipping).toBe(0); // Free shipping over 2000
      expect(cart.tax).toBe(540); // 3000 * 0.18
      expect(cart.total).toBe(3540);
    });
  });

  describe('Cart Persistence', () => {
    it('should persist cart to localStorage', () => {
      const item = {
        productId: '1',
        productName: 'Test Product',
        productImage: 'test.jpg',
        artistName: 'Test Artist',
        price: 1000
      };

      CartService.addToCart(item, 1);
      
      // Get cart from localStorage directly
      const storedCart = JSON.parse(localStorage.getItem('dots_cart') || '{}');
      expect(storedCart.items).toHaveLength(1);
      expect(storedCart.items[0].productId).toBe('1');
    });

    it('should load cart from localStorage', () => {
      // Manually set cart in localStorage
      const cartData = {
        items: [{
          productId: '1',
          productName: 'Test Product',
          productImage: 'test.jpg',
          artistName: 'Test Artist',
          price: 1000,
          quantity: 2
        }]
      };
      localStorage.setItem('dots_cart', JSON.stringify(cartData));
      
      const cart = CartService.getCart();
      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].quantity).toBe(2);
      expect(cart.itemCount).toBe(2);
    });
  });

  describe('Clear Cart', () => {
    it('should clear all items from cart', () => {
      const item = {
        productId: '1',
        productName: 'Test Product',
        productImage: 'test.jpg',
        artistName: 'Test Artist',
        price: 1000
      };

      CartService.addToCart(item, 2);
      const cart = CartService.clearCart();
      
      expect(cart.items).toEqual([]);
      expect(cart.itemCount).toBe(0);
      expect(cart.total).toBe(0);
    });
  });
});