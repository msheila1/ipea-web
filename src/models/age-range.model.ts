export class AgeRange {
  constructor(
    public id?: number,
    public min?: number,
    public max?: number,
    public value?: string,
    public label?: string,
  ) {}

  public static of(start: number = 0, end: number = 80): AgeRange[] {
    const ranges = [];
    let i = start;
    let index = 0;
    let max = end;

    while (i < end) {
      max = i + 5;
      ranges.push(new AgeRange(index++, i, max, i + '-' + max, i + ' a ' + max + ' anos'));

      i += 5;
    }

    ranges.push(new AgeRange(-1, -1, -1, 'custom', 'Outra Idade'));

    return ranges;
  }
}
