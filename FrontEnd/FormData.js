import { addFormData } from "./api.js";

const initFormData = async () => {
  console.log("initFormData");
 const btnAjouterPhoto = document.getElementById("profile_pic");

  btnAjouterPhoto.addEventListener("click", async function (event) {
    const formData = new FormData();
   
    formData.append("image", "Abajour Tahina");
    formData.append("img", "abajour-tahina.png");
    formData.append("category", "Objets");

    const form = {
      image: event.target.querySelector(".gallery figure[data-id='1']"),
    };

    // Récupère le formData
    const addData = await addFormData(formData);
    console.log({ formData });
  });
};

initFormData();

