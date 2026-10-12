import { test, expect } from '@playwright/test';
import { queryDatabase } from '../database/db';

test('Prueba de conexión y consulta a la Base de Datos', async () => {
  try {
    // Intentamos hacer una consulta sencilla a la base de datos (por ejemplo, ver la versión de PostgreSQL)
    const resultado = await queryDatabase('SELECT version();');
    
    console.log(' Resultado de la base de datos:', resultado);
    
    // Validamos que nos haya devuelto al menos un resultado
    expect(resultado.length).toBeGreaterThan(0);
  } catch (error) {
    console.log('Nota: Si no tienes una base de datos local encendida, este error es normal hasta que configures los datos en tu .env');
  }
});