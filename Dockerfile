FROM node:16.15
COPY ./app /app
WORKDIR /app
RUN npm install
CMD ["npm", "run", "start"]
