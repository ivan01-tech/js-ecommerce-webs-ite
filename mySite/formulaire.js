let modal = null;

function trueInput(champ){
    champ.style.borderColor="green";
}
function falseInput(champ){
    champ.style.borderColor="red";
}


let formulaire = document.getElementById('myForm');
 
 formulaire.addEventListener('submit',(e)=>{
    
    /*** Traitement champs contact **/
 	let telephone=formulaire.telephone;
 	let reg = /^\+2376[0-9]{8}$/;
 	if ( ! reg.test(telephone.value) ){
 		telephone.style.borderColor = "red";
 		document.getElementById('contactError').innerHTML = "<span class=\"m-1\">X</span>";
 		document.getElementById('contactError').style.color="red";
 	}
 	else{

 		document.getElementById('contactError').innerHTML = "#";
 		document.getElementById('contactError').style.color="green";
 		telephone.style.borderColor = "green";
        window.localStorage.tel = telephone.value;
        document.getElementById('UserContact').innerHTML=telephone.value;
 	}
    /*****    NOM ***/
    let nom = formulaire.nom;
    if(nom.value.length >= 4){
        trueInput(nom);
        window.localStorage.name=nom.value;
        document.getElementById('UserName').innerHTML=nom.value;   
    }
    else
        falseInput(nom);
  /*** Password***/

    let password = formulaire.password
    if(password.value =='password' || password.value <5)
        falseInput(password);
    else
        trueInput(password);

    let age = formulaire.age;
    
        document.getElementById('UserAge').innerHTML=age.value;
        window.localStorage.age = age.value;


        e.preventDefault();
 });


 ///    Mise a Jour DES Utilisateur
 if(window.localStorage.name !=null)
    document.getElementById('UserName').innerHTML=window.localStorage.name;
else
    document.getElementById('UserName').innerHTML="inconu";   
        // Age
if(window.localStorage.age){
        document.getElementById('UserAge').innerHTML = window.localStorage.age;
    }

// Progress bar
let handleScroll = () => {
    progressBar.style.display = "block";
    const heigth = document.body.scrollHeight; //taille du site
    const windowheight = window.innerHeight; // taille navigateur
    const position = window.pageYOffset; // position de la souris par rapport au site

    const heigthTrac = heigth - windowheight;
    const percentage = Math.floor((position/heigthTrac)*100);
    progressBar.style.right = 100 - percentage + "%";
    progressBar.innerHTML= percentage +"%";
    if(percentage == 0 )
        progressBar.innerHTML ="";

}

const progressBar = document.querySelector('.progressBar');
progressBar.style.display = "none";
window.addEventListener('scroll',handleScroll);

//*************************** Gestion du modal
const ouvertureModal = function(e){
    e.preventDefault();         
    const target =document.querySelector(e.target.getAttribute('href'));
    target.style.display =null;
    //target.setAttribute('aria-modal','true');
    //target.removeAttribute('aria-hidden');
    modal = target;
    modal.querySelector(".formulaire").addEventListener('click',stopPropagation);
    modal.addEventListener('click',fermeModal);  // ceci represente la boite modal
   // modal.querySelector(".js-modal-close").addEventListener('click',fermeModal);

}

const stopPropagation = function (e){
    e.stopPropagation();
}
const fermeModal = function(e){
    if(modal === null) return;
    e.preventDefault();
      modal.querySelector(".formulaire").removeEventListener('click',stopPropagation);
    modal.style.display ="none";
    //modal.setAttribute('aria-hidden','true');
    //modal.removeAttribute('aria-modal');
   modal.removeEventListener('click',fermeModal);  // ceci represente la boite modal
  //  modal.querySelector(".js-modal-close").removeEventListener('click',fermeModal);   
    modal = null;

}

let OuvreModal = document.querySelectorAll('.js-modal');
OuvreModal.forEach(link => {
    link.addEventListener('click',ouvertureModal) ;
});

/*********** FIN GESTION MODAL ****************/

/*********** Menu Responsif ****************/

let menuImage = document.querySelector('.res-menu');
let menuResponsif = document.querySelector('.responsive-menu');
let logo = document.querySelector('#monLogo').querySelector('span');
let a = menuResponsif.querySelectorAll('a');

menuImage.addEventListener('click',function(){
    menuResponsif.classList.toggle('widht-menu');
    logo.classList.toggle('hidden');
    for( link of a){
        link.classList.toggle('hidden');
    }

});

let menu = document.querySelector('.memu');
let toggleNav = document.querySelector('.nav-toggle');
toggleNav.addEventListener('click',()=>{
    menu.classList.toggle('active');
});

/*********** Menu Responsif  Fin ****************/
