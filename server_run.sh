#!/bin/sh
killall -9 node
sudo systemctl start mongod
sleep 10
mongo Memes --eval "db.memes.drop()"
cd backend
#npm install
npm start
