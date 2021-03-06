FROM node:argon
RUN mkdir /usr/proj
WORKDIR /usr/proj
COPY package.json /usr/proj
COPY gulpfile.coffee /usr/proj
RUN npm install; npm install -g nodemon gulp coffee-script
EXPOSE 9999
