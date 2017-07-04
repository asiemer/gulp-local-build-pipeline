window.onload = function() {
	Dog =document.getElementById('dog');
	Cat= document.getElementById('cat');
	Rabbit = document.getElementById('rabbit');
	Bird=document.getElementById('bird');
	msg = document.getElementById('message');

	var sfxDog = document.getElementById('sfx-dog');
	var SfxCat = document.getElementById('sfx-cat');
	var SfxBear = document.getElementById('sfx-bear');
	var SfxRooster = document.getElementById('sfx-rooster');
	var SfxEagle = document.getElementById('sfx-eagle');
	var SfxRabbit = document.getElementById('sfx-rabbit');
	var home = document.getElementById('home');
	
	Cat.addEventListener('click',function(e) { 
		console.dir(e);
		Cat.classList.add('wobble')
		SfxCat.play();	
		console.log('cat clicked');

		doFetch('cat');
	});
	Cat.addEventListener('animationend',function() {
		Cat.classList.remove("wobble");
		clearMsg();
	})

	Dog.addEventListener('click',function() { 
		Dog.classList.add('bounceIn')
		sfxDog.play();	
		console.log('dog clicked');

		doFetch('dog');
	});
	Dog.addEventListener('animationend',function() {
		Dog.classList.remove("bounceIn");
		clearMsg();
	})

	Rabbit.addEventListener('click',function() { 
		Rabbit.classList.add('bounceOutUp')
		SfxRabbit.play();	
		console.log('rabbit clicked');

		doFetch('rabbit');
	});
	Rabbit.addEventListener('animationend',function() {
		Rabbit.classList.remove("bounceOutUp");
		clearMsg();
	})

	Bird.addEventListener('click',function() { 
		Bird.classList.add('zoomOutUp')
		SfxEagle.play();	
		console.log('bird clicked');

		doFetch('bird');
	});
	Bird.addEventListener('animationend',function() {
		Bird.classList.remove("zoomOutUp");
		clearMsg();
	})

	let clearMsg = function() {
		msg.innerHTML = "";
	}
	let doFetch = function(critter) {
		fetch('/' + critter)
			.then(function(response){return response.json();})
			.then(function(data) {msg.innerHTML = `What's a ${critter} say? ${data}`})
	}
}