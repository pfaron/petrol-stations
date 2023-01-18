## Petrol stations interactive web page map project
### Piotr Faron
#### 2022/2023
***
### Description
This project was made to help users easily find and share knowledge about current prices of petrol on given stations by
visualising it on an interactive map embedded inside a web page.

#### This project contains:
* embedded OpenStreetMaps map
* web page made using JavaScript and React
* backend service written in Java using Spring Boot
* MySQL database in docker container

### Prerequisites
* npm
* node
* docker & docker-compose

### Running backend with database locally
1. Navigate to `petrol-stations-service` folder.
2. Run `local-build-and-run-back-only.sh` script file.
3. The server is now accessible on `8080` port on localhost. Database is accessible on `3306` port on localhost.

You can access API documentation on `/swagger.html` url and `8080` port.

#### Troubleshooting
* The server may fail to start the first time. Just terminate the process with Ctrl+C and run the script again.
* In case of trouble with docker you might use the `reset_docker.sh` script to stop and remove docker containers.
* If any of the ports is taken, run `reset_docker.sh` and restart the OS.

### Running frontend locally
1. Navigate to `petrol-station-ui` folder.
2. Run `npm ci` to install required dependencies.
3. Run `npm start` command.
4. The website is now accessible on `3000` port on localhost.

### Functionalities
* I can add a new station by double-clicking on the map.
* I can see the stations located on the map.
* I can see the reported prices underneath the station markers on the map.
* I can change the displayed price underneath the marker based on the petrol type.
* I can click on the station marker and open a popup with basic station information.
* I can see the current prices for most common fuel types.
* I can rate the current price for most common fuel types.
* I can change the current price for most common fuel types.
* I can see a history of reported prices with a date it was reported and its rating.

## Advanced Design Patterns list
* Data Mapper
* Data Transfer Object
* Service Layer
* Metadata Mapping
* Repository
* Value Object / Money
* Identity Field
* Foreign Key Mapping
* Dependent Mapping / Embedded Value

More information in `documentation/` (in Polish).
