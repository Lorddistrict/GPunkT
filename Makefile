# Dev
install:
	docker run --rm -it -v ./:/app -w /app node:latest npm install $(PACKAGES)

dev:
	docker run --rm -it -v ./:/app -w /app --name discord-bot node:latest npx nodemon index.js

run:
	docker run --rm -it -v ./:/app -w /app --name discord-bot node:latest node index.js
