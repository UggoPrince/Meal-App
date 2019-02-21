/* eslint-disable linebreak-style */
import Customers from './Customers';
import Caterers from './Caterers';

const customer = Customers.getCustomer();
const caterer = Caterers.getCaterer();

// create associations
Customers.associationWithCaterer(caterer);
Caterers.associationWithCustomer(customer);
