# syntax=docker/dockerfile:1
FROM node:12-alpine
RUN apk add --no-cache python g++ make
WORKDIR /blog-vue-typescript
COPY . .
RUN yarn install --development
EXPOSE 3000
CMD ["npm", "run","dev"]
