export class AddContactDto {
  targetName: string;
  displayName?: string;
}

export class UpdateContactDisplayNameDto {
  targetName: string;
  displayName: string;
}

export class RemoveContactDto {
  targetName: string;
}