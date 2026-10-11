import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import * as dotenv from 'dotenv';
import datosUsuarios from '../Usuario.json'; // Ajusta la ruta si está en otra carpeta

dotenv.config();

test.describe('Suite de Autenticación Negativa - Proyecto Softtek', () => {

  datosUsuarios.forEach((data) => {
    test(`Validar mensaje de error para: ${data.escenario}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const url = process.env.BASE_URL || 'https://www.saucedemo.com';

      // 1. Navegar al Login
      await loginPage.navegarAlLogin(url);

      // 2. Intentar login con los datos del JSON
      await loginPage.hacerLogin(data.usuario, data.clave);

      // 3. Validar mensaje de error
      await expect(loginPage.mensajeError).toBeVisible();
      await expect(loginPage.mensajeError).toContainText(data.mensajeErrorEsperado);
    });
  });

});