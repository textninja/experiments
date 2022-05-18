FROM node:17 as build
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install --frozen-lockfile
COPY . /app/
RUN yarn build

FROM nginx
COPY --from=build /app/dist/ /usr/share/nginx/html/
