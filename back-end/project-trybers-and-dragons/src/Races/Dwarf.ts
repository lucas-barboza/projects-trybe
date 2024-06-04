import Race from './Race';

class Dwarf extends Race {
  private static _instance = 0;
  private _maxLifePoints: number;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    this._maxLifePoints = 80;
    Dwarf._instance += 1;
  }

  public static createdRacesInstances(): number { return Dwarf._instance; }

  get maxLifePoints(): number { return this._maxLifePoints; }
}

export default Dwarf;