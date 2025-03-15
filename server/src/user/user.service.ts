import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

import { User } from '@prisma/client';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // CRUD Операции
  async create(createUserDto: CreateUserDto): Promise<User> {
    const passwordHash = await hash(createUserDto.password, 10);

    const createdUser = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        passwordHash: passwordHash
      }
    });

    return createdUser;
  }

  async findAll(): Promise<User[] | null> {
    const foundUsers = await this.prisma.user.findMany();

    return foundUsers;
  }

  async findOne(id: number): Promise<User | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    });
    
    return foundUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const passwordHash = await hash(updateUserDto.password, 10);

    const updatedUser = await this.prisma.user.update({
      where: {
        id: id
      },
      data: {
        displayName: updateUserDto.displayName,
        passwordHash: passwordHash
      }
    });

    return updatedUser;
  }

  async remove(id: number): Promise<User> {
    const deletedUser = await this.prisma.user.delete({
      where: {
        id: id
      }
    });

    return deletedUser;
  }

  // Всопомогательные операции
  async findByUsername(name: string): Promise<User | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        name: name
      }
    });

    return foundUser;
  }

  async userExists(name: string): Promise<boolean> {
    const user = await this.findByUsername(name); 

    return !!user;
  }

  async comparePassword(name, password: string): Promise<boolean> {
    const user = await this.findByUsername(name);

    if (!user) {
      return false;
    }

    return await compare(password, user.passwordHash);
  }
}
