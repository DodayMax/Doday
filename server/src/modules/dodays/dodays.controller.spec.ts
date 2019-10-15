import { Test, TestingModule } from '@nestjs/testing';
import { DodaysController } from './dodays.controller';

describe('Tools Controller', () => {
  let controller: DodaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DodaysController],
    }).compile();

    controller = module.get<DodaysController>(DodaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
