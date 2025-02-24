/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

// CREATE VARIABLES FOR PROJECTS SECTION
const africaMap = document.getElementById('africaImage');
const africaMapStatic = 'assets/svg/Africa Map.svg';
const africaMapGif = 'assets/gif/AfricaMap.gif';

const duluthMap = document.getElementById('duluthImage');
const duluthMapStatic = 'assets/svg/Duluth Land Analysis.svg';
const duluthMapGif = 'assets/gif/DuluthProject.gif';

const interstateMap = document.getElementById('interstatetopImage')
const interstateMapStatic = 'assets/svg/Interstate Topology Urban Morphology.svg';
const interstateMapGif = 'assets/gif/UrbanMorphology.gif';

const sfFilmsMap = document.getElementById('sfFilmsImage')
const sfFilmsMapStatic = 'assets/svg/SF Films Map.svg';
const sfFilmsMapGif = 'assets/gif/sfFilmsMap.gif';

// TYPESCRIPT ANIMATION
document.addEventListener('DOMContentLoaded', function(event) {
  const backgroundImageUrl = "assets/svg/background - web size.svg";

  function waitForBackgroundImage(imageUrl, callback) {
    const img = new Image();
    img.onload = function() {
      console.log("Background image loaded.");
      callback();
    };
    img.onerror = function() {
      console.error("Error loading background image.");
    };
    img.src = imageUrl; // Preload the background image
  }

  function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
      document.querySelector("h1").innerHTML = text.substring(0, i + 1) + '<span id="typing-caret" aria-hidden="true"></span>';
      setTimeout(function() {
        typeWriter(text, i + 1, fnCallback);
      }, 150); // Typing speed
    } else {
      // Stop blinking when done
      const span = document.querySelector("h1 span");
      if (span) span.classList.add("finished");
    }
  }

  function StartTextAnimation(i) {
    const dataText = ["Hello!"];
    if (i < dataText.length) {
      typeWriter(dataText[i], 0, function() {
        if (i + 1 < dataText.length) {
          StartTextAnimation(i + 1); // Proceed to the next text
        } else {
          // Stop blinking caret after the last text
          const span = document.querySelector("h1 span");
          if (span) span.classList.add("finished");
        }
      });
    }
  }

  // Wait for background image to load before starting animation
  waitForBackgroundImage(backgroundImageUrl, function() {
    setTimeout(function() {
      StartTextAnimation(0);

      // Add the slide-in animation
      const animatedElement = document.getElementById("animate");
      if (animatedElement) {
        setTimeout(() => {
          animatedElement.classList.add("slide-in");
        }, 1800); // Adjust timing as needed
      }
    }, 800); // Initial Delay
  });
});

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

});



//CREATE A FUNCTION THAT MAKES IMAGE TURN INTO GIF ON HOVER
//INPUTS: OBJECT ID, SVG VARIABLE, GIF VARIABLE
function gifOnHover(object, svg, gif){
    object.addEventListener('mouseenter', () => {
        object.src = gif;
    });

    // Revert to static image when hover ends
    object.addEventListener('mouseleave', () => {
        object.src = svg;
    });
}

gifOnHover(africaMap, africaMapStatic, africaMapGif);
gifOnHover(duluthMap, duluthMapStatic, duluthMapGif);
gifOnHover(interstateMap, interstateMapStatic, interstateMapGif);
gifOnHover(sfFilmsMap, sfFilmsMapStatic, sfFilmsMapGif);




