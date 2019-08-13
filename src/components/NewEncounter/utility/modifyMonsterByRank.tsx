import {default as monstersByRank} from './monsterByRank.json';
import {IMonster} from "../types/monster";
import {IRank} from "../types/rank";

const getRank = (type: string): IRank => {
  const rank = (monstersByRank as IRank[]).find(item => item.type === type);
  if (rank) {
    return rank;
  }
  return monstersByRank[0] as IRank;
};

const modifyMonsterByRank = (monster: IMonster, type: string, numberOfPlayer: number): IMonster => {
  const rank = getRank(type);

  let modifiedMonster = { ...monster };

  modifiedMonster.rank = type;
  modifiedMonster.ac =            Math.round(Number(modifiedMonster.ac) + Number(rank.ac)).toString();
  modifiedMonster.save1 =         Math.round(Number(modifiedMonster.save1) + Number(rank.saving)).toString();
  modifiedMonster.save2 =         Math.round(Number(modifiedMonster.save2) + Number(rank.saving)).toString();
  modifiedMonster.save3 =         Math.round(Number(modifiedMonster.save3) + Number(rank.saving)).toString();
  if (rank.hp === "-1") { // Is boss rank
    modifiedMonster.hp =          Math.round(Number(modifiedMonster.hp) * numberOfPlayer).toString();
  } else {
    modifiedMonster.hp =          Math.round(Number(modifiedMonster.hp) * Number(rank.hp)).toString();
  }
  modifiedMonster.attack    =        Math.round(Number(modifiedMonster.attack)   + Number(rank.attack)).toString();
  modifiedMonster.spellDC1  =        Math.round(Number(modifiedMonster.spellDC1) + Number(rank.attack)).toString();
  modifiedMonster.spellDC2  =        Math.round(Number(modifiedMonster.spellDC2) + Number(rank.attack)).toString();
  modifiedMonster.damage    =        Math.round(Number(modifiedMonster.damage) * Number(rank.dmg)).toString();
  modifiedMonster.perception =    Math.round(Number(modifiedMonster.perception) + Number(rank.perception)).toString();
  modifiedMonster.stealth =       Math.round(Number(modifiedMonster.stealth) + Number(rank.stealth)).toString();
  modifiedMonster.init =          Math.round(Number(modifiedMonster.init) + Number(rank.init)).toString();
  modifiedMonster.paragon = [...modifiedMonster.paragon, ...rank.traits];

  return modifiedMonster;
};

export default modifyMonsterByRank;