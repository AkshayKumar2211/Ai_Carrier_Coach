import { Test, TestingModule } from '@nestjs/testing';
import { McqController } from './mcq.controller';
import { McqService } from './mcq.service';

describe('McqController', () => {
  let mcqController: McqController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [McqController],
      providers: [McqService],
    }).compile();

    mcqController = app.get<McqController>(McqController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(mcqController.getHello()).toBe('Hello World!');
    });
  });
});
