npm install
sudo npm install -g nodemon
sudo npm install -g knex
knex migrate:latest

echo "Run this in MySQL:"
echo "CREATE DATABASE ceccompetitiondev;"
echo "The run the following knex migration:"
echo "knex migrate:latest --env development --knexfile db/knexfile.js"
mysql -u root -p

echo "Use the following command to run the server:"
echo "nodemon -e js,twig,sass,json"
echo ""
echo "Ensure you are using the project code style in the settings"
