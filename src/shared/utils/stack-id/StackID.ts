interface Config {
  ids?: number[];
  isReverse?: boolean;
}

export class StackID {
  private _ids: number[] = [];
  private _isReverse?: boolean = undefined;

  constructor();
  constructor(ids: number[]);
  constructor(config: Config);
  constructor(argument?: number[] | Config) {
    if (Array.isArray(argument)) {
      this.applyDefaultIds(argument);
    }

    if (!Array.isArray(argument) && typeof argument === "object") {
      if (Array.isArray(argument.ids)) {
        this.applyDefaultIds(argument.ids, argument.isReverse);
      }

      if (typeof argument.isReverse === "boolean") {
        this._isReverse = argument.isReverse;
      }
    }
  }

  get list(): number[] {
    return this._ids;
  }

  public next(): number {
    let nexId = this._isReverse ? -1 : 0;

    const checkNextId = () => {
      for (const id of this._ids) {
        if (id === nexId) {
          if (this._isReverse) {
            nexId--;
          } else {
            nexId++;
          }
          checkNextId();
          break;
        }
      }
    };
    checkNextId();

    this._ids.push(nexId);

    return nexId;
  }

  public remove(id: number) {
    this._ids = this._ids.filter((i) => i !== id);
  }

  private applyDefaultIds(ids: number[], isReverse?: boolean) {
    if (ids?.length) {
      let idsArray = Array.from(new Set(ids));

      if (typeof isReverse === "boolean") {
        idsArray = idsArray.filter((i) => (isReverse ? i < 0 : i >= 0));
      }

      this._ids = idsArray;
    }
  }
}
