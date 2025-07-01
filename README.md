# Backend3 - AdoptMe

## Instrucciones para correr con Docker

1. Construir la imagen:

```bash
docker build -t tuusuario/adoptme:latest .
```

2. Ejecutar el contenedor:

```bash
docker run -d -p 8080:8080 --env-file .env tuusuario/adoptme:latest
```

3. Acceder a la API en [http://localhost:8080/api/docs](http://localhost:8080/api/docs)

---

## Imagen en DockerHub

[https://hub.docker.com/r/tuusuario/adoptme](https://hub.docker.com/r/tuusuario/adoptme)

---

## Variables de entorno

Crea un archivo `.env` con la siguiente variable (ajusta según tu entorno):

```
MONGO_URL=mongodb+srv://usuario:password@cluster.mongodb.net/adoptme
PORT=8080
``` 