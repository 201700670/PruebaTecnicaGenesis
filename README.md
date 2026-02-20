


# 💵 Proyecto Cashout Web App

## 📖 Descripción
Aplicación **Web Full-Stack** desarrollada con **Angular**, **Node.js (Express)** y **MySQL** que permite a los usuarios:

- 🔍 Consultar autorización de retiro de efectivo.  
- 💳 Realizar transacciones de pago (cashout estándar).  
- 🗄️ Registrar automáticamente las transacciones en una base de datos MySQL.  
- 📊 Generar reportes de autorizaciones y transacciones.  


---

## 🛠️ Tecnologías utilizadas
- **Frontend:** Angular 17 + Angular Material  
- **Backend:** Node.js + Express  
- **Base de datos:** MySQL  
- **Autenticación:** JWT (Bearer Token)  
- **Pruebas de API:** Insomnia / Postman  

---

## ⚙️ Instalación
```bash
# Clonar repositorio
git clone https://github.com/tuusuario/cashout-app.git
cd cashout-app
```
# Backend
```bash
cd backend
npm install
npm start
```

# 📡 Endpoints principales
## 🔑 Autenticación
```bash
http
POST /login
Obtiene el JWT desde la API externa.
```

## 💳 Consulta
```bash
http
POST /consulta
Consulta autorización de retiro y guarda en log_autorizacion.
```
## 💵 Pago
```bash
http
POST /pago
Realiza transacción y guarda en log_transacciones.
```
## 📊 Reportes
```bash
http
GET /reportes/autorizaciones
GET /reportes/transacciones
Lista autorizaciones y transacciones registradas.
```
## 🗄️ Estructura de tablas
```sql
CREATE TABLE log_autorizacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    response_code VARCHAR(2),
    response_message VARCHAR(256),
    autorization_code VARCHAR(35),
    cash_amount DECIMAL(10,2),
    commission_fee DECIMAL(10,2),
    client_name VARCHAR(256),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE log_transacciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    strResponseCode VARCHAR(2),
    strResponseMessage VARCHAR(256),
    strAutorizationCode VARCHAR(35),
    dblCashAmount DECIMAL(10,2),
    dblCommissionFee DECIMAL(10,2),
    strName VARCHAR(255),
    fecha_transaccion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎨 Frontend (Angular)

- Formulario de login para obtener token.
- Formulario de consulta y pago con validaciones.
- Reportes en tablas dinámicas con Angular Material (mat-table).
```bash
cd frontend
npm install
ng serve
```

```bash
POST /login                # Autenticación y obtención de JWT
POST /consulta             # Consulta autorización de retiro
POST /pago                 # Realiza transacción
GET  /reportes/autorizaciones   # Lista autorizaciones
GET  /reportes/transacciones    # Lista transacciones
```
## 🏗️ Arquitectura del proyecto
```bash
Angular (Frontend) ---> Node.js (Backend Proxy) ---> API Externa (Cashout)
                                   |
                                   v
                                MySQL (Base de datos)
```

## 🎥 Video demostrativo

Puedes ver el video de la aplicación aquí:

[▶️ Ver demo](Video.mp4)
