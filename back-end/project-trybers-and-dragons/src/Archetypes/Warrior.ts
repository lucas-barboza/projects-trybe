import Archetype from './Archetypes';
import { EnergyType } from '../Energy';

class Warrior extends Archetype {
  private _energyType: EnergyType = 'stamina';
  private static _instance = 0;

  constructor(name: string) {
    super(name);
    Warrior._instance += 1;
  }

  get energyType(): EnergyType { return this._energyType; }
  
  public static createdArchetypeInstances(): number {
    return Warrior._instance;
  }
}

export default Warrior;