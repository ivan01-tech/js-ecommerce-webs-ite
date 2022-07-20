
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
	rightSection.innerHTML = `<img src="../data/img/svg1${i + 1}.svg" alt="">`
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

	i = i == 0 ? 1 : 0
}
window.onload = ChangeContentBanner();
let intervale = setInterval(ChangeContentBanner, 10000)