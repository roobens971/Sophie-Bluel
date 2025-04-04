import { fetchWorks, deleteModalWork } from "./api.js";

export const initModal = async (works) => {
  console.log("initModal");

  // Affiche les works
  modalWorks(works);
  // deleteWork()
  displayGallery(works);
};

const modalWorks = (works) => {
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
};

const displayGallery = async (works) => {
  works.forEach((work) => {
    //Create a element
    let figure = document.createElement("figure");
    let image = document.createElement("img");

    let icon = document.createElement("i");
    let gallery = document.querySelector(".GalleryInModal");

    let galleryHomePage = document.querySelector(".gallery")
    // console.log(galleryHomePage);
    

    icon.classList.add("fa-solid", "fa-trash-can");
 

    let name = work.title;
    image.src = work.imageUrl;
    image.setAttribute("alt", work.title);

    figure.appendChild(icon);
    gallery.appendChild(figure);
    figure.appendChild(image);

    icon.addEventListener("click", async function (event) {
      event.preventDefault();

      try {
        await deleteModalWork(work.id);
        event.target.closest("figure").remove();
        document.querySelector(`.gallery figure[data-id="${work.id}"]`).remove(); 
      } catch (e) {
        console.log("error", e);
      }
    });
  });
};
