FROM node:17
WORKDIR /app
ENV HELLOK8S_GOOGLE_PROJECT_ID ""
ENV HELLOK8S_GCS_BUCKET_ID ""
ENV GOOGLE_APPLICATION_CREDENTIALS "/secrets/sa-credentials.json"
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
CMD ["npm", "start"]
