<?php
$db = new PDO('sqlite:usuarios.db');


$db->exec("CREATE TABLE IF NOT EXISTS usuarios (
    usuario TEXT UNIQUE, 
    password TEXT
)");

$db->exec("INSERT OR IGNORE INTO usuarios (usuario, password) VALUES ('admin', '1234')");

echo "¡Base de datos y usuario administrador creados con éxito!";
?>
