"use strict";

window.onload = function () {
	var dog = document.getElementById("dog");
	var cat = document.getElementById("cat");
	var rabbit = document.getElementById("rabbit");
	var bird = document.getElementById("bird");
	var msg = document.getElementById("message");

	var sfxDog = document.getElementById("sfx-dog");
	var sfxCat = document.getElementById("sfx-cat");
	var sfxEagle = document.getElementById("sfx-eagle");
	var sfxrabbit = document.getElementById("sfx-rabbit");

	var clearMsg = function clearMsg() {
		msg.innerHTML = "";
	};

	var doFetch = function doFetch(critter) {
		fetch("/" + critter).then(function (response) {
			return response.json();
		}).then(function (data) {
			msg.innerHTML = "What's a " + critter + " say? " + data;
		});
	};

	cat.addEventListener("click", function (e) {
		console.dir(e);
		cat.classList.add("wobble");
		sfxCat.play();
		console.log("Cat clicked");

		doFetch("cat");
	});

	cat.addEventListener("animationend", function () {
		cat.classList.remove("wobble");
		clearMsg();
	});

	dog.addEventListener("click", function () {
		dog.classList.add("bounceIn");
		sfxDog.play();
		console.log("Dog clicked");

		doFetch("dog");
	});

	dog.addEventListener("animationend", function () {
		dog.classList.remove("bounceIn");
		clearMsg();
	});

	rabbit.addEventListener("click", function () {
		rabbit.classList.add("bounceOutUp");
		sfxrabbit.play();
		console.log("rabbit clicked");

		doFetch("rabbit");
	});

	rabbit.addEventListener("animationend", function () {
		rabbit.classList.remove("bounceOutUp");
		clearMsg();
	});

	bird.addEventListener("click", function () {
		bird.classList.add("zoomOutUp");
		sfxEagle.play();
		console.log("bird clicked");

		doFetch("bird");
	});

	bird.addEventListener("animationend", function () {
		bird.classList.remove("zoomOutUp");
		clearMsg();
	});
};
//# sourceMappingURL=scripts.js.map
