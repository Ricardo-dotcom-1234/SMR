---
mindmap-plugin: basic
---

# Unidad 3

## Factores a valorar:
- Confidencialidad
	- Se debe:
		- Cifrar los daos
		- Prever cómo deshacerse de los dispositivos para evitar robo de datos
		- Establecer unas políticas adecuadas de acceso
- Rendimiento
	- Factores de los que depende:
		- Tipo del medio de almacenamiento
		- La cercanía del medio de almacenamiento.
		- Redundancia de discos (RAIDs)
- Integridad
	- Mantenimiento adecuado
	- Monitorización de discos
	- Redundancia de discos
	- Copias de seguridad
	- Recuperación de datos
- Accesibilidad
	- Depende en gran medida de:
		- arquitectura de almacenamiento
- Disponibilidad
	- En particular
		- Redundancia de discos (RAIDs)

## Políticas de almacenamiento
- Análisis exhaustivo de datos
- Determinación de la estrategia de almacenamiento
- Gestión de los dispositivos de almacenamiento.
- Definición de la política de copias de respaldo
- Plan de contingencias

## Confidencialidad
- Tipos
	- Información confidencial
		- debe identificarse como tal
		- Debe definir estrictos controles de acceso
		- Si es preciso sacar la información de las instalaciones, debe cifrarse
		- debe cumplir las exigencias del RGPD
	- Información interna
		- Debe identificarse como tal
		- Debe ser accesible a todo el personal
		- Salvo indicación contraria de la dirección, no debe difundirse fuera de la organización
	- Información pública
		- Información que genera la empresa para su difusión universal

## Cifrado de datos
- Se exige que las operaciones de cifrado y descifrado se hagan de manera transparente, sin que el usuario tenga que utilizar las herramientas criptográficas cada vez que desee guardar o leer un fichero.

## Fundamentos teóricos
- Cifrar un archivo puntual con openssl/GPG es útil si se quiere portar un archivo pero impracticable si lo que se pretende es almacenar archivos en disco.
- Solución
	- El cifrado por hardware
	- El cifrado de dispositivos de bloques
	- El cifrado usando el propio sistema de archivos
	- El cifrado del contenido de parte de un sistema de archivos
		- enfcs
		- cryfs
		- gocryptfs

## Eliminación de datos
- tengamos presentes dos cosas
	- Sub title