import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { EnsureUserFromOAuthUseCase } from './ensure-user-from-oauth.use-case';
import { User } from '../entities/user.entity';
import { CreateUserBody } from '@bookinvideo/contracts';

describe('EnsureUserFromOAuthUseCase', () => {
  let useCase: EnsureUserFromOAuthUseCase;
  let userRepo: jest.Mocked<Repository<User>>;

  const makeProfile = (
    overrides: Partial<CreateUserBody> = {},
  ): CreateUserBody => ({
    email: 'gabriel@email.com',
    name: 'Gabriel',
    provider: 'google',
    providerUserId: '123',
    avatarUrl: 'https://avatar.iran.liara.run/public',
    ...overrides,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnsureUserFromOAuthUseCase,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get(EnsureUserFromOAuthUseCase);
    userRepo = module.get(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('create user if it is not registered', async () => {
    const profile = makeProfile();

    userRepo.findOne.mockResolvedValue(null);

    userRepo.create.mockReturnValue({
      id: 'user-1',
      email: profile.email,
      name: profile.name,
      provider: profile.provider,
      providerUserId: profile.providerUserId,
      avatarUrl: profile.avatarUrl,
    } as unknown as User);

    userRepo.save.mockImplementation(async (u) => u as User);

    const result = await useCase.execute(profile);

    expect(userRepo.findOne).toHaveBeenCalled();
    expect(userRepo.create).toHaveBeenCalled();
    expect(userRepo.save).toHaveBeenCalled();
    expect(result).toMatchObject({
      email: profile.email,
      name: profile.name,
      provider: profile.provider,
      providerUserId: profile.providerUserId,
      avatarUrl: profile?.avatarUrl,
    });
  });

  it('returns user it it already exists', async () => {
    const profile = makeProfile({ name: 'Gabriel Almeida' });

    const existingUser = {
      id: 'user-1',
      email: 'old@email.com',
      name: 'Old Name',
    } as unknown as User;

    userRepo.findOne.mockResolvedValue(existingUser);

    const result = await useCase.execute(profile);

    expect(userRepo.findOne).toHaveBeenCalled();
    expect(userRepo.save).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      id: 'user-1',
    });
  });
});
