#builder
FROM node:16.15 as Builder

ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max_old_space_size=4096
RUN mkdir -p /summarizer
COPY ./app /summarizer
WORKDIR /summarizer
RUN npm install
RUN npm run build


#production
FROM nginx
RUN mkdir /app
WORKDIR /app
RUN mkdir ./build
COPY --from=Builder /summarizer/build ./build/
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

