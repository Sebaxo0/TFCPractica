FROM node:20-alpine

COPY ["package.json","package-lock.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm install -g npm@latest

RUN npm cache clean --force

RUN npm set audit false

RUN npm uninstall -g angular-cli

RUN npm uninstall -g @angular/cli

RUN npm cache clean --force

RUN npm install -g @angular/cli@15


COPY [".", "/usr/src/"]

RUN npm install 



# Puerto entorno dev
EXPOSE 4200

CMD ng serve --build-optimizer=false --poll 2000 --host 0.0.0.0 --port 4200