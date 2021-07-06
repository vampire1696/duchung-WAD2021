function updateFunction(){
    let firstname = document.getElementById('firstName1');
    let lastname = document.getElementById('lastName1');
    let adresse = document.getElementById('adresse1');
    let zip = document.getElementById('zip1');
    let city = document.getElementById('city1');
    let state = document.getElementById('state1');
    let country = document.getElementById('country1');
    let isPrivate = document.getElementById('isprivate1').checked;
    let ownerlist = document.getElementById('owner1');
    let owner = ownerlist.options[ownerlist.selectedIndex];

    var updatedContact = new Contact(firstname.value,lastname.value,adresse.value,zip.value,city.value,state.value,country.value,isPrivate,owner.value);
    addMarker(firstname.value+" "+lastname.value,adresse.value,zip.value);
    //removeoldMarker   noch nicht fertig
    for(let i=0;i<localStorage.length;i++){
        let checkContact = JSON.parse(localStorage.getItem(i));
        let updatedcreateElement = document.createElement('div');
        var fullname = checkContact.firstname +" "+checkContact.lastname;
        if(fullname.trim() == getitemdeleteUpdate.innerHTML.trim()){         //stringHTML.trim()
            localStorage.setItem(i,JSON.stringify(updatedContact));
            if(username.value=="admina"){
                if(updatedContact.owner=="self"){
                    let hartcodiert = document.getElementById('hartcodiertadmin');
                    let hartcodiertnormalo = document.getElementById('hartcodiertnormalo');
                    updatedcreateElement.className = "rechtecke";
                    updatedcreateElement.innerHTML = updatedContact.firstname + " " + updatedContact.lastname;    
                    console.log(updatedcreateElement);  
                    console.log(getitemdeleteUpdate);  
                    if(hartcodiert.contains(getitemdeleteUpdate)){
                        hartcodiert.replaceChild(updatedcreateElement,getitemdeleteUpdate);
                        getitemdeleteUpdate = updatedcreateElement;    
                    }
                    if(hartcodiertnormalo.contains(getitemdeleteUpdate)) {
                        hartcodiertnormalo.removeChild(getitemdeleteUpdate);
                        hartcodiert.appendChild(updatedcreateElement);
                    }
                    
                } else {
                    let hartcodiert = document.getElementById('hartcodiertadmin');
                    let hartcodiertnormalo = document.getElementById('hartcodiertnormalo');
                    updatedcreateElement.className = "rechtecke";
                    updatedcreateElement.innerHTML = updatedContact.firstname + " " + updatedContact.lastname;
                        
                    if(hartcodiertnormalo.contains(getitemdeleteUpdate)){
                        hartcodiertnormalo.replaceChild(updatedcreateElement,getitemdeleteUpdate);
                        getitemdeleteUpdate = updatedcreateElement;
                    }
                    if (hartcodiert.contains(getitemdeleteUpdate)){
                        hartcodiert.removeChild(getitemdeleteUpdate);
                        hartcodiertnormalo.appendChild(updatedcreateElement);
                    } 
                    console.log(localStorage);
                        
                    
                }
                
            } else {
                if(updatedContact.owner=="self"){
                    alert("Kontakt vom Admina-kann nicht Update");
                } else {
                    let hartcodiertnormalo = document.getElementById('hartcodiertnormalo');
                    updatedcreateElement.className = "rechtecke";
                    updatedcreateElement.innerHTML = updatedContact.firstname + " " + updatedContact.lastname;    
                    console.log(updatedcreateElement);  
                    console.log(getitemdeleteUpdate);  
                    
                    if(hartcodiertnormalo.contains(getitemdeleteUpdate)) {
                        hartcodiertnormalo.replaceChild(updatedcreateElement,getitemdeleteUpdate);
                        getitemdeleteUpdate = updatedcreateElement;    
                    }

                }

            }

        }

        onClickOpenUpdate();
        document.getElementById("updatescreen").style.display = "none";
        document.getElementById("mainScreen").style.display = "inline-block";
}
}

function deleteFunction(){
    if(username.value=="admina"){
        for(let i=0;i<localStorage.length;i++){
            let checkContact = JSON.parse(localStorage.getItem(i));
            var fullname = checkContact.firstname +" "+checkContact.lastname;
            if(fullname.trim() == stringHTML.trim()){
                localStorage.removeItem(i);
                let ersatzNullContact = new Contact(" "," "," "," ","","","",true,"null");
                localStorage.setItem(i,JSON.stringify(ersatzNullContact));
            }
        }
        let hartcodiert = document.getElementById('hartcodiertadmin');
        let hartcodiertnormalo = document.getElementById('hartcodiertnormalo');
        if(hartcodiert.contains(getitemdeleteUpdate))
        {
            hartcodiert.removeChild(getitemdeleteUpdate);
        } else hartcodiertnormalo.removeChild(getitemdeleteUpdate);
        

    } else {
        for(let i=0;i<localStorage.length;i++){
            let checkContact = JSON.parse(localStorage.getItem(i));
            var fullname = checkContact.firstname +" "+checkContact.lastname;
            if(fullname.trim() == stringHTML.trim() && checkContact.owner=="normalo"){
                localStorage.removeItem(i);
                let ersatzNullContact = new Contact(" "," "," "," ","","","",true,"null");
                localStorage.setItem(i,JSON.stringify(ersatzNullContact));
            }
        }
        let hartcodiert = document.getElementById('hartcodiertPublicAdmin');
        let hartcodiertnormalo = document.getElementById('hartcodiertnormalo');
        
        if(hartcodiert.contains(getitemdeleteUpdate))
        {
            alert('Kontakt von Admina-Nicht löscht');
        } else hartcodiertnormalo.removeChild(getitemdeleteUpdate);
    }

    document.getElementById("updatescreen").style.display = "none";
    document.getElementById("mainScreen").style.display = "inline-block";
}