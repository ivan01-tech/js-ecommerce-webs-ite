	let  time = 20000
		let firstConent = true
		function changeBaniere(){
			if(firstConent){
			document.querySelector('#baniere').innerHTML = `<div class="baniere-item">
			<p>
				<span class="bold" id="message-baniere">e-Commerce , Votre satisfaction Notre priorité.</span><br>
				<span>Un véritable panier de la ménagère depuis plus de 10 ans !</span>
			</p>
			<img src="../data/baniere-image4.jpg" alt="image de fond de la baniere" height="500" height="300">
		</div>
		<p>Obtenez jusqu'au  
			<span class="reduction">
			<i class="fa-solid fa-star"></i> 70 % <i class="fa-solid fa-star"></i>
			
			</span>
			 de reduction sur nos produits actuellement.</p>`;

			firstConent = false
		}
		else{
			document.querySelector('#baniere').innerHTML = `<div class="baniere2">
		<p class="message" >Achetez <br>
			<span class="reduction"> 
				<i class="fa-solid fa-star"></i> 2  <i class="fa-solid fa-star"></i>
			</span>
			 et recevez <span class="reduction">1 Gratuitement </span>de notre part. 
		</p>
		<p>
			<img src="../data/baniere-image3.jpg" alt="image de fond de la baniere" width="600" height="400"><br>
			C'est la folie en ce moment les Boutiques de 
			<span class="p-30 logo-design">e-Commerce</span>
		</p>
	</div>`
			firstConent = true
		}

	}

// setInterval(changeBaniere , time)
window.onload = changeBaniere();


		