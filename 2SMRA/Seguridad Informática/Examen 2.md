1. Limpieza inicial: Escribe el comando para borrar todas las reglas existentes en la tabla
filter para empezar desde cero.
**iptables -F**
2. Políticas por defecto: Configura el firewall para que sea restrictivo: DROP para todo lo
que entra ( INPUT ) y ACCEPT para todo lo que sale ( OUTPUT ).
**iptables -P INPUT DROP**
**iptables -P OUTPUR ACCEPT**
3. Tráfico local: Permite todo el tráfico en la interfaz de loopback ( lo ) para que el sistema
no falle consigo mismo.
**iptables -A INPUT -i lo -j ACCEPT**
4. Conexiones activas: Permite el tráfico entrante que corresponda a conexiones que ya
han sido establecidas o están relacionadas (ESTABLISHED, RELATED), para no
cortar tu propia sesión ni las respuestas de internet.
**iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT**
5. Acceso SSH (Puerto Personalizado): Permite nuevas conexiones SSH, pero recuerda
que en este servidor el servicio corre en el puerto 2222 (TCP).
**iptables -A INPUT -p tcp --dport 2222 -j ACCEPT**
6. Servidor de Correo: Este equipo debe recibir correos y permitir que los usuarios los
lean. Abre los puertos para SMTP (puerto 25) e IMAP (puerto 143).
**iptables -A INPUT -p tcp --dport 25 -j ACCEPT**
**iptables -A INPUT -p tcp --dport 143 -j ACCEPT**
7. Bloqueo específico: La dirección IP 10.55.0.40 está enviando spam. Bloquea todo el
tráfico proveniente de esa IP.
**iptables -A INPUT -s 10.55.0.40 -j DROP**
8. NAT (Masquerading): Habilita el enmascaramiento para que los empleados conectados
a la interfaz eth0 (LAN) puedan salir a Internet a través de la interfaz wlan0 (WAN)

**iptables -t nat -A POSTROUTING -o wlan0 -j MASQUERADE**
**iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT**
**iptables -A FORWARD -i eth0 -o wlan0 -j ACCEPT**
