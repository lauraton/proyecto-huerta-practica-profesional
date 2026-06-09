<?php
// Validamos que los datos vengan realmente del formulario HTML
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Capturamos lo que el usuario escribió usando los atributos 'name' del HTML
    $usuarioIngresado = $_POST['usuario'];
    $passwordIngresada = $_POST['password'];

    // 1. Nos conectamos al archivo de la base de datos que creaste antes
    $db = new PDO('sqlite:usuarios.db');

    // 2. Buscamos en la base de datos si existe ese usuario con esa contraseña
    $stmt = $db->prepare("SELECT * FROM usuarios WHERE usuario = :user AND password = :pass");
    $stmt->execute([
        ':user' => $usuarioIngresado,
        ':pass' => $passwordIngresada
    ]);
    
    $resultado = $stmt->fetch();

    // 3. Si encontró una fila que coincide, da el éxito; si no, el rechazo
    if ($resultado) {
        echo "<h2>¡Inicio de sesión exitoso! Bienvenido, " . htmlspecialchars($usuarioIngresado) . ".</h2>";
    } else {
        echo "<h2>Usuario o contraseña incorrectos. Inténtalo de nuevo.</h2>";
    }
} else {
    // Si intentan entrar al archivo directo sin usar el formulario, muestra esto:
    echo "<h2>Por favor, inicia sesión desde el formulario de login.</h2>";
}
?>
