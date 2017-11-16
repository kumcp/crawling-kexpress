# Use ubuntu 16.04 as base
FROM ubuntu:16.04

# Update Ubuntu Software repository
RUN apt-get update

RUN apt-get install -y curl

#Install node 8 
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs build-essential

#Update npm
RUN npm install npm@latest -g


