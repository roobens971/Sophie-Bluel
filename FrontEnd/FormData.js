import { addFormData } from "./api.js";
import { displayGalleryInModal } from "./modal.js";
import { displayGallery } from "./index.js";

const imageUploadedHtml = document.getElementById("imageUploaded");
const imageInput = document.getElementById("imageInput");
const btnAjouterPhoto = document.getElementById("uploadForm");

export const initFormData = async (works) => {
  imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imageUploadedHtml.src = e.target.result;
        imageUploadedHtml.display = "block";
        imageInput.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });

  btnAjouterPhoto.addEventListener("submit", async function (event) {
    event.preventDefault();

    const titleInput = document.getElementById("titleInput").value;
    const category = document.getElementById("category-select").value;

    const formData = new FormData();
    formData.append("image", imageInput.files[0]);
    formData.append("title", titleInput);
    formData.append("category", category);

    console.log({ formData });
    // Récupère le formData
    try {
      const newWork = await addFormData(formData);
      console.log({ works, newWork });

      // reset le formulaire
      uploadForm.reset();

      // re mettre le display none sur imageUploadedHtml
      imageUploadedHtml.src = "";
      imageUploadedHtml.display = "none";

      // Mettre à jour la gallery principal et la gallery de la modal
      const worksUpdated = [...works, newWork];
       console.log({ worksUpdated });

      let galleryPrincipale = document.querySelector(".gallery")
      let galleryModal = document.querySelector(".GalleryInModal");
      // comment supprimer ou mettre à vide pour pouvoir re afficher la gallery avec les nouvelles data
      galleryPrincipale.innerHTML = "";
      galleryModal.innerHTML = "";
      

      displayGalleryInModal(worksUpdated);
      displayGallery(worksUpdated);
    } catch (e) {
      console.error("une erreur est survenue", e);
    }
  });

// const btnValiderModal = document.getElementById("validation");
// const dialog = document.querySelector("dialog");

//   valider.addEventListener("click", () => {
//     dialog.close()
//   })
};
