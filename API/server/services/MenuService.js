/* eslint-disable linebreak-style */
/* eslint-disable no-console */

import Menu from '../models/Menu';

class MenuService {
  constructor() {
    this.menu = [];
  }

  getAllMenus() {
    let { menu } = this.menu;
    if (this.menu.length !== 0) {
      menu = this.menu.map((data) => {
        const menus = new Menu();
        menus.id = data.id;
        menus.meals = data.meals;
        menus.caterer_id = data.caterer_id;
        menus.created_at = data.created_at;
        return menus;
      });
    }
    return menu;
  }

  menuExist() {
    if (this.menu.length === 0) {
      return false;
    }
    return true;
  }

  get() {
    return this.getAllMenus();
  }

  add(meals, catererID, date) {
    const totalMenus = this.menu.length;
    const id = totalMenus + 1;
    if (totalMenus < 1) {
      const i = totalMenus;
      this.menu[i] = {
        id,
        meals,
        caterer_id: catererID,
        created_at: date,
      };
    } else {
      const menus = this.getAllMenus();
      for (let i = 0; i < menus.length; i += 1) {
        if (menus[i].caterer_id === catererID) {
          this.menu[i] = menus[i];
          break;
        }
      }
      const m = {
        id,
        meals,
        caterer_id: catererID,
        created_at: date,
      };
      this.menu.push(m);
    }
    return this.getAllMenus()[id - 1]; // -1 because it's an array
  }
}

export default MenuService;
