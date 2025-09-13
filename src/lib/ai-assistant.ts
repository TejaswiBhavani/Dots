export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface AIAssistantConfig {
  apiKey?: string;
  endpoint?: string;
  provider: 'openai' | 'anthropic' | 'local';
  model?: string;
}

/**
 * AI Assistant Service for Dots Artisan Marketplace
 * Provides contextual assistance for art discovery, product recommendations, and craft information
 */
export class AIAssistantService {
  private config: AIAssistantConfig;
  private context: string;

  constructor(config: AIAssistantConfig) {
    this.config = config;
    this.context = this.buildArtisanContext();
  }

  private buildArtisanContext(): string {
    return `You are an AI assistant for "Dots - Connecting Arts to Hearts", an Indian artisan marketplace. 
    
Your role is to help users:
- Discover authentic Indian handicrafts and artworks
- Learn about traditional craft techniques and cultural significance
- Find perfect pieces for special occasions (weddings, festivals, home decor)
- Connect with artisan stories and craft heritage
- Navigate our product categories: pottery, paintings, embroidery, metal craft, jewelry, wooden crafts, vintage pieces

Key categories and themes:
- Wedding collections and ceremonial items
- Haldi and festival decorations  
- Shell art and coastal crafts
- Madhubani and traditional paintings
- Handwoven textiles and embroidery
- Terracotta and ceramic pottery
- Brass and metal sculptures
- Wooden dolls and figurines

Always be warm, knowledgeable about Indian culture, and focus on the artisan stories behind each piece. 
Help users understand the cultural significance and craftsmanship involved.`;
  }

  /**
   * Generate AI response to user message
   */
  async generateResponse(
    userMessage: string, 
    conversationHistory: ChatMessage[] = []
  ): Promise<string> {
    try {
      // For now, provide contextual responses based on keywords
      // This can be replaced with actual AI API calls when configured
      return this.generateContextualResponse(userMessage, conversationHistory);
    } catch (error) {
      console.error('AI Assistant error:', error);
      return "I apologize, but I'm having trouble processing your request right now. Please try asking about our art collections, artisan stories, or product categories.";
    }
  }

  /**
   * Generate contextual responses based on keywords and patterns
   * This serves as a fallback when no AI API is configured
   */
  private generateContextualResponse(userMessage: string, history: ChatMessage[]): string {
    const message = userMessage.toLowerCase();
    
    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Welcome to Dots! I'm here to help you discover beautiful Indian handicrafts and connect with amazing artisan stories. What kind of artwork or craft are you interested in exploring today?";
    }

    // Product discovery
    if (message.includes('pottery') || message.includes('ceramic')) {
      return "Our pottery collection features beautiful terracotta and ceramic pieces handcrafted by skilled artisans. You'll find decorative vases, functional bowls, and artistic sculptures. Each piece reflects traditional techniques passed down through generations. Would you like to see specific pottery styles or occasions?";
    }

    if (message.includes('painting') || message.includes('art') || message.includes('madhubani')) {
      return "Our painting collection showcases vibrant Indian art forms including Madhubani, Warli, and contemporary pieces. These works capture the rich cultural heritage and artistic traditions of India. Each painting tells a story and supports the livelihood of talented artists. Are you looking for a particular style or theme?";
    }

    if (message.includes('embroidery') || message.includes('textile') || message.includes('fabric')) {
      return "Our embroidery collection features intricate needlework from master artisans across India. From traditional mirror work to contemporary thread art, each piece showcases hours of skilled craftsmanship. These make beautiful wall hangings, decorative pieces, or gifts. What kind of embroidery style interests you?";
    }

    if (message.includes('wedding') || message.includes('marriage') || message.includes('ceremony')) {
      return "For weddings, we have a special curated collection including ceremonial items, decorative pieces, and meaningful gifts. Popular choices include brass sculptures, embroidered wall hangings, traditional pottery, and custom artwork. These pieces add cultural richness to your special celebration. Would you like suggestions for specific wedding needs?";
    }

    if (message.includes('gift') || message.includes('present')) {
      return "Our artisan crafts make wonderful, meaningful gifts! Popular gift items include handpainted pottery, small sculptures, embroidered accessories, and vintage-style decorative pieces. Each comes with the artisan's story, making it extra special. What's the occasion and who is the gift for?";
    }

    if (message.includes('artisan') || message.includes('artist') || message.includes('maker')) {
      return "Every piece in our collection comes with the artisan's story. We work directly with skilled craftspeople from different regions of India, ensuring fair compensation and preserving traditional techniques. You can learn about each artist's background, their craft specialization, and the cultural significance of their work. Would you like to meet any specific artisans?";
    }

    if (message.includes('price') || message.includes('cost') || message.includes('budget')) {
      return "Our pieces are priced to reflect the skilled craftsmanship and fair compensation for artisans. We have options across different budgets - from small decorative items starting around ₹500 to larger masterpieces. Each piece represents authentic handmade quality and cultural value. What's your budget range?";
    }

    if (message.includes('shipping') || message.includes('delivery')) {
      return "We carefully package each artwork to ensure safe delivery. Shipping times vary by location, typically 3-7 days within India. International shipping is available for most items. We use secure packaging to protect these precious handmade pieces during transit. Where would you like your artwork delivered?";
    }

    if (message.includes('custom') || message.includes('personalized') || message.includes('commission')) {
      return "We offer custom artwork commissions! You can work directly with our artisans to create personalized pieces for special occasions, home decor, or corporate gifts. The process involves discussing your vision, getting a quote, and working with the artisan throughout creation. What kind of custom piece do you have in mind?";
    }

    // General help
    if (message.includes('help') || message.includes('how') || message.includes('what can you')) {
      return "I can help you with:\n• Discovering art by category or theme\n• Learning about traditional craft techniques\n• Finding pieces for specific occasions\n• Understanding artisan stories and cultural significance\n• Product recommendations based on your interests\n• Information about pricing, shipping, and custom orders\n\nWhat would you like to explore?";
    }

    // Default response
    return "That's an interesting question! I specialize in helping with our Indian handicraft collections. You can ask me about:\n• Our art categories (pottery, paintings, embroidery, etc.)\n• Finding pieces for special occasions\n• Learning about artisan stories and techniques\n• Product recommendations\n\nWhat specific aspect of our collection interests you?";
  }

  /**
   * Get suggested questions for the user
   */
  getSuggestedQuestions(): string[] {
    return [
      "What pottery styles do you have?",
      "Show me wedding collection pieces",
      "Tell me about Madhubani paintings",
      "What makes these crafts authentic?",
      "Can I commission custom artwork?",
      "What's the story behind these pieces?"
    ];
  }

  /**
   * Extract intent from user message for better routing
   */
  extractIntent(message: string): string {
    const message_lower = message.toLowerCase();
    
    if (message_lower.includes('pottery') || message_lower.includes('ceramic')) return 'pottery';
    if (message_lower.includes('painting') || message_lower.includes('art')) return 'paintings';
    if (message_lower.includes('embroidery') || message_lower.includes('textile')) return 'embroidery';
    if (message_lower.includes('wedding') || message_lower.includes('ceremony')) return 'wedding';
    if (message_lower.includes('gift') || message_lower.includes('present')) return 'gift';
    if (message_lower.includes('custom') || message_lower.includes('commission')) return 'custom';
    if (message_lower.includes('artisan') || message_lower.includes('artist')) return 'artisan';
    if (message_lower.includes('price') || message_lower.includes('cost')) return 'pricing';
    if (message_lower.includes('help')) return 'help';
    
    return 'general';
  }
}

// Export a default instance
export const aiAssistant = new AIAssistantService({
  provider: 'local' // Start with local responses, can be upgraded to API later
});