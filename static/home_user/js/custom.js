
 /* jQuery Pre loader
  -----------------------------------------------*/
$(window).load(function(){
    $('.preloader').fadeOut(1000); // set duration in brackets    
});


$(document).ready(function() {

  /* Home Slideshow Vegas
  -----------------------------------------------*/
  $(function() {
    $('body').vegas({
        slides: [
            { src: '/static/home_user/img/1.jpg' },
            { src: '/static/home_user/img/2.jpg' },
            { src: '/static/home_user/img/3.jpg' },
            { src: '/static/home_user/img/4.jpg' },
            { src: '/static/home_user/img/5.jpg' },
            { src: '/static/home_user/img/6.jpg' },
            { src: '/static/home_user/img/7.jpg' },
        ],
        timer: false,
        transition: [ 'zoomOut',]
    });
  });



  /* wow
  -------------------------------*/
  new WOW({ mobile: false }).init();

  });


var coll = document.getElementsByClassName("collapsible");
var i;

		for (i = 0; i < coll.length; i++) {
			coll[i].addEventListener("click", function () {
				this.classList.toggle("active");
				var content = this.nextElementSibling;
				if (content.style.maxHeight) {
					content.style.maxHeight = null;
				} else {
					content.style.maxHeight = content.scrollHeight + "px";
				}
			});
		}


var coll = document.getElementsByClassName("collapsible1");
var j;

for (j = 0; j < coll.length; j++) {
    coll[j].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}