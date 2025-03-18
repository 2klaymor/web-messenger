import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { ContactsService } from './contacts.service';


@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  
  @Get()
  async getContacts() {
    
  }


  @Post(':target')
  async addContact(@Param('target') targetName: string) {
    
  }

  
}
