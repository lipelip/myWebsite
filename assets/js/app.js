document.addEventListener('DOMContentLoaded', function(){
  
  if(document.body.className == "mobile"){
		  var lipelip = document.getElementsByClassName("next__link--lipelip")[0];
			lipelip.innerHTML = "lipelip";	  
  }
	
	var menuNext = document.getElementsByClassName("next__link");
	Array.prototype.forEach.call(menuNext, function(el, i){
		menuNext[i].addEventListener("click", function(){
			// safari bug document.body.classList.remove("still");
			this.offsetParent.classList.toggle("hide-section");
			if( menuNext[i+1] !== undefined){
				menuNext[i+1].offsetParent.classList.toggle("show-section");			
			} else {
				document.getElementsByClassName("section--assets")[0].classList.toggle("show-section");
			}
			
		})
	});

	var menuPrevious = document.getElementsByClassName("previous__link");
	Array.prototype.forEach.call(menuPrevious, function(el, i){
		menuPrevious[i].addEventListener("click", function(){

			this.offsetParent.classList.toggle("show-section");
			if( menuPrevious[i-1] !== undefined){
				menuPrevious[i-1].offsetParent.classList.toggle("hide-section");			
			} else {
				document.getElementsByClassName("section--facts")[0].classList.toggle("hide-section");
			}
			
		})
	});
	
	document.onkeydown = function(event){
	var sectionsShow = document.getElementsByClassName("show-section");

		switch(event.keyCode){
				
			case 38:
				//arrow up
				if(sectionsShow.length > 1){
					sectionsShow[sectionsShow.length - 2].classList.remove("hide-section");
					sectionsShow[sectionsShow.length - 1].classList.remove("show-section");
				}
				break;
				
			case 40:
				//arrow down
				if(sectionsShow.length < 5){
					var nextSections = sectionsShow[sectionsShow.length - 1].nextElementSibling;
					sectionsShow[sectionsShow.length - 1].classList.add("hide-section");
					nextSections.classList.add("show-section");
				}
				break;
		}
	}
	
	var revealMenu = document.getElementsByClassName("reveal__menu")[0],
			menu = document.getElementsByClassName("menu")[0],
			sections = document.getElementsByTagName("section"),
			menuItem = document.getElementsByClassName("menu__item--link");
			
	revealMenu.addEventListener("click", function(){
		menu.classList.remove("menu--hide");	
	})
	menu.addEventListener("click", function(){
		this.classList.add("menu--hide");
	})
	
	Array.prototype.forEach.call(menuItem, function(el, i){
		menuItem[i].addEventListener("click", function(){
			
			Array.prototype.forEach.call(sections, function(el, i){
				sections[i].classList.remove("hide-section");
				sections[i].classList.remove("show-section");
			});
			
			if(i==0){
				sections[i].classList.add("show-section");
			} else {
				for(j=0; j<i; j++){
					sections[j].classList.add("show-section");
					sections[j].classList.add("hide-section");
					sections[i].classList.add("show-section");
				}
			}
						
		})
	});
	
	var p = document.getElementsByClassName("section--about")[0].getElementsByTagName("p"),
			pNext = document.getElementsByClassName("show--next--text")[0];
			
	pNext.addEventListener("click", function(){
		for(i=0; i<p.length; i++){
			if(p[i].className == "show--text"){		
				if(p[i+1] == undefined){
					p[i].classList.remove("show--text");
					p[0].classList.add("show--text");
					pNext.classList.remove("reboot");
				} else {				
					p[i+1].classList.add("show--text");
					p[i].classList.remove("show--text");
					if(p[i+2] == undefined){
						pNext.classList.add("reboot");
					}
					break;
				}
			}
		}
	})
	
	var addImages = function(pageName, pageSection, dataImg){

		var xmlhttp = new XMLHttpRequest(), 
				elem = document.createElement('span'),
				titreParent = document.getElementsByClassName(pageSection)[0].getElementsByClassName("section__title")[0];
				
		xmlhttp.open("GET", pageName+".html", false);
	  xmlhttp.send();
		elem.setAttribute("data-picture", "");
		elem.setAttribute("data-alt", dataImg);		
		elem.innerHTML = xmlhttp.responseText;
		
		document.getElementsByClassName(pageSection)[0].insertBefore(elem, titreParent);
	}
	
	function removeMobile() {
	    //addImages("lipelip", "section--about", "Lipelip's image");
	    //addImages("lipelip-avatar", "section--connect", "Lipelip's avatar");
	    
	    Array.prototype.forEach.call(menuPrevious, function(el, i){
				menuPrevious[i].classList.add("hide");
			});
			Array.prototype.forEach.call(menuNext, function(el, i){
				menuNext[i].classList.add("hide");
			});
	    
	    pNext.classList.add("hide");
	    revealMenu.classList.add("hide");
	    
	    document.getElementsByClassName("list__item--previous")[0].classList.remove("hide");
	    document.getElementsByClassName("work__centvingtcinq__link")[0].classList.remove("hide");
	    
	    document.getElementsByClassName("section--work--link")[0].innerHTML = "Hey it’s a website, go check it out yourself -";
	    document.getElementsByClassName("section--thx")[0].getElementsByTagName("h1")[0].innerHTML = "Thx.";
	}
	function addMobile() {
	    //addImages("lipelip", "section--about", "Lipelip's image");
	    //addImages("lipelip-avatar", "section--connect", "Lipelip's avatar");
	    
	    Array.prototype.forEach.call(menuPrevious, function(el, i){
				menuPrevious[i].classList.remove("hide");
			});
			Array.prototype.forEach.call(menuNext, function(el, i){
				menuNext[i].classList.remove("hide");
			});
	    
	    pNext.classList.remove("hide");
	    revealMenu.classList.remove("hide");
	    
	    document.getElementsByClassName("list__item--previous")[0].classList.add("hide");
	    document.getElementsByClassName("work__centvingtcinq__link")[0].classList.add("hide");
	    
	    document.getElementsByClassName("section--work--link")[0].innerHTML = "Go check the mobile version -";
	    document.getElementsByClassName("section--thx")[0].getElementsByTagName("h1")[0].innerHTML = "Thanks";
	}
	
	
	var fire = 0;
	if (document.documentElement.clientWidth > 600) {
		document.body.classList.remove("mobile");
		removeMobile();
		fire = 1;
	}
	
  window.onresize = function(){
  	
		if (document.documentElement.offsetWidth > 600 & fire === 0) {
		  document.body.classList.remove("mobile");
		  // safari bug document.body.classList.remove("still");
			removeMobile();
			fire = 1;
		} else if(document.documentElement.offsetWidth < 600 & fire === 1) {
			document.body.classList.add("mobile");
			// safari bug document.body.classList.add("still");
			fire = 0;
			addMobile();
		}
  }
});

function refreshFacts(){
	
	myFacts = [
			"My dog's name is Wifi",
			"In 2000 I made a bet with my best men to spend the new year of 2015 on a boat", 
			"I wish we had the same in euro", 
			"I love beer, especially the darker ale. Chimay Blue is my favorite",  
			"I love snow, snowboarding is my thing",
			"I always hang a sock up by the fireplace on Christmas", 
			"As I have my own house now, I've made a pact with my wife to buy a real Christmas tree",
			"As I'm a teacher, I drink coffee",
			"I'm married and deeply in love",
			"That's how my thumbs looks like",
			"I only play FIFA on playsation",
			"I hate xBox's controller",
			"I'm no singer",
			"I can make a beautiful paper plane",
			"I wanna go to space",
			"What's going on with this icon? Please, stop using it",
			"I'm pretty decent with darts",
			"I have no idea what this icon means…",
			"A triangle",
			"I want to have as many friends that are world champions as I can, I have two"
		];		
	maxFacts = myFacts.length - 1;
	var randomFacts = Math.floor(Math.random() * maxFacts + 1),
	 		factImage = document.getElementsByClassName("facts__fact__img")[0],
	 		factContent = document.getElementsByClassName("facts__fact__text")[0],
	 		refreshBtn = document.getElementsByClassName("facts__new")[0];
	refreshBtn.classList.toggle("rotate");
	factContent.innerHTML = myFacts[randomFacts];
	factImage.className = "facts__fact__img";
	factImage.classList.add("facts__fact__img"+randomFacts);
	console.log(randomFacts-1);
	
}




