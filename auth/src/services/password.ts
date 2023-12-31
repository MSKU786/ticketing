import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scrpytAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');

    const buf = (await scrpytAsync(password, salt, 64)) as Buffer;
    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(storePassword: string, suppliedPassword: string) {
    const [hashPassword, salt] = storePassword.split('.');
    const buf = (await scrpytAsync(suppliedPassword, salt, 64)) as Buffer;

    return hashPassword === buf.toString('hex');
  }
}
