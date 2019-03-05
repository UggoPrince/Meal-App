/* eslint-disable linebreak-style */
import { buildTables } from './Sequelizer';
import Customers from './Customers';
import Caterers from './Caterers';
import Meals from './Meals';
import Menu from './Menu';
import Orders from './Orders';

export const customers = Customers.getCustomer();
export const caterers = Caterers.getCaterer();
export const meals = Meals.getMeal();
export const menu = Menu.getMenu();
export const orders = Orders.getOrder();

// create associations
Customers.associationWithCaterer(caterers, 'CustomersCaterer');
Caterers.associationWithCustomer(customers, 'CustomersCaterer');
Meals.associationWithCaterer(caterers);
Menu.associationWithCaterer(caterers);
Orders.association(meals);
Orders.association(customers);
Orders.association(caterers);

export const testTables = buildTables;
