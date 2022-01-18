var data = {
    "2021":{
        "AMURIAT OBOI PATRICK": 337589,
        "KABULETA KIIZA JOSEPH": 45424,
        "KALEMBE NANCY LINDA": 38772,
        "KATUMBA JOHN": 37554,
        "KYAGULANYI SSENTAMU ROBERT": 3631437,
        "MAO NORBERT": 57682,
        "MAYAMBALA WILLY": 15014,
        "MUGISHA MUNTU GREGG": 67574,
        "MWESIGYE FRED": 25483,
        "TUMUKUNDE HENRY KAKURUGU": 51392,
        "YOWERI MUSEVENI TIBUHABURWA KAGUTA": 6042898,
        "Valid votes": 10350819,
        "Invalid votes": 393500,
        "Total votes": 10744319
    },
    "2016":{
        "Abed Bwanika": 89005,
        "Amama Mbabazi": 136519,
        "Baryamureeba Venansius": 52798,
        "Benon Buta Biraaro": 25600,
        "Kizza Besigye Kifefe": 3508687,
        "Mabirizi Joseph ": 24498,
        "Maureen Faith Kyalya Waluube": 42833,
        "Yoweri Kaguta Museveni": 5971872,
        "Valid votes": 9851812,
        "Invalid votes": 477319,
        "Total votes": 10329131
    },
    "2011":{
        "Yoweri Museveni": 5428369,
        "Kizza Besigye": 2064963,
        "Norbert Mao": 147917,
        "Olara Otunnu": 125059,
        "Beti Kamya": 52782,
        "Abed Bwanika": 51708,
        "Jaberi Bidandi Ssali": 34688,
        "Samuel Lubega": 2726,
        "Valid votes":  7938212,
        "Invalid votes": 334548,
        "Total votes":  8272760
    },
    "2006":{
        "Yoweri Museveni": 4109449,
        "Kizza Besigye": 2592954,
        "John Ssebaana Kizito": 109583,
        "Abed Bwanika": 5874,
        "Miria Obote": 57071,
        "Valid votes": 6934931,
        "Invalid votes": 295525,
        "Total votes": 7230456
    },
    "2001":{
        "Yoweri Museveni": 5123360,
        "Kizza Besigye": 2055795,
        "Aggrey Awori": 103915,
        "Kibirige Mayanja": 3790,
        "Francis Bwengye": 22751,
        "Karuhanga Chapaa": 10080,
        "Valid votes": 7389691,
        "Invalid votes": 186453,
        "Total votes": 7576144
    }
}

// set the dimensions and margins of the graph
const margin = {top: 30, right: 30, bottom: 100, left: 70},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


// {
//    "year":[
//       {
//          "candidate":"candidate",
//          "votes":"votes"
//       }
//    ]
// }
var candidate_votes_per_year = {}

Object.keys(data).map(function(key1, index1) {
  let myList = []
  Object.keys(data[key1]).map(function(key2, index2) {
      if (!["Total votes","Invalid votes","Valid votes"].includes(key2)){
        let myObject = {}
        myObject["candidate"] = key2;
        myObject["votes"] = data[key1][key2];
        myList.push(myObject);
        candidate_votes_per_year[key1] = myList;
      }
   });
});

// [
//     {
//        "group":"banana",
//        "first":"12",
//        "second":"1"
//     }
//  ]
var comparison_data = [
    {
        "year":"2021",
        "first":Math.round((6042898/10744319)*100),
        "second":Math.round((3631437/10744319)*100)
    },
    {
        "year":"2016",
        "first":Math.round((5971872/10329131)*100),
        "second":Math.round((3508687/10329131)*100)
    },
    {
        "year":"2011",
        "first":Math.round((5428369/8272760)*100),
        "second":Math.round((2064963/8272760)*100)
    },
    {
        "year":"2006",
        "first":Math.round((4109449/7230456)*100),
        "second":Math.round((2592954/7230456)*100)
    },
    {
        "year":"2001",
        "first":Math.round((5123360/7576144)*100),
        "second":Math.round((2055795/7576144)*100)
    }
]
comparison_data.columns = ["year", "first", "second"]
