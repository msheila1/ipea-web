export class CpfCnpjHelper {

  public static CPF_PATTERN: string = '###.###.###-##';
  public static CNPJ_PATTERN: string = '##.###.###/####-##';

  public static formatCpf(value: string): string {
    return CpfCnpjHelper.format(value, CpfCnpjHelper.CPF_PATTERN);
  }

  public static formatCnpj(value: string): string {
    return CpfCnpjHelper.format(value, CpfCnpjHelper.CNPJ_PATTERN);
  }

  public static formatCpfCnpj(value: string): string {
    if (!value || (value.length !== 11 && value.length !== 14)) {
      return value;
    }

    return value.length === 11 ? CpfCnpjHelper.formatCpf(value) :  CpfCnpjHelper.formatCnpj(value);
  }

  public static truncateCpfCnpj(values: string[]): string {
    const format = (value: string ) => {
      return CpfCnpjHelper.formatCpfCnpj(value);
    };

    const newValues = values != null ? values : [];
    return newValues.length > 1 ? format(newValues[0]) + '...' : format(newValues[0]);
  }

  private static format(value: string, pattern: string): string {
    const length: number = pattern.length === 14 ? 11 : 14;
    const newValue = value && value.trim();
    if (!newValue || newValue.length !== length) {
      return value;
    }

    let formatted: string = pattern;
    for (let i = 0, l = newValue.length; i < l; i++) {
      formatted = formatted.replace('#', newValue[i]);
    }

    return formatted;
  }

}
