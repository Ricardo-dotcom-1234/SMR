**iptables -F**

**iptables -A INPUT -p tcp --dport 8080 -m mac ! --mac-source AA:BB:CC:DD:EE:FF -j DROP**

**iptables -A INPUT -p tcp --dport 22 -m time --timestart 08:00 --timestop 18:00 -j ACCEPT**
**iptables -A INPUT -p tcp --dport 22 -j DROP**

**iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000**

**iptables -A INPUT -p tcp --dport 80 -m connlimit --connlimit-above 20 -j REJECT**

**iptables -A INPUT -p tcp --dport 21 -j REJECT --reject-with tcp-reset**

**iptables -A INPUT -p udp --dport 53 -j ACCEPT**

