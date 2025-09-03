export type Nominal = { count: number; value: number };

interface ATMServiceInterface {
  getNominals(amount: number): {
    nominals: Nominal[];
    isHaveFullAmount: boolean;
    leftAmount: number;
  };
}

export class ATMService implements ATMServiceInterface {
  private nominals: number[] = [2, 50, 100, 200, 500, 1000, 2000, 5000];
  private nominalsCount: Nominal[] = [
    { count: 10, value: 2 },
    { count: 20, value: 50 },
    { count: 20, value: 100 },
    { count: 1, value: 1000 },
  ];

  public static convertNominalToArray(nominals: Nominal[]): string[] {
    return nominals.map((nominal) => `${nominal.value}x${nominal.count}`);
  }

  public getNominals(amount: number): {
    nominals: Nominal[];
    isHaveFullAmount: boolean;
    leftAmount: number;
  } {
    if (amount < this.nominals[0])
      return {
        nominals: [],
        leftAmount: 0,
        isHaveFullAmount: true,
      };

    const result = this.nominals.reduceRight<{
      amount: number;
      nominals: Nominal[];
    }>(
      (acc, nominalItem) => {
        if (nominalItem > acc.amount) return acc;

        const includeNominal = this.nominalsCount.find(
          (n) => n.value === nominalItem,
        );
        if (!includeNominal) return acc;

        const haveAmount = includeNominal.count * includeNominal.value;

        if (haveAmount < acc.amount) {
          return {
            amount: acc.amount - haveAmount,
            nominals: [
              ...acc.nominals,
              {
                value: nominalItem,
                count: includeNominal.count,
              },
            ],
          };
        }

        return {
          amount: acc.amount % nominalItem,
          nominals: [
            ...acc.nominals,
            {
              value: nominalItem,
              count: (acc.amount - (acc.amount % nominalItem)) / nominalItem,
            },
          ],
        };
      },
      { amount, nominals: [] },
    );

    return {
      nominals: result.nominals,
      leftAmount: result.amount,
      isHaveFullAmount: result.amount <= 0,
    };
  }
}
