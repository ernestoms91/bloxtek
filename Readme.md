
# Backend con Express y MongoDB

Este proyecto es un backend desarrollado con **Express** y **MongoDB**. Puedes ejecutarlo de forma local o mediante **Docker**.

## Instalación y Ejecución Local

### 1. Clonar el repositorio
```sh
git clone https://github.com/ernestoms91/bloxtek
cd backend
```

### 2. Instalar dependencias
```sh
npm install
```

### 3. Configurar variables de entorno
Crea un archivo **.env** en la raíz del backend y copia el contenido de **.env.example**, ajustando los valores según sea necesario.

### 4. Ejecutar el servidor en desarrollo
```sh
npm run dev
```

### 5. Ejecutar el servidor en producción
```sh
npm run start
```

---

## Uso con Docker

### 1. Construir y levantar los contenedores
Ejecuta el siguiente comando desde la carpeta **backend** (donde se encuentra `docker-compose.yml`):
```sh
docker-compose up -d 
```

# Frontend con Next.js

Este proyecto es un frontend desarrollado con **Next.js**. Puedes ejecutarlo de forma local o mediante **Docker**.

## Instalación y Ejecución Local

### 2. Instalar dependencias
```sh
npm install
```

### 3. Configurar variables de entorno
Crea un archivo **.env.local** en la raíz del frontend y copia el contenido de **.env.local.example**, ajustando los valores según sea necesario.

### 4. Ejecutar el servidor en desarrollo
```sh
npm run dev
```

### 5. Construir y ejecutar en producción
```sh
npm run build
npm start
```

---

## Uso con Docker

### 1. Construir y levantar los contenedores
Ejecuta el siguiente comando desde la carpeta **frontend** (donde se encuentra `docker-compose.yml`):
```sh
docker-compose up -d
```
