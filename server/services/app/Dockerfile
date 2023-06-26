FROM node:lts-hydrogen

ENV NODE_ENV=production
ENV DATABASE_URL=https://supabase.com
ENV PORT=4002

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD ["npm", "start"]