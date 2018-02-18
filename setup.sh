npm install
sudo npm install -g nodemon
sudo npm install -g knex
knex migrate:latest

echo "Use the following command to run the server:"
echo "nodemon -e js,twig,sass,json"
echo ""
echo "Ensure you are using the project code style in the settings"
