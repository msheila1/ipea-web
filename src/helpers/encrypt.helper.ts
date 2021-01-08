export class EncryptHelper {

  public static MASK: string = '********';

  public static isMasked(value: string): boolean {
    return value && value === EncryptHelper.MASK  ? true : false;
  }

  public static isNotMasked(value: string): boolean {
    return !EncryptHelper.isMasked(value);
  }

}
