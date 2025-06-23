import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContactEntity } from './contacts.entity';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class ContactsService {
    constructor(private prisma: PrismaService, private usersService: UsersService) {}


  // Добавление контакта
  async addContact(name: string, targetName: string, displayName: string | null) {
    const userExists = await this.usersService.checkUserExistence(targetName);

    if (!userExists) {
      return false;
    }

    const contactExists = await this.contactExists(name, targetName);

    if (contactExists) {
      return false;
    }

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
  async getContacts(name: string) {
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


  // Проверка существования контакта (Полезно, чтобы не дублировать новые записи о контакте при попытке
  //                                  добавления уже существующего контакта)
  async contactExists(name: string, targetName: string) {
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
  async updateContactDisplayName(name: string, targetName: string, displayName: string) {
    const userExists = await this.usersService.checkUserExistence(targetName);

    if (!userExists) {
      return false;
    }

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
  async removeContact(name: string, targetName: string) {
    const userExists = await this.usersService.checkUserExistence(targetName);

    if (!userExists) {
      return false;
    }

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
