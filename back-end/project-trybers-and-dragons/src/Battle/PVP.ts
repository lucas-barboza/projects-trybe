import Battle from './Battle';
import Fighter from '../Fighter';

class PVP extends Battle {
  private _enemy: Fighter;

  constructor(player: Fighter, enemy: Fighter) {
    super(player);
    this._enemy = enemy;
  }

  fight(): number {
    while (this.player.lifePoints > 0 && this._enemy.lifePoints > 0) {
      this.player.attack(this._enemy);
      this._enemy.attack(this.player);
    }
    return super.fight();
  }
}

export default PVP;