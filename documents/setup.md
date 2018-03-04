# Setup Application for Development
This walkthrough assumes you have Node.js installed locally. If this is not the case, you can install it [here](https://nodejs.org/en/). You will also need to install the [WebStorm IDE from JetBrains](https://www.jetbrains.com/webstorm/download/#section=windows).

This walkthrough also assumes you are developing on a Unix-based system.

## Environment Setup
First, you'll need to checkout a copy of the repository on your local machine. Clone the repository into your WebStorm folder and checkout the master branch (should do so by default). Once complete, you can import the project into WebStorm by selecting `Open Project` and selecting the `node-skeleton` directory.

```
git clone https://github.com/brandon1024/node-skeleton.git
cd node-skeleton
git checkout master
```

Now, resolve the dependencies used by this project.

```
npm install
```

In order to run database migrations, you will need to have `Knex` installed globally.

```
npm install knex -g
```

To use `nodemon`, you will need to install it as a global dependency. Nodemon is used to automatically restart the server after you make a change. This is used solely for the purpose of development.

```
npm install nodemon -g
```

## Database Configuration
This project relies on MySQL, so you will need to ensure you have it installed. If you don't, here are some links to get you started:
- Windows: [2.3 Installing MySQL on Microsoft Windows - MySQL](https://dev.mysql.com/doc/refman/5.7/en/windows-installation.html)
- Linux: [2.5 Installing MySQL on Linux - MySQL](https://dev.mysql.com/doc/refman/5.7/en/linux-installation.html)
- MacOS: [2.4.2 Installing MySQL on OS X Using Native Packages - MySQL](https://dev.mysql.com/doc/refman/5.6/en/osx-installation-pkg.html)

Although it isn't necessarily required, MySQL Workbench and JetBrains DataGrid are very useful tools for managing the database users and schemas. Once you have MySQL Workbench installed, create a new connection with the following parameters:
- Connection Name: node-skeleton (note: this name is irrelevant)
- Hostname: 127.0.0.1
- Port: 3306
- Username: root
- Password: password

Click the `Test Connection` to ensure you're able to connect to the MySQL server.

In the query editor or in DataGrid, paste the following and run it (select the entire query and press the lightening bolt icon).

```
CREATE DATABASE ceccompetitiondev;
CREATE DATABASE ceccompetitiontest;
CREATE DATABASE ceccompetitionprod;
```

## Database Migrations
In order to configure your database schemas, you will need to bring it up to date by running the database migrations. To do this, run the following in the terminal from the project working directory.

```
knex migrate:latest --env development --knexfile config/db/knexfile.js
knex migrate:latest --env test --knexfile config/db/knexfile.js
knex migrate:latest --env production --knexfile config/db/knexfile.js
```

This will bring all your databases up to date for all environments. You will need to rerun migrations whenever a new migration is added. In the future, you do not need to run migrations for all environments everytime a new migration is added. You only need to run migrations for the databases you use, which is most often the `development` environment, and occasionally the `test` environment. It is good practice to run migrations for all environments however.

For more details on database migrations, see the migrations.md document.

## IDE Configurationn and Run Configurations
First and foremost, you will need to configure the project codestyle settings. These settings are already configured in the repository `.idea` folder, but you will need to ensure you are using the project settings and not the system settings. To do this, navigate to the WebStorm preferences window, select `Editor`, then select the `Code Style` top level node. In the `Scheme` dropdown, select `Project`.

To configure your IDE for Node.js development, you will need to change a couple preferences. In the preferences window, select `Languages & Frameworks`, then select JavaScript. Change the language version to `ECMAScript 6`.

Next, select `Node.js and NPM` from `Languages & Frameworks` and enable `Node.js core library`.

Lastly, you will need to add run configurations. This allows you to easily run, stop, and restart the app server. These come preconfigured inside the repository .idea directory, meaning that you should not need to configure this manually. However, if you need to, you can follow these steps.

In the IDE toolbar, select the dropdown menu and select `Edit Run Configurations...`. In this window, you will create three configurations.
- `Run Server Development` Configuration
     - Create a new run configuration by pressing the `+` icon in the top left corner.
     - From the menu, select `Node.js`
     - Enter the following details:
          - Name: Run Server Development
          - Node Interpreter: Project node (/usr/local/bin/node)
          - Node Parameters: /usr/local/bin/nodemon
          - Working Directory: (use default here)
          - JavaScript File:
          - Application Parameters: -e js,twig,sass,json bin/www
          - Environment Variables: DEBUG=*;NODE_ENV=development;HTTP_PORT=3000;HTTPS_PORT=9443
- `Run Server Test` Configuration
     - Create a new run configuration by pressing the `+` icon in the top left corner.
     - From the menu, select `Node.js`
     - Enter the following details:
          - Name: Run Server Test
          - Node Interpreter: Project node (/usr/local/bin/node)
          - Node Parameters: test
          - Working Directory: (use default here)
          - JavaScript File:
          - Application Parameters:
          - Environment Variables: DEBUG=*;NODE_ENV=test;HTTP_PORT=3000;HTTPS_PORT=9443
- `Run Server Production` Configuration
     - Create a new run configuration by pressing the `+` icon in the top left corner.
     - From the menu, select `Node.js`
     - Enter the following details:
          - Name: Run Server Production
          - Node Interpreter: Project node (/usr/local/bin/node)
          - Node Parameters:
          - Working Directory: (use default here)
          - JavaScript File: bin/www
          - Application Parameters:
          - Environment Variables: NODE_ENV=production;HTTP_PORT=3000;HTTPS_PORT=9443

Note: Setting the `DEBUG` environment variable will display debug information to the console using the `debug` middleware. This is useful for finding the cause of errors, but can be make debugging certain things difficult. It is recommended that you create a fourth run configuration titled `Run Server Development DEBUG OFF` with the same configuration as `Run Server Development`, but remove the `DEBUG` environment variable. You can also use this configuration to simulate a production-like environment.

## Running the Server
To ensure your environment is setup correctly, run the `Run Server Development` configuration. Navigate to `http://localhost:3000` and `https://localhost:9443` to verify the server is running corretly.

## Generate Self-Signed Certificates
Note: For use in a production environment, you should have certificates signed by a third party certificate authority (CA). For development, self-signed certificates are sufficient. See [Let's Encrypt](https://letsencrypt.org/).

This step is optional (but recommended), and mandatory if deploying the app to the public.

Server and client certificates are stored under `config/cert/`. Default certificates exist in this folder, but they are not secure for use in a production environment. You will need to create new secure certifications. To do this, in terminal, first navigate to the project working directory, and follow these steps.

```
rm config/client-key.pem config/client.csr config/client-cert.pem
openssl genrsa -out config/client-key.pem 2048
openssl req -new -key config/client-key.pem -out config/client.csr
openssl x509 -req -in config/client.csr -signkey config/client-key.pem -out config/client-cert.pem
```

You will be asked to enter your information. Most fields are optional, but it is good practice to enter valid information.

When navigating to `https://localhost:9443`, you will be prompted with a warning that the server certificate is not trusted. This is because the certificate generated is self signed, and not signed by a third party certificate authority. For development, you can manually install the certificate as a trusted certificate, which will hide the trust warning. To do this, search [install certificate locally trusted](https://www.google.com/search?q=install+certificate+locally+trusted) and locate the appropriate steps for your environment.
