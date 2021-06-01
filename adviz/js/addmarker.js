
function addMarker(contactname,adresse,zip){
    let url = 'https://nominatim.openstreetmap.org/search?q='+adresse+"+"+zip+'&format=json';
    console.log(url); 
    let xhr = new XMLHttpRequest();
    let result;
    xhr.onload = function() {
    result = JSON.parse(xhr.responseText);
    
        if(typeof result[0] === "undefined"){
            alert("falsche Adresse");
        } else{
            console.log(contactname,result[0].lat, result[0].lon);
            let marker = new L.marker([result[0].lat, result[0].lon]).addTo(map);
            marker.bindPopup(contactname+":   "+adresse+ " " +zip).openPopup();
        }
    
};  xhr.onerror = function () {
    alert("Error");
  };
xhr.open("GET", url, true);
xhr.send();
}