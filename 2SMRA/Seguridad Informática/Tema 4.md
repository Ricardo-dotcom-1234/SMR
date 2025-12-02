Ejercicio 1. Establece una política predeterminada para bloquear todas las conexiones
entrantes. Verifica que no tienes la posibilidad de conectarte con ninguna página web o de
hacer ping.
**iptables -P INPUT DROP**
![[Pasted image 20251128100207.png]]
Ejercicio 2. Establece una política predeterminada para permitir todas las conexiones
entrantes. Debes volver a tener la posibilidad de ver páginas web o hacer ping.
**ipetables -P INPUT ACCEPT**
![[Pasted image 20251128100311.png]]
Ejercicio 3. Crea un servidor web con python (python3 -m http.server 80). Agrega una regla
que permita las conexiones entrantes al puerto de dicho servidor web. Verifica que funciona.
**iptables -A INPUT -p tcp --dport 80 -j ACCEPT**
![[Pasted image 20251128100748.png]]
Ejercicio 4. Borra la regla del ejercicio 3.
**iptables -D INPUT**
![[Pasted image 20251128100944.png]]
Ejercicio 5. Bloquea todo el tráfico entrante de una dirección IP, por ejemplo, la
192.168.1.10.
**iptables -A INPUT -s 192.168.1.10 -j DROP**
![[Pasted image 20251128101130.png]]
Ejercicio 6. Elimina la regla anterior usando algún método distinto al empleado en el
ejercicio 4.
**iptables -D INPUT -s 192.168.1.10 -j DROP**
![[Pasted image 20251128101355.png]]
Ejercicio 7. Permite solo el tráfico de salida, pero no el tráfico de entrada, mediante
políticas predeterminadas. Recuerda agregar una regla para permitir las conexiones
establecidas y relacionadas (para que las respuestas a las request de salida funcionen).
Haz pruebas para verificar que funcionan las conexiones de salida, pero no las de entrada.
**iptables -P INPUT DROP
iptables -P OUTPUT ACCEPT**
![[Pasted image 20251128101641.png]]
**iptables -A** INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
![[Pasted image 20251128102251.png]]
Ejercicio 8. Crea una regla para redirigir todo el tráfico entrante del puerto 8080 al puerto
80. Haz una prueba entrando al puerto 8080 (debes tener funcionando el servidor web del
ejercicio 3).
**iptables -t nat -A PREROUTING -p tcp --dport 8080 -j REDIRECT --to-port 80**
![[Pasted image 20251128102751.png]]
Ejercicio 9. Evita ataques de fuerza bruta. Un ataque de fuerza bruta consiste en el empleo
de herramientas para probar con múltiples combinaciones de usuarios y contraseña (a
veces conocido como wordlist o diccionarios). Un ataque de fuerza bruta puede ser muy
peligroso, especialmente a servicios como SSH. En este caso vamos a crear una regla de
iptables que permita evitarlos, limitando a 5 el número máximo de conexiones al puerto 22
desde una determinada IP.
**iptables -A INPUT -p tcp --dport 22 -m connlimit --connlimit-above 5 --connlimit-mask 32 -j DROP**
![[Pasted image 20251128102938.png]]







IPTABLES 2
Ejercicio 1. Configurar reglas para mitigar ataques de denegación de servicio (DoS) basados en  paquetes SYN.
**iptables -A INPUT -p tcp --syn -m limit --limit 10/s --limit-burst 20 -j ACCEPT
iptables -A INPUT -p tcp --syn -j DROP**
![[Pasted image 20251202141500.png]]
Ejercicio 2. Hacer que una máquina actúe como router y permita a una subred privada acceder a Internet.
**echo 1 > /proc/sys/net/ipv4/ip_forward
iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -o eth0 -j MASQUERADE**
![[Pasted image 20251202141604.png]]
![[Pasted image 20251202141649.png]]
Ejercicio 3. Usar el módulo string para filtrar tráfico basado en contenido (por ejemplo, bloquear solicitudes HTTP sospechosas).
**iptables -A INPUT -p tcp --dport 80 -m string --string "/etc/passwd" --algo bm -j DROP**
![[Pasted image 20251202141750.png]]
Ejercicio 4. Limitar conexiones por IP usando el módulo hashlimit (más avanzado que limit).
**iptables -A INPUT -p tcp --dport 22 -m hashlimit  --hashlimit 3/min --hashlimit-burst 5 --hashlimit-mode srcip  --hashlimit-name ssh_limit -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -j DROP**
![[Pasted image 20251202142023.png]]
Ejercicio 5. Distribuir tráfico entrante entre varios puertos internos (simulando balanceo).
**iptables -t nat -A PREROUTING -p tcp --dport 80 -m statistic --mode nth --every 2 --packet 0 -j DNAT --to-destination 192.168.1.10:80
iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 192.168.1.11:80**
![[Pasted image 20251202142451.png]]
Ejercicio 6. Detectar y bloquear intentos de escaneo (como los de nmap)
**iptables -A INPUT -p tcp --tcp-flags ALL NONE -j DROP
iptables -A INPUT -p tcp --tcp-flags ALL ALL -j DROP
iptables -A INPUT -p tcp --tcp-flags ALL FIN,PSH,URG -j DROP
iptables -A INPUT -p tcp --tcp-flags SYN,RST SYN,RST -j DROP**
![[Pasted image 20251202142710.png]]

