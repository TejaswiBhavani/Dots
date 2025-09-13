/**
 * Notification Service for Dots Platform
 * Provides toast notifications and user feedback
 */

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

type NotificationListener = (notification: Notification) => void;

class NotificationService {
  private static instance: NotificationService;
  private listeners: NotificationListener[] = [];

  private constructor() {}

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  public subscribe(listener: NotificationListener): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notify(notification: Omit<Notification, 'id'>): void {
    const fullNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };

    this.listeners.forEach(listener => listener(fullNotification));
  }

  public success(title: string, description?: string, options?: Partial<Notification>): void {
    this.notify({
      type: 'success',
      title,
      description,
      duration: 5000,
      ...options,
    });
  }

  public error(title: string, description?: string, options?: Partial<Notification>): void {
    this.notify({
      type: 'error',
      title,
      description,
      duration: 7000,
      ...options,
    });
  }

  public warning(title: string, description?: string, options?: Partial<Notification>): void {
    this.notify({
      type: 'warning',
      title,
      description,
      duration: 6000,
      ...options,
    });
  }

  public info(title: string, description?: string, options?: Partial<Notification>): void {
    this.notify({
      type: 'info',
      title,
      description,
      duration: 5000,
      ...options,
    });
  }

  // Convenience methods for common e-commerce actions
  public productAddedToCart(productName: string): void {
    this.success(
      'Added to Cart!',
      `${productName} has been added to your cart`,
      {
        action: {
          label: 'View Cart',
          onClick: () => window.location.href = '/cart'
        }
      }
    );
  }

  public productRemovedFromCart(productName: string): void {
    this.info(
      'Removed from Cart',
      `${productName} has been removed from your cart`
    );
  }

  public orderPlaced(orderId: string): void {
    this.success(
      'Order Placed Successfully!',
      `Your order ${orderId} has been confirmed`,
      {
        action: {
          label: 'Track Order',
          onClick: () => window.location.href = `/orders/${orderId}`
        }
      }
    );
  }

  public paymentFailed(reason?: string): void {
    this.error(
      'Payment Failed',
      reason || 'There was an issue processing your payment. Please try again.'
    );
  }

  public loginRequired(): void {
    this.warning(
      'Login Required',
      'Please sign in to continue with this action',
      {
        action: {
          label: 'Sign In',
          onClick: () => {
            // Trigger login modal or redirect
            console.log('Redirect to login');
          }
        }
      }
    );
  }

  public networkError(): void {
    this.error(
      'Connection Error',
      'Please check your internet connection and try again'
    );
  }

  public featureNotAvailable(): void {
    this.info(
      'Feature Coming Soon',
      'This feature is not available yet. We\'re working on it!'
    );
  }

  public customOrderSubmitted(): void {
    this.success(
      'Custom Order Submitted!',
      'Our artisans will review your request and get back to you within 24 hours'
    );
  }

  public reviewSubmitted(): void {
    this.success(
      'Review Submitted!',
      'Thank you for your feedback. It helps other customers make informed decisions.'
    );
  }

  public wishlistAdded(productName: string): void {
    this.success(
      'Added to Wishlist',
      `${productName} has been saved to your wishlist`,
      {
        action: {
          label: 'View Wishlist',
          onClick: () => window.location.href = '/wishlist'
        }
      }
    );
  }

  public profileUpdated(): void {
    this.success(
      'Profile Updated',
      'Your profile information has been saved successfully'
    );
  }

  public addressSaved(): void {
    this.success(
      'Address Saved',
      'Your shipping address has been updated'
    );
  }

  public subscriptionConfirmed(): void {
    this.success(
      'Subscription Confirmed!',
      'You\'ll receive updates about new artworks and special offers'
    );
  }
}

// Export singleton instance
export const notificationService = NotificationService.getInstance();

// Export convenience methods
export const showSuccess = (title: string, description?: string, options?: Partial<Notification>) => 
  notificationService.success(title, description, options);

export const showError = (title: string, description?: string, options?: Partial<Notification>) => 
  notificationService.error(title, description, options);

export const showWarning = (title: string, description?: string, options?: Partial<Notification>) => 
  notificationService.warning(title, description, options);

export const showInfo = (title: string, description?: string, options?: Partial<Notification>) => 
  notificationService.info(title, description, options);

// React hook for using notifications
export function useNotifications() {
  return {
    success: notificationService.success.bind(notificationService),
    error: notificationService.error.bind(notificationService),
    warning: notificationService.warning.bind(notificationService),
    info: notificationService.info.bind(notificationService),
    
    // E-commerce specific notifications
    productAddedToCart: notificationService.productAddedToCart.bind(notificationService),
    productRemovedFromCart: notificationService.productRemovedFromCart.bind(notificationService),
    orderPlaced: notificationService.orderPlaced.bind(notificationService),
    paymentFailed: notificationService.paymentFailed.bind(notificationService),
    loginRequired: notificationService.loginRequired.bind(notificationService),
    networkError: notificationService.networkError.bind(notificationService),
    featureNotAvailable: notificationService.featureNotAvailable.bind(notificationService),
    customOrderSubmitted: notificationService.customOrderSubmitted.bind(notificationService),
    reviewSubmitted: notificationService.reviewSubmitted.bind(notificationService),
    wishlistAdded: notificationService.wishlistAdded.bind(notificationService),
    profileUpdated: notificationService.profileUpdated.bind(notificationService),
    addressSaved: notificationService.addressSaved.bind(notificationService),
    subscriptionConfirmed: notificationService.subscriptionConfirmed.bind(notificationService),
  };
}