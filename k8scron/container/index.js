const { Storage } = require('@google-cloud/storage');
const { formatDate } = require('./formatDate');
const crypto = require('node:crypto');

(async () => {
  const storage = new Storage({
    projectId: process.env.HELLOK8S_GOOGLE_PROJECT_ID
  });
  const bucket = storage.bucket(process.env.HELLOK8S_GCS_BUCKET_ID);

  const fileName = `${formatDate(new Date)}-${crypto.randomUUID()}.txt`;
  const contents = bucket.file(fileName).createWriteStream();
  await contents.write('Hello from k8s!');
  await contents.end();

})();
