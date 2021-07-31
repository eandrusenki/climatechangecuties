const myMap = L.map('mapArea').setView([34.0709, -118.444], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

function addMarker(data){
    // console.log(data)
    // these are the names of our fields in the google sheets
    L.marker([data.lat,data.lng]).addTo(myMap).bindPopup(`<p>UCLA Affiliation: ${data.areyouaucla}</p>`+ `<p>Have you ever filed with Title IV: ${data.haveyoueverfiledanincidentreporttotheuclatitleixoffice}</p>`+ `<p>Have you ever felt you needed to report:${data.haveyoueverbeeninasituationwhereyoufeltyoumayneedtofileanincidentreporttotheuclatitleixoffice}</p>`+`<p>Where on campus did this happen: ${data.whereoncampusdidyouexperienceissueswarrantinghelpundertitleix}</p>`+ `<p>How would you classify the situation of discrimination under Title IX: ${data.undertitleixhowwouldyouclassifytheincidentsituationexperiencedoncampusfiledornotdiscriminationbasedon}</p>`)
    return data.location
 }


let url = "https://spreadsheets.google.com/feeds/list/1YpyAms5t_Eosfx59WGIwE7sHLnK0v6HnNKGll1_bWW0/osbpwv3/public/values?alt=json"

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
        // console.log(data)
        processData(data)
    }
)

function processData(theData){
    const formattedData = [] 
    const rows = theData.feed.entry
    for(const row of rows) {
      const formattedRow = {}
      for(const key in row) {
        if(key.startsWith("gsx$")) {
              formattedRow[key.replace("gsx$", "")] = row[key].$t
        }
      }
      formattedData.push(formattedRow)
    }
    console.log(formattedData)
    formattedData.forEach(addMarker)   
   
}
