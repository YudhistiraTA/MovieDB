FROM node:lts-hydrogen

ENV NODE_ENV=production
ENV DATABASE_URL=https://mongodb+srv:...
ENV PORT=4001

WORKDIR /users

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD ["npm", "start"]