FROM node:18

WORKDIR /app

# Install dependencies
COPY package.json ./
# Copy lockfile if it exists
COPY package-lock.json* yarn.lock*  ./ 
# Use regular npm install which works with or without lockfiles
RUN npm install

# Copy application code
COPY . .

# Set development environment
ENV NODE_ENV=development
ENV PORT=3002
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev"]