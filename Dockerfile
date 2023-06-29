FROM node:alpine
LABEL org.opencontainers.image.source https://github.com/Lorddistrict/discordBotGPT
COPY . .
RUN npm install && \
    npm cache clean --force
CMD [ "node", "index.js" ]
