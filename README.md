# Example React Apollo Website 


## Description:
This project manages my personal budget tracker website.
It provides a comprehensive example of a full-webstack architecture with the following components:
* MySQL database to manage personal budget data
* Apollo node server to provide a gql interface to the MySQL database
* React client which fetches budget data from the apollo node server

I built this project to learn the React and Apollo frameworks, and to also update my old budget track website,
which was built using a LEMP stack with a jQuery / HTML frontend.
Hopefully others will find this project a useful starting point for their react-apollo web projects.

*This project is still a work-in-progress


## Dev Usage
The 3 component web-stack is dockerized to provide an appropriate dev testing environment.
A Makefile faciliates this dev environment by calling ` make up ` and ` make down `.


## Prod Usage
This project is deployable to a VPS with the commands ` make build ` and ` make deploy `.
The build process creates a tar zipped build artifact encapsulating everything necessary to host the website.
The deploy process transfers the build artifact to the VPS and starts the appropriate remote Docker containers.
Make sure to adjust the Makefile deploy constants to specify your ssh profile and remote directory for your VPS.
Note that the MySQL databases is not instantiated during this deployment process; it is assumed to be already setup.
Make sure to add your client url and appropriate database credentials to the ".env.prod" file.
(In my case I run the MySQL on the same VPS; this would clearly not be advisable on any scale).
