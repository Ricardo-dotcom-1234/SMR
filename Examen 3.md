1. Política de "Cero Confianza": Configura las políticas por defecto de INPUT y FORWARD en DROP. (Asegúrate de permitir OUTPUT para que el servidor pueda descargar actualizaciones si es necesario).
iptables -P INPUT DROP
iptables -P FORWAD DROP
iptables -P OUTPUT ACCEPT
2. Mantenimiento de sesión: Permite el tráfico entrante de conexiones que ya han sido establecidas previamente.
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
3. Gestión Segura: Permite el acceso SSH (puerto 22), pero ÚNICAMENTE si la conexión proviene de la subred de administración ( 10.0.0.0/24 ). Cualquier intento de SSH desde otra IP debe ser descartado.
iptables -A INPUT -s 10.0.0.0/24 -p tcp --dport 22 -j ACCEPT
4. Conexión de Base de Datos: Permite el tráfico al puerto de MySQL (por defecto 3306), pero SOLO si proviene de la IP del Servidor de Aplicaciones ( 10.0.0.50 ).
iptables -A INPUT -s 10.0.0.50 -p tcp --dport 3306 -j ACCEPT
5. Silencio (Stealth): Bloquea explícitamente las solicitudes de Ping (ICMP echo-request) para que el servidor no responda si alguien escanea la red.
iptables -A INPUT -p icmp --icmp-type echo-request -j DROP
6. Protección contra Fuerza Bruta (Avanzado): Configura una regla para que, si alguien de la red de administración intenta conectarse por SSH más de 3 veces en 60 segundos, sus paquetes sean descartados temporalmente. (Pista: usa el módulo recent o limit ).
iptables -A
7. El "Chivato" (Logging): Antes de que las reglas por defecto descarten cualquier otro paquete no autorizado, registra el evento en el log del sistema con el prefijo "IPTABLES-DROP: ".