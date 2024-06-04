import Battle from './Battle';
import Fighter, { SimpleFighter } from '../Fighter';

class PVE extends Battle {
  private _enemies: SimpleFighter[] | Fighter[];

  constructor(player: Fighter, enemies: SimpleFighter[]) {
    super(player);
    this._enemies = enemies;
  }

  fight(): number {
    this._enemies.forEach((enemie) => {
      while (this.player.lifePoints > 0 && enemie.lifePoints > 0) {
        this.player.attack(enemie);
        enemie.attack(this.player);
      }
    });
    return super.fight();
  }
}

export default PVE;