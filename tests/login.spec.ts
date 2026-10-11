import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import * as dotenv from 'dotenv';

// Cargar variables del .env
dotenv.config();

test.describe('Suite de Autenticación - Proyecto Softtek', () => {

    test('Validar Login exitoso en plataforma bancaria', async ({ page }) => {
        // 1. Obtener variables de entorno
        const url = 'https://www.saucedemo.com';
        const usuario = 'standard_user';
        const clave = 'secret_sauce';
        // 2. Instanciar la página POM
        const loginPage = new LoginPage(page);

        // 3. Ejecutar flujo
        await loginPage.navegarAlLogin(url);
        await loginPage.hacerLogin(usuario, clave);
        await page.waitForTimeout(5000); // Pausa de 5 segundos

        // 4. Aseveración (Assert / Expect)
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

});