import { describe, it, expect, beforeEach } from 'vitest';
import { AIAssistantService } from '../lib/ai-assistant';

describe('AI Assistant Service', () => {
  let aiAssistant: AIAssistantService;

  beforeEach(() => {
    aiAssistant = new AIAssistantService({ provider: 'local' });
  });

  describe('Response Generation', () => {
    it('should respond to greetings appropriately', async () => {
      const response = await aiAssistant.generateResponse('Hello');
      expect(response).toContain('Welcome to Dots');
      expect(response).toContain('handicrafts');
    });

    it('should provide pottery information when asked', async () => {
      const response = await aiAssistant.generateResponse('Tell me about pottery');
      expect(response).toContain('pottery');
      expect(response).toContain('terracotta');
      expect(response).toContain('artisans');
    });

    it('should provide painting information when asked', async () => {
      const response = await aiAssistant.generateResponse('What paintings do you have?');
      expect(response).toContain('painting');
      expect(response).toContain('Madhubani');
      expect(response).toContain('artists');
    });

    it('should provide wedding collection information', async () => {
      const response = await aiAssistant.generateResponse('wedding collection');
      expect(response).toContain('wedding');
      expect(response).toContain('ceremonial');
      expect(response).toContain('celebration');
    });

    it('should provide help information when asked', async () => {
      const response = await aiAssistant.generateResponse('help me');
      expect(response).toContain('help');
      expect(response).toContain('category');
      expect(response).toContain('artisan');
    });

    it('should handle unknown queries gracefully', async () => {
      const response = await aiAssistant.generateResponse('random unknown query xyz');
      expect(response).toContain('question');
      expect(response).toContain('collection');
    });
  });

  describe('Intent Extraction', () => {
    it('should extract pottery intent correctly', () => {
      const intent = aiAssistant.extractIntent('I want to see pottery');
      expect(intent).toBe('pottery');
    });

    it('should extract painting intent correctly', () => {
      const intent = aiAssistant.extractIntent('Show me paintings');
      expect(intent).toBe('paintings');
    });

    it('should extract wedding intent correctly', () => {
      const intent = aiAssistant.extractIntent('wedding items');
      expect(intent).toBe('wedding');
    });

    it('should extract help intent correctly', () => {
      const intent = aiAssistant.extractIntent('I need help');
      expect(intent).toBe('help');
    });

    it('should return general intent for unrecognized queries', () => {
      const intent = aiAssistant.extractIntent('something random');
      expect(intent).toBe('general');
    });
  });

  describe('Suggested Questions', () => {
    it('should provide relevant suggested questions', () => {
      const questions = aiAssistant.getSuggestedQuestions();
      expect(questions).toBeInstanceOf(Array);
      expect(questions.length).toBeGreaterThan(0);
      expect(questions).toContain('What pottery styles do you have?');
      expect(questions).toContain('Show me wedding collection pieces');
    });
  });

  describe('Context Awareness', () => {
    it('should maintain context in conversation', async () => {
      const firstResponse = await aiAssistant.generateResponse('pottery');
      expect(firstResponse).toContain('pottery');

      // Should remember context in follow-up
      const followUpResponse = await aiAssistant.generateResponse('what about prices?', [
        {
          id: '1',
          content: 'pottery',
          role: 'user',
          timestamp: new Date()
        },
        {
          id: '2',
          content: firstResponse,
          role: 'assistant',
          timestamp: new Date()
        }
      ]);
      
      expect(followUpResponse).toContain('price');
    });
  });

  describe('Error Handling', () => {
    it('should handle empty messages gracefully', async () => {
      const response = await aiAssistant.generateResponse('');
      expect(response).toBeDefined();
      expect(response.length).toBeGreaterThan(0);
    });

    it('should handle very long messages', async () => {
      const longMessage = 'a'.repeat(1000);
      const response = await aiAssistant.generateResponse(longMessage);
      expect(response).toBeDefined();
      expect(response.length).toBeGreaterThan(0);
    });
  });
});