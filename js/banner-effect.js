// let time = 10000
// let banner = document.querySelector('#baniere')
// let tran = 'animation: pos-banner 1s ease -in -out infinite alternate both;'
// let firstConent = true

// function changeBaniere() {
// 	if (firstConent) {
// 		banner.innerHTML = `<div class="baniere-item">
// 			<p>
// 				<span class="bold" id="message-baniere">e-Shoes , Votre satisfaction Notre priorité.</span><br>
// 				<span>Un véritable panier de la ménagère depuis plus de 10 ans !</span>
// 			</p>
// 			<img src="../data/baniere-image4.jpg" alt="image de fond de la baniere" height="500" height="300">
// 		</div>
// 		<p>Obtenez jusqu'au  
// 			<span class="reduction">
// 			<i class="fa-solid fa-star"></i> 70 % <i class="fa-solid fa-star"></i>

// 			</span>
// 			 de reduction sur nos produits actuellement.</p>`;
// 		banner.style.animation = 'pos-banner 1s ease -in -out infinite alternate both;'

// 		firstConent = false
// 	}
// 	else {
// 		banner.innerHTML = `<div class="baniere2">
// 		<p class="message" >Achetez <br>
// 			<span class="reduction"> 
// 				<i class="fa-solid fa-star"></i> 2  <i class="fa-solid fa-star"></i>
// 			</span>
// 			 et recevez <span class="reduction">1 Gratuitement </span>de notre part. 
// 		</p>
// 		<p>
// 			<img src="../data/img/undraw_social_thinking_re_y8cc.svg" alt="image de fond de la baniere" width="600" height="400"><br>
// 			C'est la folie en ce moment les Boutiques de 
// 			<span class="p-30 logo-design">e-Shoes</span>
// 		</p>
// 	</div>`
// 		banner.style.animation = 'pos-banner 1s ease -in -out infinite alternate both;'

// 		firstConent = true
// 	}

// }

// let inter = setInterval(changeBaniere, time)

// window.onload = changeBaniere();

const smallTitleContent = ['e-Shoes , Votre satisfaction Notre priorité.', 'Chez Nous le clinet est ROI.']
const headLineTitle = [`<h1>Un véritable panier de la ménagère depuis plus de 10 ans !</h1>`, `<h1>C'est la folie en ce moment les Boutiques de 
<span class="p-30 logo-design">e-Shoes</span></h1>`]

const descriptionContent = [`Obtenez jusqu'a 
<span class="reduction">
<i class="fa-solid fa-star"></i> 70 % <i class="fa-solid fa-star"></i>
</span> de reduction sur nos produits actuellement.`, `Achetez 
<span class="reduction"> 
	<i class="fa-solid fa-star"></i> 2  <i class="fa-solid fa-star"></i>
</span>
 et recevez <span class="reduction"> 1 Gratuitement </span>de notre part. `]

const headLine = document.querySelector('.headline')
const description = document.querySelector('.description')
const smallTitle = document.querySelector('.small-title')
const rightSection = document.querySelector('.right-section')

let i = 0

function ChangeContentBanner() {
	headLine.innerHTML = headLineTitle[i]
	description.innerHTML = descriptionContent[i]
	smallTitle.innerHTML = smallTitleContent[i]
	rightSection.innerHTML = `<img src="../data/img/svg1${i+1}.svg" alt="">`
	rightSection.style.animation = 'pos4 1.5s ease-in-out'
	smallTitle.style.animation = 'pos1 .5s ease-in-out'
	headLine.style.animation = 'pos2 1.5s ease-in-out'
	description.style.animation = 'pos3 .5s ease-in-out '

	document.addEventListener('animationend', function () {
		smallTitle.style.removeProperty('animation')
		headLine.style.removeProperty('animation')
		description.style.removeProperty('animation')
		rightSection.style.removeProperty('animation')
	})

	if (i == 0) i = 1
	else i = 0
}
window.onload = ChangeContentBanner();
let intervale = setInterval(ChangeContentBanner, 10000)