import { test, expect } from '@playwright/test';

// Usamos una API REST pública gratuita para pruebas
const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('Pruebas de Servicios API REST con Playwright', () => {

  test('GET - Obtener listado de publicaciones y validar estado 200', async ({ request }) => {
    // 1. Enviar petición GET
    const response = await request.get(`${BASE_URL}/posts`);

    // 2. Validar código de respuesta HTTP 200 OK
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    // 3. Convertir respuesta a JSON y validar estructura
    const responseBody = await response.json();
    expect(responseBody.length).toBeGreaterThan(0);
    expect(responseBody[0]).toHaveProperty('id');
    expect(responseBody[0]).toHaveProperty('title');
  });

  test('POST - Crear un nuevo registro y validar estado 201', async ({ request }) => {
    // Definimos los datos de prueba (newPost) que faltaban
    const newPost = {
      title: 'Prueba de API con Playwright',
      body: 'Testing automatizado de servicios REST',
      userId: 1,
    };

    // 1. Enviar petición POST con el body y los datos
    const response = await request.post(`${BASE_URL}/posts`, {
      data: newPost,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });

    // 2. Validar creación (201 Created)
    expect(response.status()).toBe(201);

    // 3. Validar los datos devueltos en la respuesta
    const responseBody = await response.json();
    expect(responseBody.title).toBe(newPost.title);
    expect(responseBody.body).toBe(newPost.body);
    expect(responseBody).toHaveProperty('id');
  });

});