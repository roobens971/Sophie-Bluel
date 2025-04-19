import { fetchWorks, deleteModalWork } from "./api.js";
import { initFormData } from "./FormData.js";

export const initModal = async (works) => {
  console.log("initModal");

  // Affiche les works
  modalWorks(works);
  // deleteWork()
  displayGalleryInModal(works);
};

const modalWorks = (works) => {
  const dialog = document.querySelector("dialog");
  const showModal = document.querySelector("dialog, button");
  const closeModalStep1 = document.querySelector("dialog .fa-xmark");
  const closeModalStep2 = document.getElementById("close_modal");
  const ajouterUnePhoto = document.getElementById("btn_ajouter_photo");
  const arrowLeft = document.querySelector(".fa-arrow-left");
  const backDropModal = document.getElementById("modal");

  // Le bouton "modifier" ouvre le dialogue
  showModal.addEventListener("click", () => {
    dialog.showModal();
  });

  // Le bouton "Fermer" ferme le dialogue
  closeModalStep1.addEventListener("click", () => {
    dialog.close();
  });

  // En cliquant sur le "fond du modal" la fenêtre se ferme
  document.getElementById("modal").addEventListener("click", function (e) {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      backDropModal.close();
    }
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

    initFormData(works);
  });
};

export const displayGalleryInModal = async (works) => {
  works.forEach((work) => {
    //Create a element
    let gallery = document.querySelector(".GalleryInModal");
    let figure = document.createElement("figure");
    let image = document.createElement("img");

    let icon = document.createElement("i");

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
        document
          .querySelector(`.gallery figure[data-id="${work.id}"]`)
          .remove();
      } catch (e) {
        console.log("error", e);
      }
    });
  });
};
