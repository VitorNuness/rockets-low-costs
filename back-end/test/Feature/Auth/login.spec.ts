import * as request from 'supertest';
import { app } from '../../setup';

describe('LoginController', () => {
  it('should access the login route', () => {
    return request(app.getHttpServer()).post('/login').send({name: 'Joe'}).expect(200);
  });

  it('should require a name', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({ name: '' })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('O nome deve ser preenchido.');
      });
  });

  it('should name must be a string', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({ name: 0 })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('O nome deve ser um texto.');
      });
  });
});
