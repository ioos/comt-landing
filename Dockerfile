FROM node:13.7.0-alpine
LABEL maintainer="devops@rpsgroup.com"

# install yarn, grunt; remove build cache
RUN apk update && \
    apk add yarn && \
    npm install -g grunt && \
    rm -rf /var/cache/apk/*

COPY bin    /opt/comt-landing/bin
COPY public /opt/comt-landing/public
COPY routes /opt/comt-landing/routes
COPY views  /opt/comt-landing/views
COPY app.js assets.json gruntfile.js package.json /opt/comt-landing/

WORKDIR /opt/comt-landing
RUN yarn && \
    /usr/local/lib/node_modules/grunt/bin/grunt

ENV NODE_ENV production

USER node

CMD ["node", "bin/www"]
