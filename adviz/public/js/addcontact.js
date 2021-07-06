
function saveContact() {
    let firstname = document.getElementById('firstName');
    let lastname = document.getElementById('lastName');
    let adresse = document.getElementById('adresse');
    let zip = document.getElementById('zip');
    let city = document.getElementById('city');
    let state = document.getElementById('state');
    let country = document.getElementById('country');
    let isPrivate = document.getElementById('isprivate').checked;
    let ownerlist = document.getElementById('owner');
    let owner = ownerlist.options[ownerlist.selectedIndex];


     
    addMarker(firstname.value+" "+lastname.value,adresse.value,zip.value);
    if (username.value == "admina") {
        let adminContactNew = new Contact(firstname.value, lastname.value, adresse.value, zip.value, city.value, state.value, country.value,isPrivate,owner.value);
        
        localStorage.setItem(localStorage.length,JSON.stringify(adminContactNew));
        console.log(localStorage);
        
        if(adminContactNew.owner=="self"){
            let hartcodiert = document.getElementById('hartcodiertadmin');
            let admin = document.createElement('div');
            admin.className = "rechtecke";
            admin.innerHTML = adminContactNew.firstname + " " + adminContactNew.lastname;
            hartcodiert.appendChild(admin);
            onClickOpenUpdate();
            document.getElementById("addcontact").style.display = "none";
            
        } else {
            let hartcodiert = document.getElementById('hartcodiertnormalo');
            let normalo = document.createElement('div');
            normalo.className = "rechtecke";
            normalo.innerHTML = adminContactNew.firstname + " " + adminContactNew.lastname;
            hartcodiert.appendChild(normalo);
            onClickOpenUpdate();
            document.getElementById("addcontact").style.display = "none";
        }
        

    } else {
        let normaloContactNew = new Contact(firstname.value, lastname.value, adresse.value, zip.value, city.value, state.value, country.value, isPrivate,"normalo");
        
        localStorage.setItem(localStorage.length,JSON.stringify(normaloContactNew));
        console.log(localStorage);
        let hartcodiert = document.getElementById('hartcodiertnormalo');
        let normalo = document.createElement('div');
        normalo.className = "rechtecke";
        normalo.innerHTML = normaloContactNew.firstname + " " + normaloContactNew.lastname;
        hartcodiert.appendChild(normalo);
        onClickOpenUpdate();
        document.getElementById("addcontact").style.display = "none";
    }


    document.getElementById("mainScreen").style.display = "inline-block";

}