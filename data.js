
d3.csv("https://patrickmugayajoel.github.io/d3/2021_presidential_by_polling.csv").then( function(data) {
    console.log(data)
})

data.filter(function (elm) {
    return !elm.Station.includes("Total") &&
        !elm.Station.includes("Station");
})

const allowed = ['Parish', 'Station', 'Reg.Voters', 'KYAGULANYI SSENTAMU ROBERT', 'Valid Votes', 'Invalid Votes', 'Total Votes'];

var i = data.length
while (i--) {
    ...
    if (...) { 
        data.splice(i, 1);
    } 
}

// loop this for every element in the data array while poping objects off
// use the while above to do this
const filtered = allowed.reduce((obj, key) => {
    obj[key] = data[key];
    return obj;
}, {});

// [
//     {
//       "group": "A",
//       "variable": "v1",
//       "value": "30"
//     },
//     {
//       "group": "A",
//       "variable": "v2",
//       "value": "95"
//     },
//     {
//       "group": "B",
//       "variable": "v1",
//       "value": "37"
//     },
//     {
//       "group": "B",
//       "variable": "v2",
//       "value": "50"
//     }
// ].columns = [ "group", "variable", "value" ]
