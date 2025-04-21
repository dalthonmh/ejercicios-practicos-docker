# Imagen base de NGINX
FROM nginx:alpine

# Elimina la página por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copia el HTML al contenedor
COPY index.html /usr/share/nginx/html/index.html

# Expone el puerto 80
EXPOSE 80

