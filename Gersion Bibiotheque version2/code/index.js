let formulaire = document.querySelector("form"),
    tableau = document.getElementById("totales-ouvrages");

function ordonner_tableau() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.querySelector("tbody");
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 0; i < table.rows.length - 1; i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[0];
            y = rows[i + 1].getElementsByTagName("td")[0];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function vider_formulaire() {
    document.getElementById("titre").value = "";
    document.getElementById("auteur").value = "";
    document.getElementById("prix").value = "";
    document.getElementById("date").value = "";
    document.getElementById("Selectlangue").value = "";
    document.getElementById("email").value = "";
    //document.querySelector('input[type="radio"]:checked').checked ="";
}

// 1:  ajouter les informations ds le tableau
let tbody1 = document.getElementById("tbody1");
function insererDsTable() {
    let titre = document.querySelector("#titre").value.trim();
    let auteur = document.querySelector("#auteur").value.trim();
    let prix = document.querySelector("#prix").value.trim();
    let date = document.querySelector("#date").value;
    let selectlangue = document.querySelector("#Selectlangue").value;
    let mail = document.querySelector("#email").value.trim();
    let selectype = document.querySelector('input[name="name"]:checked').value;

    tbody1.innerHTML += `<tr>
    <td>${titre} </td>
    <td>${auteur}</td>
    <td> ${prix} </td>
    <td> ${date} </td>
    <td> ${selectlangue} </td>
    <td> ${mail} </td>
    <td> ${selectype} </td>
    <td>${(innerHTML = `<input type="image" class="Edit" src="./fonts/edit-solid.svg" ></input> `)}</td>
    <td>${(innerHTML = `<input type="image" class="Delete" src="./fonts/minus-circle-solid.svg" ></input> `)}</td>
    </tr> `;

    vider_formulaire();
    ordonner_tableau();
    alert(
        `L'ouvrage ${titre} est un ${selectype} en langue ${selectlangue} écrit par  ${auteur}  et publié le ${date} Le prix de ${titre} , est de  ${prix} DHs`
    );
} formulaire.addEventListener("submit", insererDsTable);

// ::::::local storege    
var arr = new Array();
function get() {
    let str = localStorage.getItem("pData");
    if (str != null) 
    arr = JSON.parse(str);
}
function add(){
    tbody1.remove();
    get();
    arr.splice(0);
    for (let i = 0; i < tbody1.rows.length; i++) {
        arr.push({
            titre: tbody1.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML ,
            auteur:tbody1.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].innerHTML ,
            prix:tbody1.getElementsByTagName("tr")[i].getElementsByTagName("td")[2].innerHTML,
            date:tbody1.getElementsByTagName("tr")[i].getElementsByTagName("td")[3].innerHTML,
            langue:tbody1.getElementsByTagName("tr")[i].getElementsByTagName("td")[4].innerHTML,
            email:tbody1.getElementsByTagName("tr")[i].getElementsByTagName("td")[5].innerHTML,
            type:  tbody1.getElementsByTagName("tr")[i].getElementsByTagName("td")[6].innerHTML ,
            modifier:` ${(innerHTML = `<input type="image" class="Edit" src="./fonts/edit-solid.svg" ></input> `)}` ,
            suprimer:`  ${(innerHTML = `<input type="image" class="Delete" src="./fonts/minus-circle-solid.svg" ></input> `)}`
        })
    };
    localStorage.setItem("pData",JSON.stringify(arr));
    console.log(arr);
}
window.onload = function insert() {
    get();
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
        tbody1.innerHTML += `<tr>
        <td>${arr[i].titre}</td>
        <td>${arr[i].auteur}</td>
        <td> ${arr[i].prix} </td>
        <td> ${arr[i].date} </td>
        <td> ${arr[i].langue} </td>
        <td> ${arr[i].email} </td>
        <td> ${arr[i].type} </td>
        <td> ${arr[i].modifier} </td>
        <td> ${arr[i].suprimer} </td>
        </tr> `;
    }
    console.log(tbody1);
    ordonner_tableau();
}  
function Storage() {
    if (confirm("Est-vous sûre de vouloir stocker ces Ouvrages dans la mémoire interne?!! ")) {
        add();
        window.location.reload(true);
    }
}
function vider() {
        if (confirm("Est-vous sûre de vouloir suprimer tous les Ouvrages enregistrer dans la mémoire interne ?!! ")) {
            localStorage.clear();
            window.location.reload(true);
        }
}

// 2:  supprimer une ligne ds le tableau
function suprimer_Ligne(b) {
    if (!b.target.classList.contains("Delete")) return;
    if (confirm("Est-vous sûre de vouloir supprimer cette Ouvrage de votre tableau ?!! "))
        b.target.closest("tr").remove();
    else return;
}
tableau.addEventListener("click", suprimer_Ligne);

// 3: modifier les informations saisi
function update_ouvrage(c) {
    let un_titre = document.getElementById("titre").value.trim();
    let un_auteur = document.getElementById("auteur").value.trim();
    let le_prix = document.getElementById("prix").value.trim();
    let la_date = document.getElementById("date").value;
    let une_selectlangue = document.getElementById("Selectlangue").value;
    let auteur_mail = document.getElementById("email").value;

    // email Regex Validation
    var emailRegex = new RegExp(
        /^[a-z\d\.]+@[a-z\d]+\.([a-z]{2,8})(\.[a-z]{2,8})?$/
        );
        let mail = emailRegex.test(auteur_mail);
        // prix Regex Validation
        var prixRegex = new RegExp(/^\d+(.\d{1,2})?$/);
        let prix = prixRegex.test(le_prix);
        
    if (!c.target.classList.contains("Edit")) return;

    if (un_titre != "") {
        if (confirm("Est-vous sûre de vouloir modifier le titre de cette Ouvrage  ?!! "))
        c.target.closest("tr").getElementsByTagName("td")[0].innerHTML = un_titre;
        vider_formulaire();
    }
    if (un_auteur != "") {
        if (confirm("Est-vous sûre de vouloir modifier l'auteur de cette Ouvrage  ?!! "))
        c.target.closest("tr").getElementsByTagName("td")[1].innerHTML =un_auteur;
        vider_formulaire();
    }
    if (le_prix != "" && prix == true) {
        if (confirm( "Est-vous sûre de vouloir modifier le prix de cette Ouvrage  ?!! "))
        c.target.closest("tr").getElementsByTagName("td")[2].innerHTML = le_prix;
        vider_formulaire();
    }
    if (le_prix != "" && prix == false)
    alert("veuillez entrer un prix reel valide avec deux nombres apres la virgule ");

    if (la_date != "") {
        if (confirm( "Est-vous sûre de vouloir modifier la date de cette Ouvrage  ?!! "))
        c.target.closest("tr").getElementsByTagName("td")[3].innerHTML = la_date;
        vider_formulaire();
    }
    if (une_selectlangue != "") {
        if (confirm("Est-vous sûre de vouloir modifier la langue de cette Ouvrage  ?!! "))
        c.target.closest("tr").getElementsByTagName("td")[4].innerHTML = une_selectlangue;
    }
    vider_formulaire();

    if (auteur_mail != "" && mail == true) {
        if (confirm("Est-vous sûre de vouloir modifier le mail de l'auteur de cette Ouvrage  ?!! " ))
        c.target.closest("tr").getElementsByTagName("td")[5].innerHTML = auteur_mail;
        vider_formulaire();
    }
    if (auteur_mail != "" && mail == false)
    alert(" veuillez entrer une adresse mail valid avec une  '@'  et un ' .'  ");
    

   let un_type = document.querySelector('input[name="name"]:checked').value;
   if ( un_type != (c.target.closest("tr").getElementsByTagName("td")[6].innerHTML)) {
       if (confirm("Est-vous sûre de vouloir modifier le type de cette Ouvrage  ?!! ")){
           c.target.closest("tr").getElementsByTagName("td")[6].innerHTML =un_type;
    }}
}tableau.addEventListener("click", update_ouvrage);

// imprimer table
let btn = document.getElementById("btn");
btn.addEventListener("click", function () {
    window.print(), (id = '="section2" '); 
});
