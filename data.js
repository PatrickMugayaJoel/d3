

// Labels of row and columns
const myXs = []
const myYs = []
let data2 = []

    d3.csv("https://patrickmugayajoel.github.io/d3/2021_presidential_by_polling_test.csv").then( function(data) {
        
    data = data.filter(function (elm) {
        return !elm.Station.includes("Total") && !elm.Station.includes("Station");
    })

    var i = data.length
    const lengt = data.length
    const rt = parseInt(Math.sqrt(30));
    data2.columns = ['KYAGULANYI SSENTAMU ROBERT', 'Station', 'Reg.Voters', 'Valid Votes', 'Invalid Votes', 'Total Votes']
    let x = 0;
    while (i--) {
        data2.push(data2.columns.reduce((obj, key) => {
            if (key == 'Station') {
                obj[key] = data[i][key].replace(/[^a-zA-Z]/g,"");
            } else if(data[i][key].includes("%")) {
                obj[key] = data[i][key].substring(0, data[i][key].length - 1).split(" ");
            } else {
                obj[key] = data[i][key];
            }
            return obj;
        }, {}));
        data.splice(i, 1);

        if((i%rt) == 0) {
            if(x==rt) {
                x = 0
            } else {
                x=x+1
            }
        }

        data2[lengt - (i+1)]['x'] = x
        data2[lengt - (i+1)]['y'] = i%rt
        myXs.push(x)
        myYs.push(i%rt)

    }
})

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
