

let data1 = [];
let rt = 0;
const cadates = [
    'KYAGULANYI SSENTAMU ROBERT','AMURIAT OBOI PATRICK','KABULETA KIIZA JOSEPH',
    'KALEMBE NANCY LINDA','KATUMBA JOHN','MAO NORBERT','MAYAMBALA WILLY','MUGISHA MUNTU GREGG',
    'MWESIGYE FRED','TUMUKUNDE HENRY KAKURUGU','YOWERI MUSEVENI TIBUHABURWA KAGUTA'
]

const clicked = ev => {
    myfc(parseInt(ev.target.name));
}
const persons = d3.select("#persons").select("ul")
cadates.forEach(function(currentValue, index){
    persons.append('li').append('a').attr('href', '#').attr('name', index).on("click", clicked).html(currentValue)
})


d3.csv("https://patrickmugayajoel.github.io/d3/2021_presidential_by_polling.csv").then(function(data) {     
    data1 = data.filter(function (elm) {
        return !elm.Station.includes("Total") && !elm.Station.includes("Station") && (parseInt(elm["Valid Votes"])>0);
    })
}).then(myfc)

// [ Valid Votes Reg.Voters
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
