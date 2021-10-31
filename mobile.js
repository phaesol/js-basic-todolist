const modal = document.querySelector('.modal');



function handleWindowColor() {
    intViewportWidth = window.innerWidth;
    if (intViewportWidth < 600) {
        modal.style.display = 'block';
    } else{
        modal.style.display = 'none';
    }
  }


function init() {
    handleWindowColor();
    window.addEventListener("resize", handleWindowColor);
}

init();

