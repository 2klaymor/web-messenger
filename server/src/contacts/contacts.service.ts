import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContactEntity } from './contacts.entity';


@Injectable()
export class ContactsService {
    constructor(private prisma: PrismaService) {}


  // Добавление контакта
  async addContact(name: string, targetName: string, displayName: string): Promise<ContactEntity> {
    const addedContact = await this.prisma.contact.create({
      data: {
        ownerName: name,
        targetName: targetName,
        displayName: displayName
      },
      omit: {
        ownerName: true
      }
    });

    return addedContact;
  }


  // Получение контактов пользователя
  async getContacts(name: string): Promise<ContactEntity[]> {
    const foundContacts = await this.prisma.contact.findMany({
      where: {
        ownerName: name
      },
      omit: {
        ownerName: true
      }
    });

    return foundContacts;
  }


  // Проверка существования контакта
  async contactExists(name: string, targetName: string): Promise<boolean> {
    const foundContact = await this.prisma.contact.findUnique({
      where: {
        ownerName_targetName: {
          ownerName: name,
          targetName: targetName
        }
      }
    });

    return !!foundContact;
  }


  // Обновление ОТОБРАЖАЕМОГО ИМЕНИ контакта
  async updateContactDisplayName(name: string, targetName: string, displayName: string): Promise<boolean> {
    const updatedContact = await this.prisma.contact.update({
      where: {
        ownerName_targetName: {
          ownerName: name,
          targetName: targetName
        }
      },
      data: {
        displayName: displayName
      },
      omit: {
        ownerName: true
      }
    });

    return !!updatedContact;
  }


  // Удаление контакта
  async removeContact(name: string, targetName: string): Promise<boolean> {
    const removedContact = await this.prisma.contact.delete({
      where: {
        ownerName_targetName: {
          ownerName: name,
          targetName: targetName
        }
      }
    });

    return !!removedContact;
  }
}
