export class CepHelper {

  public static REGEX: RegExp = /^([\d]{5})\-*([\d]{3})/;

  public static format(value: string): string {
    return value && CepHelper.REGEX.test(value) ? value.replace(CepHelper.REGEX, '$1-$2') : value;
  }

}
