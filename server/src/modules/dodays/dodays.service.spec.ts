import { Test, TestingModule } from '@nestjs/testing';
import { DodaysService } from './dodays.service';

describe('DodaysService', () => {
  let service: DodaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DodaysService],
    }).compile();

    service = module.get<DodaysService>(DodaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
