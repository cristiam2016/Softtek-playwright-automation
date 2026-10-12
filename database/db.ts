import { Client } from 'pg';
import * as dotenv from 'dotenv';

// Cargamos las variables de entorno
dotenv.config();

export async function queryDatabase(sqlQuery: string, params: any[] = []) {
  // Configuración de la conexión usando variables de entorno o valores por defecto
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'test_db',
  });

  try {
    await client.connect();
    console.log(' Conexión a la Base de Datos establecida.');
    const result = await client.query(sqlQuery, params);
    return result.rows;
  } catch (error) {
    console.error('❌ Error ejecutando la consulta SQL:', error);
    throw error;
  } finally {
    await client.end();
    console.log('🔒 Conexión a la Base de Datos cerrada.');
  }
}