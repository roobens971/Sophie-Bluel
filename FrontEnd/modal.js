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
  const showModal = document.querySelector("dialog, button");
  const closeModalStep1 = document.querySelector("dialog .fa-xmark");
  const closeModalStep2 = document.getElementById("close_modal")
  const ajouterUnePhoto = document.getElementById("btn_ajouter_photo");
  const arrowLeft = document.querySelector(".fa-arrow-left")


  // Le bouton "modifier" ouvre le dialogue
  showModal.addEventListener("click", () => {
    dialog.showModal();
  });

  // Le bouton "Fermer" ferme le dialogue
  closeModalStep1.addEventListener("click", () => {
    dialog.close();
  });

    closeModalStep2.addEventListener("click", () => {
    dialog.close();
    document.getElementById("step2").style.display = "none";
    document.getElementById("step1").style.display = "block";
  });

    // la flèche de gauche 
    arrowLeft.addEventListener("click", () => {
    document.getElementById("step2").style.display = "none";
    document.getElementById("step1").style.display = "block";
  });

  // Le bouton "ajouter une photo" ouvre la modal Ajout photo
    ajouterUnePhoto.addEventListener("click", () => {
    document.getElementById("step2").style.display = "block";
    document.getElementById("step1").style.display = "none";
  });
};


const displayGallery = async (works) => {
  works.forEach((work) => {
    //Create a element
    let figure = document.createElement("figure");
    let image = document.createElement("img");

    let icon = document.createElement("i");
    let gallery = document.querySelector(".GalleryInModal");

    let galleryHomePage = document.querySelector(".gallery");
    
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
