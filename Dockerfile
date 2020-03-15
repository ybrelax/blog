FROM node:latest
COPY . /blog/
WORKDIR /blog/
RUN npm install && npm run build


FROM nginx:latest

COPY --from=0 /blog/docs-dist /usr/share/nginx/html/

EXPOSE 80