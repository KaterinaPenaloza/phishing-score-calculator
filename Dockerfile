FROM node:26-alpine

WORKDIR /phishing-score-calculator

COPY package*.json ./
RUN npm ci --omit=dev
COPY . .    

EXPOSE 3000

USER node

CMD ["node", "app.js"]