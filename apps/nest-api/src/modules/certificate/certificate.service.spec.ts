import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CourseEntity } from '../course/entities/course.entity';
import { LessonEntity } from '../course/entities/lesson.entity';
import { LessonProgressEntity } from '../course/entities/lesson-progress.entity';
import { CertificateEntity } from '../course/entities/certificate.entity';
import { CertificateService } from './certificate.service';

describe('CertificateService', () => {
  let service: CertificateService;
  let courseRepo: jest.Mocked<Repository<CourseEntity>>;
  let lessonProgressRepo: jest.Mocked<Repository<LessonProgressEntity>>;
  let userRepo: jest.Mocked<Repository<UserEntity>>;
  let certificateRepo: jest.Mocked<Repository<CertificateEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CertificateService,
        {
          provide: getRepositoryToken(CourseEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(LessonEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(LessonProgressEntity),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(CertificateEntity),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CertificateService>(CertificateService);
    courseRepo = module.get(getRepositoryToken(CourseEntity));
    lessonProgressRepo = module.get(getRepositoryToken(LessonProgressEntity));
    userRepo = module.get(getRepositoryToken(UserEntity));
    certificateRepo = module.get(getRepositoryToken(CertificateEntity));
  });

  it('handle Generate Certificate Event: return when user does not exist', async () => {
    userRepo.findOne.mockResolvedValue(null);

    await service.handleGenerateCertificateEvent({
      userId: 'user-1',
      courseId: 'course-1',
    });

    expect(userRepo.findOne).toHaveBeenCalled();
    expect(courseRepo.findOne).not.toHaveBeenCalled();
    expect(certificateRepo.save).not.toHaveBeenCalled();
  });

  it('handle Generate Certificate Event: return when course does not exist', async () => {
    userRepo.findOne.mockResolvedValue({
      uuid: 'user-1',
      name: 'John Doe',
    } as UserEntity);
    courseRepo.findOne.mockResolvedValue(null);

    await service.handleGenerateCertificateEvent({
      userId: 'user-1',
      courseId: 'course-1',
    });

    expect(userRepo.findOne).toHaveBeenCalled();
    expect(courseRepo.findOne).toHaveBeenCalled();
    expect(certificateRepo.save).not.toHaveBeenCalled();
  });

  it('handle Generate Certificate Event: return when not all course lessons are completed', async () => {
    userRepo.findOne.mockResolvedValue({
      uuid: 'user-1',
      name: 'John Doe',
    } as UserEntity);
    courseRepo.findOne.mockResolvedValue({
      id: 'course-1',
      title: 'Clean Code',
      estimatedHours: 10,
      modules: [
        {
          lessons: [{ id: 'lesson-1' }, { id: 'lesson-2' }],
        },
      ],
    } as unknown as CourseEntity);
    lessonProgressRepo.find.mockResolvedValue([
      {
        lessonId: 'lesson-1',
        completedAt: new Date(),
      },
    ] as LessonProgressEntity[]);

    await service.handleGenerateCertificateEvent({
      userId: 'user-1',
      courseId: 'course-1',
    });

    expect(lessonProgressRepo.find).toHaveBeenCalled();
    expect(certificateRepo.save).not.toHaveBeenCalled();
  });

  it('handle Generate Certificate Event: create certificate when all course lessons are completed', async () => {
    userRepo.findOne.mockResolvedValue({
      uuid: 'user-1',
      name: 'John Doe',
    } as UserEntity);
    courseRepo.findOne.mockResolvedValue({
      id: 'course-1',
      title: 'Clean Code',
      estimatedHours: 10,
      modules: [
        {
          lessons: [{ id: 'lesson-1' }, { id: 'lesson-2' }],
        },
      ],
    } as unknown as CourseEntity);
    lessonProgressRepo.find.mockResolvedValue([
      {
        lessonId: 'lesson-1',
        completedAt: new Date(),
      },
      {
        lessonId: 'lesson-2',
        completedAt: new Date(),
      },
    ] as LessonProgressEntity[]);

    await service.handleGenerateCertificateEvent({
      userId: 'user-1',
      courseId: 'course-1',
    });

    expect(certificateRepo.save).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: 'user-1',
        courseId: 'course-1',
        recipientName: 'John Doe',
        courseTitle: 'Clean Code',
        workloadHours: 10,
      }),
    );
  });
});
