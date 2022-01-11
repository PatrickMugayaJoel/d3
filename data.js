

let data1 = [];
let data2 = []
let rt = 0;
const cadates = [
    'KYAGULANYI SSENTAMU ROBERT','AMURIAT OBOI PATRICK','KABULETA KIIZA JOSEPH',
    'KALEMBE NANCY LINDA','KATUMBA JOHN','MAO NORBERT','MAYAMBALA WILLY','MUGISHA MUNTU GREGG',
    'MWESIGYE FRED','TUMUKUNDE HENRY KAKURUGU','YOWERI MUSEVENI TIBUHABURWA KAGUTA'
]

d3.csv("https://patrickmugayajoel.github.io/d3/2021_presidential_by_polling.csv").then(function(data) {     
    data1 = data.filter(function (elm) {
        return !elm.Station.includes("Total") && !elm.Station.includes("Station");
    })
}).then(myfc)

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
