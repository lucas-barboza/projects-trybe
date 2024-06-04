import Archetype from './Archetypes';
import { EnergyType } from '../Energy';

class Mage extends Archetype {
  private _energyType: EnergyType = 'mana';
  private static _instance = 0;

  constructor(name: string) {
    super(name);
    Mage._instance += 1;
  }

  get energyType(): EnergyType { return this._energyType; }
  
  public static createdArchetypeInstances(): number {
    return Mage._instance;
  }
}

export default Mage;