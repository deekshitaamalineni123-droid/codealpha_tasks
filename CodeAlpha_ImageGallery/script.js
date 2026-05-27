/* Category Filter */

function filterGallery(category){

  const photos = document.querySelectorAll(".photo");

  photos.forEach(photo=>{

    if(category === "all"){

      photo.style.display = "block";

    }

    else if(photo.classList.contains(category)){

      photo.style.display = "block";

    }

    else{

      photo.style.display = "none";

    }

  });

}

/* Lightbox */

const images = document.querySelectorAll("img");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightbox-image");

const closeBtn = document.querySelector(".close");

let currentIndex = 0;

/* Open Image */

images.forEach((img,index)=>{

  img.addEventListener("click",()=>{

    lightbox.style.display = "flex";

    lightboxImage.src = img.src;

    currentIndex = index;

  });

});

/* Close */

closeBtn.addEventListener("click",()=>{

  lightbox.style.display = "none";

});

/* Close Background */

lightbox.addEventListener("click",(e)=>{

  if(e.target === lightbox){

    lightbox.style.display = "none";

  }

});

/* Next Image */

document.querySelector(".next").addEventListener("click",()=>{

  currentIndex++;

  if(currentIndex >= images.length){

    currentIndex = 0;

  }

  lightboxImage.src = images[currentIndex].src;

});

/* Previous Image */

document.querySelector(".prev").addEventListener("click",()=>{

  currentIndex--;

  if(currentIndex < 0){

    currentIndex = images.length - 1;

  }

  lightboxImage.src = images[currentIndex].src;

});

/* Image Editing Filters */

function applyFilter(value){

  lightboxImage.style.filter = value;

}