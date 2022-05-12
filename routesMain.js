/* eslint-disable import/no-cycle */
// Este es el punto de entrada de tu aplicacion
import { HomeInit } from './Sesion/HomeInit.js';
import { NewUser } from './Sesion/NewUser.js';
import { Login } from './Sesion/Login.js';
import { MenuHome } from './Menu/MenuHome.js';
import { NavMenu } from './Sesion/NavMenu.js';

// Router
export const routes = {
  '/': HomeInit,
  '/NewUser': NewUser,
  '/Login': Login,
  '/MenuHome': MenuHome,
  '/NavMenu': NavMenu,
};
