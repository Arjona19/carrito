SELECT name , email, phone,fecha , total, claveTransaccionPaypal,claveCompradorPaypal,estadoPaypal,
titulo, descripcion, autor
from heroku_e12b52604cab367.ventasmaster a 
INNER JOIN heroku_e12b52604cab367.users b on a.usuarioId = b.iduser 
INNER JOIN heroku_e12b52604cab367.detallesventa c on a.ventaMasterId = c.ventaMasterId
INNER JOIN heroku_e12b52604cab367.productos d on c.productoId = d.ID;