![Prettier](https://github.com/freelancerfy/backend/workflows/Prettier/badge.svg?branch=main)

# Backend
How does it work?

It's a simple nodejs application using express.

The way you start it is by either using one of those scripts in the commandline like this from src directory.

    $ yarn start:dev:watch
    
    
Available commands
    
    "start:dev:watch": "ENV=dev nodemon index.js",

    "start:dev": "ENV=dev node index.js",

The key difference between start:dev and start:dev:watch is auto-rebuild of the application.
If you are working on the server and need to see the changes immediately you should be using start:dev:watch

You can also run this application with docker which should be the preferred way.
If you want to run it in docker. It's good to mention that the application is then started with start:dev:watch enabling auto rebuild inside the docker container.

Run command below inside of backend directory

    $ docker-compose up
    
    
    
Database connection
Connect to the server with ssh and use this command
    
    $ mongo localhost:27017/dev -u 'backend' -p 'V$raA88G$e&Um7'
