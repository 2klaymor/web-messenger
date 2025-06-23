import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { ContactsService } from './contacts.service';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';

import { AddContactDto, RemoveContactDto, UpdateContactDisplayNameDto } from './contacts.dto';


@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  
  // Получение всех контактов
  @UseGuards(JwtAccessGuard)
  @Get()
  async getContacts(
    @CurrentUser('name') ownerName: string,
  ) {
    return await this.contactsService.getContacts(ownerName);
  }


  // Добавление контакта
  @UseGuards(JwtAccessGuard)
  @Post()
  async addContact(
    @CurrentUser('name') ownerName: string,
    @Body() addContactDto: AddContactDto,
  ) {
    const displayName = addContactDto?.displayName ? addContactDto.displayName : null;

    return await this.contactsService.addContact(
      ownerName, 
      addContactDto.targetName, 
      displayName
    );
  }


  // Обновление ОТОБРАЖАЕМОГО ИМЕНИ контакта
  @UseGuards(JwtAccessGuard)
  @Patch('display-name')
  async updateContactDisplayName(
    @CurrentUser('name') ownerName: string,
    @Body() updateContactDisplayNameDto: UpdateContactDisplayNameDto
  ) {
      return await this.contactsService.updateContactDisplayName(
        ownerName, 
        updateContactDisplayNameDto.targetName, 
        updateContactDisplayNameDto.displayName
      )
  }

  
  // Удаление контакта
  @UseGuards(JwtAccessGuard)
  @Delete()
  async removeContact(
    @CurrentUser('name') ownerName: string,
    @Body() removeContactDto: RemoveContactDto
  ) {
    return await this.contactsService.removeContact(ownerName, removeContactDto.targetName);
  }
  
}
