import Archetype from './Archetypes';
import { EnergyType } from '../Energy';

class Necromancer extends Archetype {
  private _energyType: EnergyType = 'mana';
  private static _instance = 0;

  constructor(name: string) {
    super(name);
    Necromancer._instance += 1;
  }

  get energyType(): EnergyType { return this._energyType; }
  
  public static createdArchetypeInstances(): number {
    return Necromancer._instance;
  }
}

export default Necromancer;