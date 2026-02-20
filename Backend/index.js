const fs = require('fs');
const path = require('path');
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8090;

const envPath = path.join(__dirname, '.env');
require('dotenv').config({ path: envPath });

// Configuración de CORS
app.use(cors({
    origin: ['http://localhost:4200'],
    methods: "GET,PUT,POST",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Rutas
app.get('/', (req, res) => {
    console.log("WELCOME TO APP! GET");
    res.send("WELCOME TO APP!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.post('/consulta', async (req, res) => {
  try {
    const token = req.headers['authorization']; 
    const body = req.body; 

    const response = await axios.post(
      'https://trxdvpy.akisi.com:8443/cashout/api/consulta',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }
    );

    const data = response.data;

    const query = `
      INSERT INTO log_autorizacion 
      (response_code, response_message, autorization_code, cash_amount, commission_fee, client_name) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    connection.query(query, [
      data.strResponseCode,
      data.strResponseMessage,
      data.strAutorizationCode,
      data.dblCashAmount,
      data.dblCommissionFee,
      data.strName
    ], (err, result) => {
      if (err) {
        console.error('Error al insertar en DB:', err);
        return res.status(500).json({ error: 'Error al guardar en DB' });
      }
      console.log('Registro insertado con ID:', result.insertId);
      res.json({ success: true, id: result.insertId, data });
    });

  } catch (error) {
    console.error('Error en consulta:', error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Error en consulta'
    });
  }
});



app.post('/login', async (req, res) => {

  try {
    const { username, password } = req.body;

    const response = await axios.post(
      'https://trxdvpy.akisi.com:8443/cashout/authenticate',
      { username, password },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const token = response.data.token;
    res.json({ token });
  } catch (error) {
    console.error('Error en login:', error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Error en autenticación'
    });
  }
});

app.post('/pago', async (req, res) => {
    console.log("SI ENTRA A PAGO")
  try {
    const token = req.headers['authorization'];
    const body = req.body; 

    const response = await axios.post(
      'https://trxdvpy.akisi.com:8443/cashout/api/pago',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }
    );

    const data = response.data;

    const query = `
      INSERT INTO log_transacciones 
      (strResponseCode, strResponseMessage, strAutorizationCode, dblCashAmount, dblCommissionFee, strName) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    connection.query(query, [
      data.strResponseCode,
      data.strResponseMessage,
      data.strAutorizationCode,
      data.dblCashAmount,
      data.dblCommissionFee,
      data.strName
    ], (err, result) => {
      if (err) {
        console.error('Error al insertar en DB:', err);
        return res.status(500).json({ error: 'Error al guardar en DB' });
      }
      console.log('Transacción insertada con ID:', result.insertId);
      res.json({ success: true, id: result.insertId, data });
    });

  } catch (error) {
    console.error('Error en pago:', error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Error en pago'
    });
  }
});

app.get('/reportes/autorizaciones', (req, res) => {
  const query = 'SELECT * FROM log_autorizacion ORDER BY fecha_registro DESC';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener autorizaciones:', err);
      return res.status(500).json({ error: 'Error al obtener autorizaciones' });
    }
    res.json(results);
  });
});

app.get('/reportes/transacciones', (req, res) => {
  const query = 'SELECT * FROM log_transacciones ORDER BY fecha_transaccion DESC';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener transacciones:', err);
      return res.status(500).json({ error: 'Error al obtener transacciones' });
    }
    res.json(results);
  });
});

