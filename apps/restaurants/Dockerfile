FROM node:18 As development

WORKDIR /usr/src/apps

# Install NestJS CLI
RUN npm install -g @nestjs/cli


COPY package*.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install --loglevel verbose

# COPY . .
COPY apps/restaurants apps/restaurants
COPY libs libs


RUN cd apps/restaurants && npm install --loglevel verbose
RUN npm run build restaurants --loglevel verbose

# RUN yarn run build

FROM node:18 As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --only=production --loglevel verbose

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/restaurants/main"]