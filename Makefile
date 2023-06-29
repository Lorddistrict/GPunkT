# Dev
install:
	docker run --rm -it -v ./:/app -w /app node:latest npm install $(PACKAGES)

dev:
	docker run --rm -it -v ./:/app -w /app --name gpunkt node:latest npx nodemon index.js

deploy-commands: # Run this when you need to update your commands
	docker run --rm -it -v ./:/app -w /app --name gpunkt node:latest node deploy-commands.js

run:
	docker run --rm -it -v ./:/app -w /app --name gpunkt node:latest node index.js

stop:
	docker rm -f gpunkt

build-and-publish:
	docker build -t gpunkt .
	docker tag gpunkt:latest ghcr.io/lorddistrict/gpunkt
	docker push ghcr.io/lorddistrict/gpunkt
