import * as request from 'supertest';
import { app } from '../../setup';

describe('LoginController', () => {
  it('should access the login route', () => {
    return request(app.getHttpServer()).post('/login').expect(200);
  });
});
