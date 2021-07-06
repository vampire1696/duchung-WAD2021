var userObject = [
    { // Object @ 0 index
		username: "admina",
		password: "123",
        isAdmin: true
	},
	{ // Object @ 1 index
		username: "normalo",
		password: "123",
        isAdmin: false
	}
]

var admincontact1 = new Contact("Mikasa","Ackerman","Alexanderplatz 30",10178,"Berlin","Berlin","Germany",true,"self");
var admincontact2 = new Contact("Eren","Yaeger","Alexanderplatz 15",10178,"Berlin","Berlin","Germany",false,"self");
var normalocontact1 = new Contact("Uchiha","Sasuke","Alexanderplatz 13",10178,"Berlin","Berlin","Germany",true,"normalo");
var normalocontact2 = new Contact("Levi","Ackerman","Alexanderplatz 35",10178,"Berlin","Berlin","Germany",false,"normalo");
var admincontactlist = [];
admincontactlist.push(admincontact1);
admincontactlist.push(admincontact2);



var normalocontactlist = [];
normalocontactlist.push(normalocontact1);
normalocontactlist.push(normalocontact2);

function createElementAdminContact(){
    let hartcodiert = document.getElementById('hartcodiertadmin');
    for(let i=0;i < admincontactlist.length;i++){
        let admin = document.createElement('div');
        admin.className= "rechtecke";
        admin.innerHTML = admincontactlist[i].firstname + " " + admincontactlist[i].lastname;
        hartcodiert.appendChild(admin);
    }
} 
function showPublicAdminContact(){
    let hartcodiertpublicadmin = document.getElementById('hartcodiertPublicAdmin');
    for(let i=0;i< admincontactlist.length;i++){
        if(admincontactlist[i].isPrivate == false){
            console.log(admincontactlist[i]);
            let publicadmina = document.createElement('div');
            publicadmina.className= "rechtecke";
            publicadmina.innerHTML = admincontactlist[i].firstname + " " + admincontactlist[i].lastname;
            hartcodiertpublicadmin.appendChild(publicadmina); 
        }
    }
    for(let i=0;i<localStorage.length;i++){
        let newContact = JSON.parse(localStorage.getItem(i));
            if(newContact.owner == "self" && newContact.isPrivate == false){
                    let publicadmina = document.createElement('div');
                    publicadmina.className= "rechtecke";
                    publicadmina.innerHTML = newContact.firstname + " " + newContact.lastname;
                    hartcodiertpublicadmin.appendChild(publicadmina); 
                }
            }

            
}


function showLocolstorageContact(user){
    if(user == "admina"){
        console.log(localStorage);
        let hartcodiert = document.getElementById('hartcodiertadmin');
        if(localStorage.length!=0){
        for(let i=0;i<localStorage.length;i++){
            let newContact = JSON.parse(localStorage.getItem(i));
            if(newContact.owner == "self"){
                let admin = document.createElement('div');
                admin.className= "rechtecke";
                admin.innerHTML = newContact.firstname + " " + newContact.lastname;
                hartcodiert.appendChild(admin);
            }
            
             }
        }
    } else {
        console.log(localStorage);
        let hartcodiert = document.getElementById('hartcodiertnormalo');
        let hartcodiertpublicadmin = document.getElementById('hartcodiertPublicAdmin');
        if(localStorage.length!=0){
            for(let i=0;i<localStorage.length;i++){
                let newContact = JSON.parse(localStorage.getItem(i));
                    if(newContact.owner == "normalo"){
                        let normalo = document.createElement('div');
                        normalo.className= "rechtecke";
                        normalo.innerHTML = newContact.firstname + " " + newContact.lastname;
                        hartcodiert.appendChild(normalo);
                    } 
                    }
                
                 }
            }
    
}

function createElementNormaloContact(){
    let hartcodiert = document.getElementById('hartcodiertnormalo');
    for(let i=0;i < normalocontactlist.length;i++){
        let normalo = document.createElement('div');
        normalo.className= "rechtecke";
        normalo.innerHTML = normalocontactlist[i].firstname + " " + normalocontactlist[i].lastname;
        hartcodiert.appendChild(normalo);
    }
}

function Contact(firstname,lastname,adresse,zip,city,state,country,isPrivate,owner)
{   
    this.firstname=firstname;
    this.lastname=lastname;
    this.adresse=adresse;
    this.zip=zip;
    this.city=city;
    this.state=state;
    this.country=country;
    this.isPrivate=isPrivate;
    this.owner=owner;
    

}
const username = document.getElementById('userName')
const password = document.getElementById('password') 
var MongoClient = require('mongodb').MongoClient; 
var url = "mongodb://localhost:27017/";
function addMongo(){
    
    MongoClient.connect(url, {useUnifiedTopology: true}, 
        function (err, client) { 
            if(err) { //better error handling needed 
                 throw err;
            }             
            let db = client.db("loginDB");
            var userobj = {userId: "admina", password: "1234"};
            db.collection("users").insertOne(userobj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                console.log(res);
                client.close();
              });
        }); 
}
function addLocateMarkeradmin(){
    marker3= new L.marker([52.521610260009766, 13.412644386291504]).addTo(map).bindPopup("Mikasa Ackerman").openPopup();
    //addMarker("Mikasa Ackerman","Alexanderplatz 30","10178")
    //marker2= new L.marker([51.325350, 6.561680]).addTo(map).bindPopup("Eren Yeager");
    addMarker("Eren Yeager","Alexanderplatz 15","10178");
}
function addLocateMarkernormalo(){
   // marker3= new L.marker([51.325320, 6.562270]).addTo(map).bindPopup("Mikasa Ackerman");
    marker1= new L.marker([51.324471, 6.568183]).addTo(map).bindPopup("Uchiha Sasuke").openPopup();
    
    marker4= new L.marker([51.325321, 6.562270]).addTo(map).bindPopup("Levi Ackerman").openPopup();
    console.log(marker1);
}

function getInfo(){
    
    for(var i = 0; i < userObject.length; i++) {
		// check is user input matches username and password of a current index of the objPeople array
		if(username.value == userObject[i].username && password.value == userObject[i].password) {
			if(username.value == userObject[0].username && password.value == userObject[0].password){
                mainshow(true);
                addLocateMarkeradmin();
            }
            if(username.value == userObject[1].username && password.value == userObject[1].password){
                mainshow(false);
                addLocateMarkernormalo();
            }
			return
		} else {
            alert("wrong account");
        }
	}
    addMongo();
    
}

