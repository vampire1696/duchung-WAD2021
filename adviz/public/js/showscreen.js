function mainshow(isAdmine) {
    document.getElementById("login").style.display = "none";
    document.getElementById("addcontact").style.display = "none";
    document.getElementById("updatescreen").style.display = "none";
    document.getElementById("mainScreen").style.display = "inline-block";

    if (isAdmine == true) {
        document.getElementById("welcome").innerHTML = "Hello admino";

        createElementAdminContact();
        showLocolstorageContact("admina");
        createElementNormaloContact();
        showLocolstorageContact("normalo");
        onClickOpenUpdate();

        let hartcodiert = document.getElementById('hartcodiertadmin');
        hartcodiert.style.display = "inline-block";


    } else {
        document.getElementById("welcome").innerHTML = "Hello normalo";
        createElementNormaloContact();
        showPublicAdminContact();
        showLocolstorageContact("normalo");
        onClickOpenUpdate();
        let hartcodiert = document.getElementById('hartcodiertnormalo');
        hartcodiert.style.display = "inline-block";

    }

    alert("main screen");

}
var stringHTML;
var getitemdeleteUpdate;

function onClickOpenUpdate() {
    document.querySelectorAll('.rechtecke').forEach(item => {
        item.addEventListener('click', event => {
            console.log(item);
            console.log(item.innerHTML);
            getitemdeleteUpdate = item;
            updateContact(item.innerHTML);
            stringHTML = item.innerHTML;
            updateshow();
        })
    })
}
function updateContact(usertoEditName) {
    for (let i = 0; i < localStorage.length; i++) {
        let findContact = JSON.parse(localStorage.getItem(i));
        var fullname = findContact.firstname + " " + findContact.lastname;
        if (fullname.trim() == usertoEditName.trim()) {
            showInfoContact(findContact);
        }
    }
    for (let i = 0; i < admincontactlist.length; i++) {
        var fullname = admincontactlist[i].firstname + " " + admincontactlist[i].lastname;
        if (fullname.trim() == usertoEditName.trim()) {
            showInfoContact(admincontactlist[i]);
        }

    }
    for (let i = 0; i < normalocontactlist.length; i++) {
        var fullname = normalocontactlist[i].firstname + " " + normalocontactlist[i].lastname;
        if (fullname.trim() == usertoEditName.trim()) {
            showInfoContact(normalocontactlist[i]);
        }

    }
}
function showInfoContact(contact) {
    console.log(contact);
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
    if (username.value == "normalo") {                  //Cant update
        if (contact.owner == "normalo"||contact.owner =="self" && contact.isPrivate == false) {
            firstname.value = contact.firstname;
            lastname.value = contact.lastname;
            adresse.value = contact.adresse;
            zip.value = contact.zip;
            city.value = contact.city;
            state.value = contact.state;
            country.value = contact.country;
            isPrivate = contact.isPrivate;
            owner.value = contact.owner;
        }
    } else {
        firstname.value = contact.firstname;
        lastname.value = contact.lastname;
        adresse.value = contact.adresse;
        zip.value = contact.zip;
        city.value = contact.city;
        state.value = contact.state;
        country.value = contact.country;
        isPrivate = contact.isPrivate;
        owner.value = contact.owner;
    }



}
function showhartcordiert2() {
    if (username.value == "admina") {
        let hartcodiertnormalo = document.getElementById('hartcodiertnormalo');
        hartcodiertnormalo.style.display = "none";
        let hartcodiert = document.getElementById('hartcodiertadmin');
        hartcodiert.style.display = "inline-block";
    } else if (username.value == "normalo") {
        let hartcodiertadmin = document.getElementById('hartcodiertadmin');
        hartcodiertadmin.style.display = "none";
        let hartcodiertpublicadmin = document.getElementById('hartcodiertPublicAdmin');
        hartcodiertpublicadmin.style.display = "none";
        let hartcodiert = document.getElementById('hartcodiertnormalo');
        hartcodiert.style.display = "inline-block";
    }

}
function showhartcordiertAll() {
    if (username.value == "admina") {
        let hartcodiert = document.getElementById('hartcodiertadmin');
        hartcodiert.style.display = "inline-block";
        let hartcodiert2 = document.getElementById('hartcodiertnormalo');
        hartcodiert2.style.display = "inline-block";

    } else if (username.value == "normalo") {
        let hartcodiert = document.getElementById('hartcodiertnormalo');
        hartcodiert.style.display = "inline-block";
        let hartcodiertpublic = document.getElementById('hartcodiertPublicAdmin');
        hartcodiertpublic.style.display = "inline-block";
        // alert("Helllooo,chay den day roi");
    }
}
function loginshow() {
    document.getElementById("addcontact").style.display = "none";
    document.getElementById("updatescreen").style.display = "none";
    document.getElementById("mainScreen").style.display = "none";
    document.getElementById("welcome").innerHTML = "Welcome";
    document.getElementById("login").style.display = "inline-block";
    alert("login screen");
}
function logout() {
    location.reload();

}

function addcontactshow() {
    document.getElementById("mainScreen").style.display = "none";
    document.getElementById("updatescreen").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("addcontact").style.display = "inline-block";
    alert("addcontact screen");
}

function updateshow() {
    document.getElementById("addcontact").style.display = "none";
    document.getElementById("mainScreen").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("updatescreen").style.display = "inline-block";

}