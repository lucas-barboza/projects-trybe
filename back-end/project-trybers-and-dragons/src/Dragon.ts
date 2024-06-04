import Monster from './Monster';

class Dragon extends Monster {
  constructor(strength = 63) {
    super(999, strength);
  }
}

export default Dragon;