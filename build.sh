print_message() {
	echo '\033[36m\033[1m'$1'\033[0m\033[39m'
}

print_message 'Updating Raspberry Pi and installing packages...'
sudo su # Make the current session run as root
cd ~/ # Move the session to the home directory
apt-get install git
apt-get update
apt-get upgrade

# Install Node JS
wget http://node-arm.herokuapp.com/node_latest_armhf.deb
sudo dpkg -i node_latest_armhf.deb

print_message 'Mounting the external drive...'
mount -o uid=pi,gid=pi /dev/sda1 /media/usbhdd/
cd /media/usbhdd

print_message 'Setting up the project files...'
mkdir server
cd server

git clone https://github.com/jamestaylr/file-server.git

print_message 'Installing Node dependencies...'
npm install # Install all of the Node JS dependencies

print_message 'Starting the server...'
# Start the server
forever start server.js
