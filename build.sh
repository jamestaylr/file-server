sudo su # Make the current session run as root
apt-get update
apt-get upgrade

# Install Node JS
wget http://node-arm.herokuapp.com/node_latest_armhf.deb
sudo dpkg -i node_latest_armhf.deb

npm install # Install all of the Node JS dependencies
echo 'pi:qLRVS5jAcua43RJw' | chpasswd # Set the password of the Pi to a randomly generated String

# Start the server
forever start server.js