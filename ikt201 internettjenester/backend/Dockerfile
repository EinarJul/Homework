FROM mhart/alpine-node:14
WORKDIR /app
COPY ./src .
RUN yarn
EXPOSE 3001
CMD ["yarn", "start:dev:watch"]