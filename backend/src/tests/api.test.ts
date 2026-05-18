import { describe, it, expect } from '@jest/globals';
import request from 'supertest'; 
import app from '../app';

describe('🚀 API Integration Tests', () => {

  describe('🔐 authMiddleware validation', () => {
    
    it('should block access when no token is provided', async () => {
      const res = await request(app)
        .post('/api/prompts')  
        .send({ category_id: '123', prompt: 'איפור כלה' });

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toContain('גישה נדחתה: לא נשלח קוד אימות');
    });

    it('should block access when an invalid token is provided', async () => {
      const res = await request(app)
        .post('/api/prompts') // ✨ תיקון: הנתיב האמיתי של השרת שלך!
        .set('Authorization', 'Bearer invalid_test_token_123')
        .send({ category_id: '123', prompt: 'איפור כלה' });

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toContain('קוד האימות אינו תקין או שפג תוקפו');
    });

  });

});