// Описан в документации
import SimpleLightbox from "simple-lightbox";
// Дополнительный импорт стилей
import "simple-lightbox/dist/simpleLightbox.min.css";

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryLightBoxRef = document.querySelector(".gallery");
const galleryList = document.createElement("ul");
galleryList.classList.add("gallery")

function createElementToGallery(galleryItems) {
    return galleryItems
    .map(({ preview, original, description }) => {
        return `<li><a class="gallery__item" href="${original}">
                    <img class="gallery__image" 
                    src="${preview}" 
                    alt="${description}" />
                </a></li>`;
    }).join('');
};

const addToGallery = createElementToGallery(galleryItems);
galleryList.insertAdjacentHTML("beforeend", addToGallery);
galleryLightBoxRef.append(galleryList)

const lightbox = new SimpleLightbox({elements: '.gallery a'});
lightbox.show();