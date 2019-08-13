import {default as monstersByRole} from './monsterByRole.json';
import {IMonster} from "../types/monster";
import {IRole} from "../types/role";

const getRole = (type: string): IRole => {
  const role = (monstersByRole as IRole[]).find(item => item.type === type);
  if (role) {
    return role;
  }
  return monstersByRole[0] as IRole;
};

const modifyMonsterByRole = (monster: IMonster, type: string): IMonster => {
  const role = getRole(type);

  let modifiedMonster = { ...monster };

  modifiedMonster.type = type;
  modifiedMonster.ac =        Math.round((Number(modifiedMonster.ac) + Number(role.ac))).toString();
  modifiedMonster.save1 =     Math.round((Number(modifiedMonster.save1) + Number(role.saving))).toString();
  modifiedMonster.save2 =     Math.round((Number(modifiedMonster.save2) + Number(role.saving))).toString();
  modifiedMonster.save3 =     Math.round((Number(modifiedMonster.save3) + Number(role.saving))).toString();
  modifiedMonster.hp =        Math.round((Number(modifiedMonster.hp) * Number(role.hp))).toString();
  modifiedMonster.attack    =    Math.round((Number(modifiedMonster.attack)   + Number(role.attack))).toString();
  modifiedMonster.spellDC1  =    Math.round((Number(modifiedMonster.spellDC1) + Number(role.attack))).toString();
  modifiedMonster.spellDC2  =    Math.round((Number(modifiedMonster.spellDC2) + Number(role.attack))).toString();
  modifiedMonster.damage =    Math.round((Number(modifiedMonster.damage) * Number(role.dmg))).toString();
  modifiedMonster.speed =     Math.round((Number(modifiedMonster.speed) + Number(role.speed))).toString();
  if (role.perception) {
    modifiedMonster.perception = Math.round((Number(modifiedMonster.perception) + Number(modifiedMonster.prof))).toString();
  } else {
    modifiedMonster.perception = Number(modifiedMonster.perception).toString();
  }
  if (role.stealth) {
    modifiedMonster.stealth = Math.round((Number(modifiedMonster.stealth) + Number(modifiedMonster.prof))).toString();
  } else {
    modifiedMonster.stealth = Number(modifiedMonster.stealth).toString();
  }
  if (role.init) {
    modifiedMonster.init = Math.round((Number(modifiedMonster.init) + Number(modifiedMonster.prof))).toString();
  } else {
    modifiedMonster.init = Number(modifiedMonster.init).toString();
  }

  return modifiedMonster;
};

export default modifyMonsterByRole;