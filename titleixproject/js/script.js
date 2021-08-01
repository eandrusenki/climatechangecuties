const myMap = L.map('mapArea').setView([34.0709, -118.444], 5);

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(myMap)

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

/* Scroll down button When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}