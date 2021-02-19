#!/bin/bash

#chmod +x install.sh
#sudo ./install.sh

chmod +x server_run.sh
./server_run.sh &

chmod +x sleep.sh
./sleep.sh

curl --location --request GET 'http://localhost:8081/memes'

curl --location --request POST 'http://localhost:8081/memes'  --header 'Content-Type: application/json' --data-raw '{"name": "xyz","url": "https://i.imgflip.com/4x1r4l.jpg","caption": "This is a meme"}'

curl --location --request GET 'http://localhost:8081/memes'

killall -9 node
sudo systemctl stop mongod
