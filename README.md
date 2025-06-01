# Laboratorio 3 - Tarea Grupal

## Integrantes

| Alumno                                  | Codigo      |
| --------------------------------------- | ----------- |
| **Néstor Josué Martínez Rivera**        | _u20240271_ |
| **Alex Francisco Lovos Argueta**        | _u20247471_ |
| **Steveen Antonio Portillo Gómez** <br> | _u20240573_ |

## Sistema de Procesamiento de Órdenes de E-commerce

Este proyecto simula un sistema sofisticado de procesamiento de órdenes para una plataforma de comercio electrónico multinacional. Diseñado para manejar grandes volúmenes de transacciones diarias, el sistema garantiza eficiencia, seguridad y una experiencia fluida para el cliente.

### Objetivo General

Desarrollar un sistema extensible y robusto que gestione el ciclo completo de una orden, desde la validación hasta el despacho, incluyendo notificaciones al cliente y coordinación con servicios internos y externos.

## Funcionalidades Principales

- **Validación de Órdenes**: Flujo secuencial por etapas: inventario, pagos, envío, fraude y fulfillment.
    
- **Notificaciones**: Actualizaciones en tiempo real sobre el estado de la orden.
    
- **Gestión de Inventario**: Comunicación automática con proveedores y actualización del stock.
    
- **Detección de Fraude**: Validaciones de seguridad y análisis automático de tarjetas.
    
- **Reportes de Ventas**: Generación de reportes para departamentos internos.
    
- **Sistema Extensible**: Permite agregar nuevas validaciones o servicios sin modificar la lógica base.
    
- **Roles de Usuario**: Usuarios registrados y un usuario administrador con funciones avanzadas.
    

## Requisitos Técnicos

- Uso del **Patrón Mediador (Mediator Pattern)**
    
- Implementación del **Patrón Cadena de Responsabilidad (Chain of Responsibility)**
    
- Uso de **Enums**
    
- Validaciones y **manejo de excepciones**
    
- Buenas prácticas de código y estructura organizada
    
- Uso de **GitHub** para trabajo colaborativo
    

## Usuario Administrador

El sistema ya incluye un usuario administrador preconfigurado con las siguientes credenciales:

- **Correo**: `admin@admin.com`
    
- **Contraseña**: `admin`
    

### Funciones del Administrador

- Gestionar el stock de productos
    
- Crear y administrar categorías
    
- Añadir, editar, eliminar y visualizar productos
    
- Administrar el estado de las órdenes: `Pendiente → En camino → Entregada / Cancelada`
    

## Funciones del Usuario

- Registro e inicio de sesión
    
- Navegación por productos y categorías
    
- Realizar compras de uno o múltiples productos
    
- Envío prioritario para pedidos mayoristas (más de 10 productos)
    
- Métodos de pago:
    
    - Tarjetas: Visa, Mastercard, Discover
        
    - PayPal
        
- Validación automática de tarjetas soportadas
    
- Ingreso de dirección de envío tras la compra
    
- Visualización del estado de su orden en tiempo real
    
- Recepción de factura electrónica detallada vía correo
    

## Facturación

El sistema envía una factura digital al correo del usuario que incluye:

- Detalle de productos comprados
    
- Precios unitarios y totales
    
- Impuestos aplicables
    
- Gastos de envío
    

## Entregables

- Enlace al repositorio en GitHub con todo el historial de trabajo colaborativo
    
- Archivo `.zip` con el código completo
    

## 📅 Fecha de entrega

🗓️ **31 de mayo de 2025**
