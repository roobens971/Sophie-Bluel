import { fetchWorks } from "./api.js";

const initModal = async () => {
  console.log("initModal");

  const works = await fetchWorks();
  console.log({ works });

  // Affiche les works
  displayGallery(works);
  displayGalleryInModal(works);
};
initModal();


const displayGalleryInModal = () => {

    const dialog = document.querySelector("dialog");
    const showButton = document.querySelector("dialog, button");
    const closeButton = document.querySelector("dialog .fa-xmark");
    
    // Le bouton "Afficher la fenêtre" ouvre le dialogue
    showButton.addEventListener("click", () => {
      dialog.showModal();
    });
    
    // Le bouton "Fermer" ferme le dialogue
    closeButton.addEventListener("click", () => {
      dialog.close();
    });
}


const displayGallery = (works) => {
  works.forEach((work) => {
    //Create a element
    let figure = document.createElement("figure");
    let image = document.createElement("img");
    let icon = document.createElement("i");
    let gallery = document.querySelector(".GalleryInModal");

    icon.classList.add("fa-solid", "fa-trash-can");
    // icon.style.backgroundColor = "white";
    // icon.style.color = "black";

    let name = work.title;
    image.src = work.imageUrl;
    image.setAttribute("alt", work.title);

    figure.appendChild(icon);
    gallery.appendChild(figure);
    figure.appendChild(image);
  });
};
