# CampusDate
## Introduction
The dating app for college students. We are creating an open source dating app for college students. Why? because most college students use one and they don't properly target the market. Ours will focus more on activities and college verification.


## MongoDB Install
These are the commands I typed to install MongoDB on this machine. https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

### Ubuntu:

wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org


### WSL:

https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-mongodb

cd ~
sudo apt update
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
mongod --version
mkdir -p data/db
sudo mongod --dbpath data/db
ps -e | grep 'mongod'