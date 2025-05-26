# Laboratorio 3 Tarea Grupal

## Integrantes

- Néstor Josué Martínez Rivera **u20240271**
- Alex Francisco Lovos Argueta **u20247471**
- Steveen Antonio Portillo Gómez **u20240573**

## Sistema de Procesamiento de Órdenes de E-commerce

Una plataforma de comercio electrónico multinacional necesita un sistema sofisticado para procesar órdenes que maneja volúmenes masivos de transacciones diarias. El sistema debe validar automáticamente cada orden a través de múltiples etapas de verificación, desde validación de inventario hasta autorización de pagos, mientras coordina simultáneamente con diversos servicios internos y externos para garantizar una experiencia fluida al cliente.

Las órdenes pueden ser desde compras simples de productos únicos hasta pedidos corporativos complejos con múltiples productos, descuentos especiales, y requisitos de envío urgente. El departamento de fulfillment está estructurado en etapas secuenciales: validación de inventario, procesamiento de pagos, cálculo de envío, verificación de fraude, y coordinación de despacho.

La empresa requiere mantener a los clientes informados en tiempo real sobre el estado de sus órdenes, coordinar automáticamente con proveedores cuando hay productos agotados, actualizar sistemas de inventario, procesar reembolsos automáticos en caso de fallas, y generar reportes de ventas para diferentes departamentos.

Las órdenes deben ser procesadas secuencialmente por diferentes validadores (Inventario, Pagos, Envío, Fraude, Fulfillment) donde cada uno puede aprobar y pasar al siguiente, rechazar la orden, o solicitar información adicional. El sistema debe ser extensible para agregar nuevas validaciones sin afectar el flujo existente.Múltiples servicios necesitan ser notificados automáticamente cuando cambia el estado de una orden para mantener sincronizados los sistemas de inventario, contabilidad, CRM, y logística. La arquitectura debe permitir que nuevos servicios se integren sin modificar la lógica de procesamiento principal.

### Requisitos Funcionales

- **Validación Secuencial**
- **Coordinación de Servicios**: Mantener sincronizados automáticamente todos los sistemas relacionados con el procesamiento de órdenes
- **Notificaciones al Cliente**: Enviar actualizaciones en tiempo real sobre el progreso de cada orden
- **Gestión de Inventario**: Coordinar automáticamente con proveedores y actualizar stock disponible
- **Análisis de Fraude**: Implementar verificaciones de seguridad y escala automática para transacciones sospechosas

### Implementar

- Enums
- Handlers
- Mediador

## Criterios de Evaluación

- Deben usar el **patrón Mediador (mediator pattern) y el patrón cadena de responsabilidad**
- Deben trabajar el ejercicio con **enums**
- Se evaluará el trabajo en equipo en GitHub
- Deben agregar validaciones y control de excepciones
- El código debe cumplir con buenas prácticas y debe ser ordenado.
- Deben subir tanto el link de GitHub del repositorio como un ZIP con todo el código trabajado
- **Fecha de entrega: 31 de mayo de 2025**
