import SimpleLightbox from "simple-lightbox";
import "simple-lightbox/dist/simpleLightbox.min.css";

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryLightBoxRef = document.querySelector(".gallery");

function createElementToGallery(galleryItems) {
    return galleryItems
    .map(({ preview, original, description }) => {
        return `<a class="gallery__item" href="${original}">
                    <img class="gallery__image" 
                    src="${preview}" 
                    alt="${description}" />
                </a>`;
    }).join('');
};

const addToGallery = createElementToGallery(galleryItems);
galleryLightBoxRef.insertAdjacentHTML("beforeend", addToGallery);

const lightbox = new SimpleLightbox({elements: '.gallery a'});
