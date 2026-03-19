export const state = {
  wave: 70,
  integrity: 50,
  mode: "steady",
  color: "green",
  pressure: 0,

  fox: null,
  mvs: [],

  xp: 0,
  level: 1,

  history: [],
  achievements: [],
  streak: 0,
  last: null
};

export const modules = [];

export function registerModule(fn) {
  modules.push(fn);
}
