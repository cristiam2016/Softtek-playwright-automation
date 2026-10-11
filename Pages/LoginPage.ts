    import { Page, Locator } from '@playwright/test';

// La palabra 'export' permite que login.spec.ts pueda importar esta clase
export class LoginPage {
    readonly page: Page;
    readonly campoUsuario: Locator;
    readonly campoClave: Locator;
    readonly botonIngresar: Locator;
    readonly mensajeError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.campoUsuario = page.locator('#user-name');
        this.campoClave = page.locator('#password');
        this.botonIngresar = page.locator('#login-button');
        this.mensajeError = page.locator('[data-test="error"]');
    }

    async navegarAlLogin(url: string) {
        await this.page.goto(url);
    }

    async hacerLogin(usuario: string, clave: string) {
        await this.campoUsuario.fill(usuario);
        await this.campoClave.fill(clave);
        await this.botonIngresar.click();
    }
}