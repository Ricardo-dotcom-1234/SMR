**Tarea:**
Implementa las reglas de iptables necesarias para cumplir con los requisitos de seguridad
mencionados. Este es un ejercicio básico que requiere solo 5 reglas fundamentales para
proteger la red mientras se mantiene la funcionalidad necesaria.

**iptables -P INPUT DROP**
**iptables -P FORWARD DROP**
**Iptables -P OUTPUT ACCEPT**

**iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A FORWARD -m state --state ESTABLISHED,RELATED -j ACCEPT**

**iptables -A INPUT -s 192.168.1.10-192.168.1.30 -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -s 192.168.1.10-192.168.1.30 -p tcp --dport 443 -j ACCEPT**

**iptables -A FORWARD -s 192.168.1.0/24 -d 192.168.1.5 -p tcp --dport 80 -j ACCEPT**

**iptables -A INPUT -s 192.168.1.0/24 -p icmp --icmp-type echo-request -j ACCEPT**


Tarea:
Implementa las reglas de iptables necesarias para cumplir con todos los requisitos de
seguridad mencionados anteriormente. Procura mantener la red segura mientras permites el
funcionamiento normal de los servicios requeridos

**iptables -P INPUT DROP**
**iptables -P FORWARD DROP**
**Iptables -P OUTPUT ACCEPT**

**iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A FORWARD -m state --state ESTABLISHED,RELATED -j ACCEPT

**iptables -A FORWARD -s 192.168.0.50/26 -d 192.168.0.10 -p tcp --dport 80 -j ACCEP**

**iptables -A INPUT -s 192.168.0.20 -p tcp --dport 445 -j ACCEPT**

**iptables -A INPUT -s 200.100.50.10 -p tcp --dport 80 -j ACCEPT**

**iptables -A INPUT -s 192.168.0.0/24 -p icmp --icmp-type echo-request -j ACCEPT**


Tarea:
Implementa las reglas de iptables necesarias para cumplir con todos los requisitos de
seguridad mencionados anteriormente. Asegúrate de mantener la seguridad de la red
mientras permites el funcionamiento normal de los servicios necesarios

**iptables -P INPUT DROP**
**iptables -P FORWARD DROP**
**iptables -P OUTPUT DROP**

**iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A FORWARD -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A DROP -m state --state ESTABLISHED,RELATED -j ACCEPT

**iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT**

**iptables -A FORWARD -s 192.168.1.50/25 -d 192.168.1.10 -p tcp --dport 80 -j ACCEPT
iptables -A FORWARD -s 192.168.1.50/25 -d 192.168.1.10 -p tcp --dport 443 -j ACCEPT**

**iptables -A FORWARD -s 10.10.10.0/24 -d 192.168.1.0/24 -p tcp --dport 22 -j ACCEPT**

**iptables -A FORWARD -d 172.16.1.5 -p tcp --dport 80 -j ACCEPT
iptables -A FORWARD -d 172.16.1.5 -p tcp --dport 443 -j ACCEPT**

**iptables -A FORWARD -s 192.168.1.10 -d 192.168.1.20 -p tcp --dport 3306 -j ACCEPT**

**iptables -A FORWARD ! -s 192.168.1.0/24 -d 10.10.10.0/24 -j DROP**

**iptables -A FORWARD -s 192.168.1.0/24 -p icmp --icmp-type echo-request -j ACCEPT
iptables -A OUTPUT -s 192.168.1.0/24 -p icmp --icmp-type echo-request -j ACCEPT**
