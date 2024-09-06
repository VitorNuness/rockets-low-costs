import * as request from 'supertest';
import { app } from '../setup';

describe('MissionController - getUserAvaibleMissions', () => {
  it('should access missions endpoint', () => {
    return request(app.getHttpServer()).get('/user/missions').expect(200);
  });
});
