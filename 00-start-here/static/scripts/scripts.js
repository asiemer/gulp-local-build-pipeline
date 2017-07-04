window.onload = function() {
	Dog =document.getElementById('dog');
	Cat= document.getElementById('cat');
	Rabbit = document.getElementById('rabbit');
	Bird=document.getElementById('bird');

	var sfxDog = document.getElementById('sfx-dog');
	var SfxCat = document.getElementById('sfx-cat');
	var SfxBear = document.getElementById('sfx-bear');
	var SfxRooster = document.getElementById('sfx-rooster');
	var SfxEagle = document.getElementById('sfx-eagle');
	var SfxRabbit = document.getElementById('sfx-rabbit');
	var home = document.getElementById('home');
	
	console.dir(Dog);

	Cat.addEventListener('click',function(e) { 
		console.dir(e);
		Cat.classList.add('wobble')
		SfxCat.play();	
		console.log('cat clicked');
	});
	Cat.addEventListener('animationend',function() {
		Cat.classList.remove("wobble");
	})

	Dog.addEventListener('click',function() { 
		Dog.classList.add('bounceIn')
		sfxDog.play();	
		console.log('dog clicked');
	});
	Dog.addEventListener('animationend',function() {
		Dog.classList.remove("bounceIn");
	})

	Rabbit.addEventListener('click',function() { 
		Rabbit.classList.add('bounceOutUp')
		SfxRabbit.play();	
		console.log('rabbit clicked');
	});
	Rabbit.addEventListener('animationend',function() {
		Rabbit.classList.remove("bounceOutUp");
	})

	Bird.addEventListener('click',function() { 
		Bird.classList.add('zoomOutUp')
		SfxEagle.play();	
		console.log('bird clicked');
	});
	Bird.addEventListener('animationend',function() {
		Bird.classList.remove("zoomOutUp");
	})
}