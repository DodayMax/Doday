#!/bin/bash

echo -e "  MONGODB_URI: '$MONGODB_URI'" >> env.yaml
echo -e "  FIREBASE_DATABASE_URL: '$FIREBASE_DATABASE_URL'" >> env.yaml
echo -e "  NODE_ENV: '$NODE_ENV'" >> env.yaml