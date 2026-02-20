create database PruebaTecnica;
use PruebaTecnica;
SELECT * FROM log_autorizacion;
SELECT * FROM log_transacciones;
create table log_autorizacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    response_code VARCHAR(2),          
    response_message VARCHAR(256),     
    autorization_code VARCHAR(35),  
    cash_amount DECIMAL(10,2), 
    commission_fee DECIMAL(10,2),
    client_name VARCHAR(256), 
    fecha_registro timestamp default current_timestamp
);

create table log_transacciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    strResponseCode VARCHAR(2),
    strResponseMessage VARCHAR(256),
    strAutorizationCode VARCHAR(35),
    dblCashAmount DECIMAL(10,2),
    dblCommissionFee DECIMAL(10,2),
    strName VARCHAR(255),
    fecha_transaccion timestamp default current_timestamp
);

-- Eliminar le modelo
drop table log_autorizacion;
drop table log_transacciones;
