FROM node:lts-hydrogen

ENV NODE_ENV=production
ENV PORT=4000

WORKDIR /orchestrator

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD ["npm", "start"]