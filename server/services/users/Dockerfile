FROM node:lts-hydrogen

ENV NODE_ENV=production
ENV DATABASE_URL=https://mongodb+srv:...
ENV PORT=4001

WORKDIR /users

COPY ["package.json", "package-lock.json", "./"]

RUN npm install && npm cache clean --force
RUN npm install -g nodemon

COPY . .

CMD ["npm", "start"]