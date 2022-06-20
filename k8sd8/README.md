# k8sd8

Return the current date, according to a container in k8s.

## Deploying

```
K8SD8_IMAGE_NAME=yourrepo/yourimagename
docker build -t $K8SD8_IMAGE_NAME:dev .
docker push $K8SD8_IMAGE_NAME:dev
cat deployment/job.yaml | envsubst | kubectl apply -f -
```
