export class PercentMath {
  public static calculate(total: number, value: number): number {
    if (total === 0) return 0;
    return (value / total) * 100;
  }

  public static calculateProgress(total: number, value: number): string {
    return `${this.calculate(total, value)}%`;
  }
}
