FROM node:12

# Add package file
COPY package*.json ./

# Install deps
RUN npm i

# Copy source
COPY . .

# Build dist
RUN npm run build

CMD npm run start
