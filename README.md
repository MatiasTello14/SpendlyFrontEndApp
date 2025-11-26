# 💸 Spendly - Frontend App

**Spendly** es una aplicación móvil para la gestión de finanzas personales desarrollada con **React Native** y **Expo**. Permite a los usuarios registrar sus gastos, organizarlos por categorías personalizadas, adjuntar comprobantes y visualizar conversiones de moneda en tiempo real.

Este repositorio contiene el código fuente del **Frontend** (Cliente móvil).

## 📱 Características Principales

  * **Autenticación Segura:** Registro e Inicio de Sesión de usuarios con persistencia de sesión (JWT).
  * **Gestión de Gastos (CRUD):**
      * Crear, Leer, Editar y Eliminar gastos.
      * Soporte para gastos en **Pesos (ARS)** y **Dólares (USD)**.
      * Conversión automática de moneda utilizando cotizaciones en tiempo real (Oficial, Blue, Tarjeta).
  * **Categorías Personalizables:**
      * Administración completa de categorías (crear, editar, eliminar).
      * Selección de imágenes de la galería para personalizar cada categoría.
  * **Adjuntos:** Posibilidad de subir comprobantes (imágenes o PDFs) a los gastos.
  * **Búsqueda y Filtros:** Buscador integrado y filtrado rápido por categorías en la pantalla principal.
  * **Interfaz Intuitiva:** Diseño limpio utilizando componentes de *React Native Elements*.

## 🛠️ Stack Tecnológico

  * **Core:** React Native (v0.81) + Expo (v54).
  * **Lenguaje:** JavaScript (ES6+).
  * **Navegación:** React Navigation v7 (Native Stack).
  * **Estado Global:** React Context API (`AuthContext`).
  * **Peticiones HTTP:** Axios.
  * **Almacenamiento Local:** AsyncStorage (para persistencia de Token).
  * **UI/UX:** `@rneui/themed` (React Native Elements), Vector Icons.
  * **Manejo de Archivos:** `expo-image-picker`, `expo-document-picker`.

## 🚀 Instalación y Configuración

Sigue estos pasos para correr el proyecto en tu entorno local:

### 1\. Prerrequisitos

  * Tener instalado **Node.js** y **npm**.
  * Tener la aplicación **Expo Go** instalada en tu celular (Android/iOS) o un simulador configurado (Xcode/Android Studio).

### 2\. Clonar e Instalar

```bash
# Clonar el repositorio
git clone <URL_DE_TU_REPO>

# Entrar a la carpeta del proyecto
cd SpendlyFrontEndApp

# Instalar dependencias
npm install
```

### 3\. Configurar la Conexión con el Backend ⚠️

Para que la app se conecte a tu servidor local, debes configurar tu dirección IP.

1.  Abre el archivo `services/api.js`.
2.  Busca la línea `baseURL`.
3.  Reemplaza la IP por la dirección IPv4 de tu computadora (puedes verla ejecutando `ipconfig` o `ifconfig` en tu terminal).

<!-- end list -->

```javascript
// services/api.js
export const api = axios.create({
  baseURL: "http://192.168.X.X:8080", // <--- Pon tu IP aquí
  timeout: 10000,
});
```

> **Nota:** Asegúrate de que tu celular y tu computadora estén conectados a la misma red Wi-Fi.

### 4\. Ejecutar la Aplicación

```bash
npx expo start
```

  * Escanea el código QR con la app **Expo Go** (Android) o la cámara (iOS).
  * O presiona `a` para abrir en emulador Android, o `i` para simulador iOS.

## 📂 Estructura del Proyecto

```text
src/
├── components/      # Componentes reutilizables (Cards, Listas, Formularios)
├── context/         # Estado global (AuthContext)
├── hooks/           # Custom Hooks (useAuth, useDebounce)
├── screens/         # Vistas principales (Login, Home, Details, Forms)
├── services/        # Comunicación con el Backend (Axios)
├── utils/           # Funciones de ayuda (Formato de fecha/moneda)
├── assets/          # Imágenes y recursos estáticos
└── App.js           # Punto de entrada y configuración de Navegación
```

## 👥 Autores

  * **[Tu Nombre]** - *Desarrollador*
  * **[Nombre Compañero 1]** - *Desarrollador*
  * **[Nombre Compañero 2]** - *Desarrollador*
  * **[Nombre Compañero 3]** - *Desarrollador*

-----

*Proyecto realizado para la materia Programacion en Nuevas Tecnologias - 2025 2C.*
