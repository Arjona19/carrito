USE heroku_e12b52604cab367;

CREATE TABLE IF NOT EXISTS ventasMater(
	ventaMasterId INT AUTO_INCREMENT PRIMARY KEY,
    usuarioId VARCHAR(200),
    fecha DATE NOT NULL,
    total FLOAT NOT NULL,
    claveTransaccionPaypal TEXT,
    claveCompradorPaypal TEXT,
    estadoPaypal TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_ventasMaster_Usuario FOREIGN KEY(usuarioId) REFERENCES users(iduser)
); 

CREATE TABLE IF NOT EXISTS detallesVenta(
	detallesVentaId INT AUTO_INCREMENT PRIMARY KEY,
    ventaMasterId INT,
    productoId INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_detallesVenta_ventasMater FOREIGN KEY(ventaMasterId) REFERENCES ventasMater(ventaMasterId),
    CONSTRAINT FK_detallesVenta_Usuario FOREIGN KEY(productoId) REFERENCES productos(ID)
);