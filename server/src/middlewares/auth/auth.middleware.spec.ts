import { MockFirebaseSdk } from 'firebase-mock';
import { TestingModule, Test } from '@nestjs/testing';
import { getModelToken } from 'nestjs-typegoose';
//
import { UserService } from '@modules/user/user.service';
import { AuthService } from '@modules/auth/auth.service';
import { DBModule } from '@modules/db/db.module';
import { DBService } from '@modules/db/db.service';
//
import { AuthMiddleware } from './auth.middleware';

describe('AuthMiddleware', () => {
  let service: UserService;
  const mockDBService = new DBService(MockFirebaseSdk());

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DBModule],
      providers: [
        AuthService,
        UserService,
        { provide: getModelToken('User'), useValue: {} },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(new AuthMiddleware(mockDBService, service)).toBeDefined();
  });
});
