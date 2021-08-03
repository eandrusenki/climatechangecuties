const myMap = L.map('mapArea').setView([34.0709, -118.444], 6);

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(myMap)

function addMarker(data){
    // console.log(data)
    // these are the names of our fields in the google sheets
    L.circleMarker([data.lat,data.lng]).addTo(myMap).bindPopup(`<p>UCLA Affiliation: ${data.areyouaucla}</p>`+ `<p>Have you ever filed with Title IV: ${data.haveyoueverfiledanincidentreporttotheuclatitleixoffice}</p>`+ `<p>Have you ever felt you needed to report:${data.haveyoueverbeeninasituationwhereyoufeltyoumayneedtofileanincidentreporttotheuclatitleixoffice}</p>`+`<p>Where on campus did this happen: ${data.whereoncampusdidyouexperienceissueswarrantinghelpundertitleix}</p>`+ `<p>How would you classify the situation of discrimination under Title IX: ${data.undertitleixhowwouldyouclassifytheincidentsituationexperiencedoncampusfiledornotdiscriminationbasedon}</p>`)
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

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 