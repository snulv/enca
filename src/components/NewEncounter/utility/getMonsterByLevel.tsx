import {default as monstersByLevel} from './monsterByLevel.json';
import {IMonster} from "../types/monster";

const getMonsterByLevel = (level: string): IMonster => {
  const monster = (monstersByLevel as IMonster[]).find(item => item.level === level);
  if (monster) {
    return monster;
  }
  return monstersByLevel[0] as IMonster;
};

export default getMonsterByLevel;