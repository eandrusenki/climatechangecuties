const myMap = L.map('mapArea').setView([34.0709, -118.444], 6);

var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(myMap)

function populateContent(data){
  contentParts = {
    "atucla" : data.areyouaucla,
    "location" : data.whereoncampusdidyouexperienceissueswarrantinghelpundertitleix,
    "story" : data.reminderthisentiresurveyisanonymousifyoufeelcomfortablepleaseshareyourstory,
    "resc" : data.reminderthisentiresurveyisanonymousifyoufeelcomfortablepleaseshareresourcesyoufoundhelpful,
    "encoug" : data.reminderthisentiresurveyisanonymousifyoufeelcomfortablepleaseshareamessagewordsofencouragementyouhaveforothersgoingthroughthesamething,
  }
  for(part in contentParts){
    if(contentParts[part] == ""){
      contentParts[part] == "No response was provided for this question."
    }
  }
  return contentParts
}

function changeDesc(obj){
  console.log(obj)
  document.getElementById("atucla").innerHTML=(obj.atucla != "") ? (obj.atucla) : "No response was provided";
  document.getElementById("location").innerHTML=(obj.location != "") ? ("\"" + obj.location + "\"") : "No response was provided."
  document.getElementById("story").innerHTML=(obj.filled != "") ? ("\"" + obj.filled + "\"") : "No response was provided.";
  document.getElementById("resc").innerHTML=(obj.resc != "") ? ("\"" + obj.resc + "\"") : "No response was provided.";
  document.getElementById("encoug").innerHTML=(obj.encoug != "") ? ("\"" + obj.encoug + "\"") : "No response was provided."
}
function addMarker(data){
  // console.log(data)
  // these are the names of our fields in the google sheets
  content = populateContent(data)
  console.log(content)
  var marker = L.marker([data.lat,data.lng])
  marker = L.marker([data.lat,data.lng]).bindPopup(`<p>UCLA Affiliation: ${data.areyouaucla}</p>`+ `<p>Have you ever filed with Title IV: ${data.haveyoueverfiledanincidentreporttotheuclatitleixoffice}</p>`+ `<p>Have you ever felt you needed to report:${data.haveyoueverbeeninasituationwhereyoufeltyoumayneedtofileanincidentreporttotheuclatitleixoffice}</p>`+`<p>Where on campus did this happen: ${data.whereoncampusdidyouexperienceissueswarrantinghelpundertitleix}</p>`+ `<p>How would you classify the situation of discrimination under Title IX: ${data.undertitleixhowwouldyouclassifytheincidentsituationexperiencedoncampusfiledornotdiscriminationbasedon}</p>`)
  marker = marker.on('click', function(e){changeDesc(populateContent(data))})
  marker.addTo(myMap)
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



/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
} 