#!/usr/bin/env bash

set -ex

# Check requirements: npm
if [ ! $(command node -v) ]
then
  echo "Error: node is not installed. Please install node first."
  exit 1
fi

BASEDIR=$(dirname $(realpath $0))

cd $BASEDIR


# Add environment variables
if [ -f apps/remix-jokes/.env ]
then
  rm apps/remix-jokes/.env
fi
echo "DATABASE_URL=\"file:./dev.db\"" >> apps/remix-jokes/.env
echo "SESSION_SECRET=\"secret\"" >> apps/remix-jokes/.env

# Install pnpm and dependencies
npm install -g pnpm@latest
pnpm install

# Build design system
pnpm ds build

# Apply database migration
pnpm app prisma:migrate
