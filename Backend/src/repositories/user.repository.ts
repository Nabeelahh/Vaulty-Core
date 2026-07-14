import { prisma } from '../database';

export class UserRepository {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        isEmailVerified: true,
        emailVerifiedAt: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findByPhoneNumber(phoneNumber: string) {
    return prisma.user.findUnique({
      where: { phoneNumber },
    });
  }

  async create(data: {
    email: string;
    passwordHash: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
  }) {
    return prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        isEmailVerified: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async update(id: string, data: Partial<{
    passwordHash: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    isEmailVerified: boolean;
    emailVerifiedAt: Date;
    lastLoginAt: Date;
  }>) {
    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        isEmailVerified: true,
        emailVerifiedAt: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
      },
    });
  }

  async createPasswordResetToken(userId: string, token: string, expiresAt: Date) {
    return prisma.passwordResetToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  }

  async findValidPasswordResetToken(token: string) {
    return prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  async invalidatePasswordResetToken(token: string) {
    return prisma.passwordResetToken.update({
      where: { token },
      data: { used: true },
    });
  }

  async createEmailVerificationToken(userId: string, token: string, expiresAt: Date) {
    return prisma.emailVerificationToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  }

  async findValidEmailVerificationToken(token: string) {
    return prisma.emailVerificationToken.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  async invalidateEmailVerificationToken(token: string) {
    return prisma.emailVerificationToken.update({
      where: { token },
      data: { used: true },
    });
  }

  async cleanupExpiredTokens() {
    const now = new Date();
    await prisma.passwordResetToken.deleteMany({
      where: {
        expiresAt: { lt: now },
        used: true,
      },
    });
    await prisma.emailVerificationToken.deleteMany({
      where: {
        expiresAt: { lt: now },
        used: true,
      },
    });
  }
}

export const userRepository = new UserRepository();
