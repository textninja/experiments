.phony: image.build

docker.build:
	docker build -t $(shell npx dotenv -p HELLOK8S_DOCKER_IMAGE_NAME):dev .

docker.run:
	npx dotenv -- docker run --rm \
		-e HELLOK8S_GOOGLE_PROJECT_ID \
		-e HELLOK8S_GCS_BUCKET_ID \
		-e GOOGLE_APPLICATION_CREDENTIALS=/secrets/sa-credentials.json \
		-v "$(shell npx dotenv -p GOOGLE_APPLICATION_CREDENTIALS):/secrets/sa-credentials.json" \
		$(shell npx dotenv -p HELLOK8S_DOCKER_IMAGE_NAME):dev

docker.push:
	docker push $(shell npx dotenv -p HELLOK8S_DOCKER_IMAGE_NAME):dev
