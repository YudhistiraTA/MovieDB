FROM node:lts-hydrogen

ENV NODE_ENV=production
ENV PORT=4000

WORKDIR /orchestrator

COPY ["package.json", "package-lock.json", "./"]

RUN npm install && npm cache clean --force
RUN npm install -g nodemon

COPY . .

CMD ["npm", "start"]