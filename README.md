# AccDiv
AccDiv Programming Test


## Getting Started
Before beginning, make sure node and npm are properly installed in your machine.

Step 1: Clone this repository
```bash
`git clone git@github.com:uvishere/AccDiv.git`
```
Step 2: go to terminal and run

```bash 
npm install
```

```bash
nodemon run dev
```

The application server will start in port 3000
```bash
http://localhost:3000
```
## API Endpoints

#### Get the common Destination for given from_station_id
```bash
GET /station/:station_id/stats
```

#### Get top three revenue-generating stations

```bash
GET /top_stations
```

#### Get the bike_id of bikes that needs repair
```bash
GET /bike_needs_repair
```

## TODO
* Find prevalent age group of users at this station 
* 
* Remove redundancy in station_stats and implement the model structure
* 

## License
