const cities = [
  { name:'Denver', x:500, y:500 },
  { name:'Salt Lake City', x:300, y:500 },
  { name:'Cheyenne', x:500, y:600 },
  { name:'Santa Fe', x:500, y:350 },
]
const permutations = [
  [1,2,3,4],
  [1,2,4,3],
  [1,3,2,4],
  [1,3,4,2],
  [1,4,2,3],
  [1,4,3,2],

  [2,1,3,4],
  [2,1,4,3],
  [2,3,1,4],
  [2,3,4,1],
  [2,4,1,3],
  [2,4,3,1],

  [3,1,2,4],
  [3,1,4,2],
  [3,2,1,4],
  [3,2,4,1],
  [3,4,1,2],
  [3,4,2,1],

  [4,1,2,3],
  [4,1,3,2],
  [4,2,1,3],
  [4,2,3,1],
  [4,3,1,2],
  [4,3,2,1],
]
// find the distance between each city
const distance = (city1, city2) => { 
  return Math.sqrt(Math.pow((city1.x - city2.x), 2) + Math.pow((city1.y - city2.y), 2)); 
};
// find all possible routes
const findBestRoute = (cities) => {
  // best_trip_length = MAX
  let places = cities.slice();
  let bestTripLength = Number.MAX_VALUE;
  // best_trip = []
  let bestTrip = [];
  // for each ordering in the permutations of C:
  for (let i = 0; i < permutations.length; i++) {
    let currentTripLength = 0;
    for (let j = 0; j < permutations[i].length - 1; j++) {
      currentTripLength += distance(places[permutations[i][j]-1], places[permutations[i][j+1]-1]);
    }
    if (currentTripLength < bestTripLength) {
      bestTripLength = currentTripLength;
      bestTrip = permutations[i];
    }
  }
  const result = [];
  i = 0;
  while (i < bestTrip.length) {
    result.push(cities[bestTrip[i]-1]);
    i++;
  }
  return {result, bestTripLength};
};

// given a list of cities to be visited l
const nearestNeighbor = (cities, startPoint) => {
  const pathEnd = cities.length;
  const sites = cities.slice();
  let path = [];
  let shortestTrip = Number.MAX_VALUE;
  let startValue = startPoint;
  let start = sites.splice(startValue, 1);
  let current;
  let nearestLocation;
  let currentTripLength = 0;
  path.push(start[0]);

  while(path.length < pathEnd) {
    shortestTrip = Number.MAX_VALUE;
    for (let i = 0; i < sites.length; i++) {
      current = distance(sites[i], start[0]);
      if (current < shortestTrip) {
        shortestTrip = current;
        nearestLocation = i;
      }
    }
    currentTripLength += distance(start[0], sites[nearestLocation]);
    start = sites.splice(nearestLocation, 1);
    path.push(start[0]);
  }
  return {path, currentTripLength};
}
const nearestNeighborSearch = (cities) => {
  let randomStart = Math.floor(Math.random() * cities.length);
  let result = nearestNeighbor(cities, randomStart);
  return result;
}
const thomsonNeighborSearch = (cities) => {
  let bestPath,
      current,
      currentPath,
      currentDistance;
  let bestDistance = Number.MAX_VALUE;
  for (let i = 0; i < cities.length; i++) {
    current = nearestNeighbor(cities, i);
    currentPath = current.path;
    currentDistance = current.currentTripLength;
    if (currentDistance < bestDistance) {
      bestDistance = currentDistance;
      bestPath = currentPath;
    }
  }
  return {bestPath, bestDistance};
}
console.log(findBestRoute(cities));
console.log(thomsonNeighborSearch(cities));