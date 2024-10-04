import { v4 as uuid } from 'uuid';

interface Generator {
  generate(): string;
}

export class IdentifierGenerator implements Generator {
  generate(): string {
    return uuid();
  }
}