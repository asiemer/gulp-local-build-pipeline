window.onload = function() {
	const dog = document.getElementById("dog");
	const cat = document.getElementById("cat");
	const rabbit = document.getElementById("rabbit");
	const bird = document.getElementById("bird");
	const msg = document.getElementById("message");

	const sfxDog = document.getElementById("sfx-dog");
	const sfxCat = document.getElementById("sfx-cat");
	const sfxEagle = document.getElementById("sfx-eagle");
	const sfxrabbit = document.getElementById("sfx-rabbit");

	const clearMsg = function() {
		msg.innerHTML = "";
	};

	const doFetch = function(critter) {
		fetch(`/${critter}`)
			.then(response => response.json())
			.then(data => {
				msg.innerHTML = `What's a ${critter} say? ${data}`;
			});
	};

	cat.addEventListener("click", e => {
		console.dir(e);
		cat.classList.add("wobble");
		sfxCat.play();
		console.log("Cat clicked");

		doFetch("cat");
	});

	cat.addEventListener("animationend", () => {
		cat.classList.remove("wobble");
		clearMsg();
	});

	dog.addEventListener("click", () => {
		dog.classList.add("bounceIn");
		sfxDog.play();
		console.log("Dog clicked");

		doFetch("dog");
	});

	dog.addEventListener("animationend", () => {
		dog.classList.remove("bounceIn");
		clearMsg();
	});

	rabbit.addEventListener("click", () => {
		rabbit.classList.add("bounceOutUp");
		sfxrabbit.play();
		console.log("rabbit clicked");

		doFetch("rabbit");
	});

	rabbit.addEventListener("animationend", () => {
		rabbit.classList.remove("bounceOutUp");
		clearMsg();
	});

	bird.addEventListener("click", () => {
		bird.classList.add("zoomOutUp");
		sfxEagle.play();
		console.log("bird clicked");

		doFetch("bird");
	});

	bird.addEventListener("animationend", () => {
		bird.classList.remove("zoomOutUp");
		clearMsg();
	});
};
