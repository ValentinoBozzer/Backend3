# Backend3 - AdoptMe

## Instrucciones para correr con Docker

1. Construir la imagen (opcional, ya está publicada):

```bash
docker build -t valentinobozzer/adoptme:latest .
```

2. O descargar la imagen ya publicada:

```bash
docker pull valentinobozzer/adoptme:latest
```

3. Ejecutar el contenedor:

```bash
docker run -d -p 8080:8080 --env-file .env valentinobozzer/adoptme:latest
```

4. Acceder a la API en [http://localhost:8080/api/docs](http://localhost:8080/api/docs)

---

## Imagen en DockerHub

[https://hub.docker.com/r/valentinobozzer/adoptme/tags](https://hub.docker.com/r/valentinobozzer/adoptme/tags)

---

## Variables de entorno

Crea un archivo `.env` con la siguiente variable (ajusta según tu entorno):

```
MONGO_URL=mongodb+srv://usuario:password@cluster.mongodb.net/adoptme
PORT=8080
``` 