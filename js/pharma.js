
// --- -- --- ----- -- --- ----- -- --- ----- -- --- ----- -- --- -- script Exec Fastest :
//Pharma App Script  --- -- --- ----- -- --- ----- -- --- ----- -- --- onload < jQuery.ready < topPage

/* -- @startup -- */
window.onload = function () {
    // console.time('onLoad');
    var Id;
    selectPage();
    // console.timeEnd('onLoad');
    loadingBD();
    listProduct();
}

/*
Selecteur de Page et changement des variables 
du scripts par des constantes */
function selectPage() {
    if ( $('.pharma').attr('id') == 'meds' ) { Id = 'meds'; console.log('meds');
    } else if ( $('.pharma').attr('id') == 'clients' ) { Id = 'clients'; console.log('clients');
    } else if ( $('.pharma').attr('id') == 'employes' ) { Id = 'employes'; console.log('employes');
    } else if ( $('.pharma').attr('id') == 'fournisseurs' ) { Id = 'fournisseurs'; console.log('fournisseurs');
    } else if ( $('.pharma').attr('id') == 'home' ) { Id = 'home'; console.log('home');
    } else { console.log('page inconnue'); }
}

/*
Fonction Test d'un Nombre Entier Positif 
(Number) nb = nombre a tester*/
function checkNEP(nb) {
    if ( !isNaN(nb) && nb%1 === 0 && nb >= 0 ) { 
    return nb; } else { return false }
}
/*
false || alt. |> return checkStr(window.prompt('string plz ! :')
check s'il existe et String */
function checkStr(str) {
    if ( str !== null && isNaN(str) ) { return str ;
    } else { return false }
}
/*
Check de la 2eme entrée du formulaire */
function chkSubmit(val2) {
    if ( Id == 'meds' ) { return checkNEP(val2);
    } else if ( Id == 'clients' ) { return checkNEP(val2);
    } else if ( Id == 'employes' ) { return checkStr(val2);
    } else if ( Id == 'fournisseurs' ) { return checkStr(val2); 
    }
}


/*
Loading localStorage DB @startup */
function loadingBD(){
    if ( localStorage.jsonStockDB ) { stock = JSON.parse(localStorage.getItem('jsonStockDB')); }
    if ( localStorage.jsonEmployDB ) { employ = JSON.parse(localStorage.getItem('jsonEmployDB')); }
    if ( localStorage.jsonClientDB ) { client = JSON.parse(localStorage.getItem('jsonClientDB')); }
    if ( localStorage.jsonFournisseurDB ) { fournisseur = JSON.parse(localStorage.getItem('jsonFournisseurDB')); }

}
/*
LOCAL STORAGE */
function updateLS() {
    localStorage.setItem('jsonStockDB', JSON.stringify(stock));
    localStorage.setItem('jsonEmployDB', JSON.stringify(employ));
    localStorage.setItem('jsonClientDB', JSON.stringify(client));
    localStorage.setItem('jsonFournisseurDB', JSON.stringify(fournisseur));
}


/*
Fonction d'ajout d'un produit
(String & Int) */
function addProduct(val1,val2) {
    if ( Id == 'meds' ) {
        if ( !(stock[val1]) ) {
            stock[val1] = val2;
            updateLS();
        } else {
            if (window.confirm(val1+" existe !\nVoulez-vous modifier ce produit ?") ){
                editProduct(val1,val2);
            } else { window.alert(val1+" n'a pas été modifier."); }
        }
    } else if ( Id == 'employes' ) {
        if ( !(employ[val1]) ) {
            employ[val1] = val2;
            updateLS();
        } else {
            if (window.confirm(val1+" existe !\nVoulez-vous modifier cet employé ?") ){
                editProduct(val1,val2);
            } else { window.alert(val1+" n'a pas été modifier."); }
        }
    } else if ( Id == 'clients' ) {
        if ( !(client[val1]) ) {
            client[val1] = val2;
            updateLS();
        } else {
            if (window.confirm(val1+" existe !\nVoulez-vous modifier ce client ?") ){
                editProduct(val1,val2);
            } else { window.alert(val1+" n'a pas été modifier."); }
        }
    } else if ( Id == 'fournisseurs' ) {
        if ( !(fournisseur[val1]) ) {
            fournisseur[val1] = val2;
            updateLS();
        } else {
            if (window.confirm(val1+" existe !\nVoulez-vous modifier ce fournisseur ?") ){
                editProduct(val1,val2);
            } else { window.alert(val1+" n'a pas été modifier."); }
        }
    }
    $('#valOne,#valTwo').val('');
}


/*
Fonction de modif d'un produit
(String & Int) */ 
function editProduct(val1,newVal2) {
    if ( Id == 'meds' ) {
        if (stock[val1] ) { stock[val1] = checkNEP(newVal2);              // reSet la valeur du stock || stock[val1]+= Number(newVal2);
        } else { addProduct(val1,newVal2); }
    } else if ( Id == 'employes' ) {
        if (employ[val1] ) { employ[val1] = checkStr(newVal2);
        } else { addProduct(val1,newVal2); }
    } else if ( Id == 'clients' ) {
        if (client[val1] ) { client[val1] = checkNEP(newVal2);
        } else { addProduct(val1,newVal2); }
    } else if ( Id == 'fournisseurs' ) {
        if (fournisseur[val1] ) { fournisseur[val1] = checkStr(newVal2);
        } else { addProduct(val1,newVal2); }
    }
    updateLS();
    $('#valOne,#valTwo').val('');
}


/*
Fonction de modif d'un produit
(par le boutton du tableau) */ 
function switchProduct(oldVal) {
    $('#js-AMS').text('Modifier');
    $('#medBtn').text('Edit');
    $('#valTwo').show();

    $('#valOne').val(oldVal);

    if ( Id == 'meds' ) { 
        $('#valTwo').val(stock[oldVal]);
        delete stock[oldVal];
    } else if ( Id == 'employes' ) { 
        $('#valTwo').val(employ[oldVal]);
        delete employ[oldVal];
    } else if ( Id == 'clients' ) { 
        $('#valTwo').val(client[oldVal]);
        delete client[oldVal];
    } else if ( Id == 'fournisseurs' ) { 
        $('#valTwo').val(fournisseur[oldVal]);
        delete fournisseur[oldVal];
    }
}


/*
Fonction de suppression d'un produit
(string) */
function remProduct(val1) {
    if ( Id == 'meds' ) {
        if (stock[val1]) {
            if ( window.confirm(val1 + ' va être supprimer définitivement.\nEtes-vous sur ?') ) {
                delete stock[val1];
                updateLS();
            }
        } else { window.alert(val1 + " n'éxiste pas") }
    } else if ( Id == 'employes' ) {
        if (employ[val1]) {
            if ( window.confirm(val1 + ' va être supprimer définitivement.\nEtes-vous sur ?') ) {
                delete employ[val1];
                updateLS();
            }
        } else { window.alert(val1 + " n'éxiste pas") }
    } else if ( Id == 'clients' ) {
        if (client[val1]) {
            if ( window.confirm(val1 + ' va être supprimer définitivement.\nEtes-vous sur ?') ) {
                delete client[val1];
                updateLS();
            }
        } else { window.alert(val1 + " n'éxiste pas") }
    } else if ( Id == 'fournisseurs' ) {
        if (fournisseur[val1]) {
            if ( window.confirm(val1 + ' va être supprimer définitivement.\nEtes-vous sur ?') ) {
                delete fournisseur[val1];
                updateLS();
            }
        } else { window.alert(val1 + " n'éxiste pas") }
    }
    $('#valOne').val('');
}


/*
Liste les éléments de l'objet 
avant de les retourner dans un tableau. */
function listProduct(){
    let html = '';
    if ( Id == 'meds' ) {
        for (key in stock) {html+='<tr><th scope="row"><a href="#" class="badge badge-warning js-tab-edit" data-nom="'+(key)+'">edit</a><a href="#" class="js-tab-del badge badge-danger" data-nom="'+(key)+'">del</a></th><th scope="row">'+(key)+'</th><td>'+(stock[key])+'</td></tr>'; }
    } else if ( Id == 'employes' ) {
        for (key in employ) { html+='<tr><th scope="row"><a href="#" class="badge badge-warning js-tab-edit" data-nom="'+(key)+'">edit</a><a href="#" class="js-tab-del badge badge-danger" data-nom="'+(key)+'">del</a></th><th scope="row">'+(key)+'</th><td>'+(employ[key])+'</td></tr>'; }
    } else if ( Id == 'clients' ) {
        for (key in client) { html+='<tr><th scope="row"><a href="#" class="badge badge-warning js-tab-edit" data-nom="'+(key)+'">edit</a><a href="#" class="js-tab-del badge badge-danger" data-nom="'+(key)+'">del</a></th><th scope="row">'+(key)+'</th><td>'+(client[key])+'</td></tr>'; }
    } else if ( Id == 'fournisseurs' ) {
        for (key in fournisseur) { html+='<tr><th scope="row"><a href="#" class="badge badge-warning js-tab-edit" data-nom="'+(key)+'">edit</a><a href="#" class="js-tab-del badge badge-danger" data-nom="'+(key)+'">del</a></th><th scope="row">'+(key)+'</th><td>'+(fournisseur[key])+'</td></tr>'; }
    }
    $('#jq-inserTabl').html(html);
}



// --- -- --- ----- -- --- ----- -- --- ----- -- --- ----- -- --- --
// --- -- --- ----- -- --- FIN FONCTIONS ----- -- --- ----- -- --- --
// --- -- --- ----- -- --- ----- -- --- ----- -- --- ----- -- --- --

var stock = {}, employ = {}, client = {}, fournisseur = {};
// var Id;



jQuery(document).ready(function(){//--------------------------- jQuery
    
    $('#valOneAlert,#valTwoAlert').hide();

//----------------------------------------------- PAGE SWITCH
    $('#js-AMS').click(function(){
        let x = $('#js-AMS').text();

        if ( x == 'Ajouter' ) {
            $('#js-AMS').text('Modifier');
            $('#medBtn').text('Edit');

        } else if ( x == 'Modifier' ) {
            $('#js-AMS').text('Supprimer');
            $('#valTwo').hide();
            $('#medBtn').text('Delete');

        } else {
            $('#js-AMS').text('Ajouter');
            $('#valTwo').show();
            $('#medBtn').text('Add');
        }
    });


//----------------------------------------------- SUBMIT
$("form").submit(function(e){
    e.preventDefault();
    $('#valOne, #valTwo').css({"border":"none"});
    $('#valOneAlert,#valTwoAlert').hide();

    let inputOne = checkStr($('#valOne').val());
    let inputTwo = chkSubmit($('#valTwo').val());
    
    if (inputOne) {
        let x = $('#js-AMS').text();
        if (inputTwo) {
            if ( x == 'Ajouter' ) {
                addProduct(inputOne,inputTwo);
            } else if ( x == 'Modifier' ) {
                editProduct(inputOne,inputTwo);
                }
        } else if ( x == 'Supprimer' ) {
            remProduct(inputOne);
        } else {
            $('#valTwo').css({"border":"2px solid red"});
            $('#valTwoAlert').show();
        }    
    } else {
        $('#valOne').css({"border":"2px solid red"});
        $('#valOneAlert').show();
    }
    listProduct();
});


//----------------------------------------------- TABL CLICK BTNs edit & del
$(document).on("click",".js-tab-edit",function(){
    let oldVal = $(this).data('nom');
    switchProduct(oldVal);
    listProduct();
});

$(document).on("click",".js-tab-del",function(){
    let x = $(this).data('nom');
    remProduct(x);
    listProduct();
});


//----------------------------------------------- jQuery ;)
//noOne



});
