import { fetchWorks, fetchCategories } from "./api.js";
import { initModal } from "./modal.js";
// Appeler cette fonction au bon endroit
const logout = () => {
  // addEventListener
  const logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    // faire la redirection soit homepage soit login
    window.location.href = "login.html";
    //logoutBtn.style.display ="none";
    document.querySelector(".edition").style.display = "none";
  });
};

const verifIsUserConnected = () => {
  // TODO vérifier et afficher/cacher les éléments
  const token = localStorage.getItem("token");
  console.log("token", token);

  if (token) {
    // On affiche le conteneur mode édition
    document.querySelector(".edition").style.display = "block";
    // On affiche les boutons modifier
    document.querySelector(".stylo_modifier").style.display = "block";
    // on display none le bouton login et  // soit ça vaut string soit ça vaut undefined | nullon display block le bouton logout
    document.getElementById("logout").style.display = "block";
    document.getElementById("login").style.display = "none";

    // TODO : on display none les boutons de filtres
    document.getElementById("filters").style.visibility = "hidden";
  }
};

const init = async () => {
  console.log("init");
  verifIsUserConnected();
  logout();

  const works = await fetchWorks();
  console.log({ works });

  // Affiche les works
  displayGallery(works);

  // Récupère les catégories
  const categories = await fetchCategories();
  console.log({ categories });

  // Affiche les categories
  displayButton(categories);

  filteredAllGallery(works);

  // 1ère étape: être capable d'afficher la modal au click sur le bouton modifier
  // 2ème étape être cacable de cacher la modal  au click sur la croix.
  // 3ème étape : la step 1 avec la gallery

  // BONUS: supprimer un element de la gallery au click sur la petite poubelle
  // soit utilisé displayGallery en rajoutant un paramètre isEdit soit créer une nouvelle fonction displayGalleryInModal(works)

  // dans index.html tu auras une <div id="modal"> // tu peux utiliser la balise dialog
  //  <section id="step1">
  //.     ici on aura la gallery + le bouton continuer
  //   </section>

  //  <section id="step2"> // display none par défaut
  //.     ici il y aura le formulaire + bouton de création
  //   </section>
  //
  //  </div>

  // Créer un fichier modal.js dans lequel il y aura la méthode initModal()
  // displayGalleryInModal();

  initModal(works);
};

init();

export const displayGallery = (works) => {
  works.forEach((work) => {
    //Create a element
    let figure = document.createElement("figure");

    let image = document.createElement("img");
    let figCaption = document.createElement("figcaption");

    let gallery = document.querySelector(".gallery");

    let name = work.title;
    figCaption.innerText = name;

    image.src = work.imageUrl;

    image.setAttribute("alt", work.title);
    figure.setAttribute("data-id", work.id);

    // Ajouter l'attribut data-id avec en valeur work.id

    gallery.appendChild(figure);
    figure.appendChild(image);
    figure.appendChild(figCaption);
  });
};

const displayButton = (categories) => {
  let sectionPortFolio = document.getElementById("#portfolio");
  console.log({ categories });

  let filters = document.getElementById("filters");

  categories.forEach((category, index) => {
    // Créer un bouton
    let btn = document.createElement("button");
    btn.innerText = category.name;
    btn.setAttribute("data-id", category.id);
    btn.classList.add("Btns");

    filters.appendChild(btn);
  });
};

// TODO renommer cette jolie fonction
const filteredAllGallery = (works) => {
  let btnTest = document.querySelectorAll(".Btns");

  btnTest.forEach((btn) => {
    btn.addEventListener("click", async function (event) {
      const id = event.target.dataset.id;
      console.log({ id });

      // TODO gérer le cas du "Tous"
      const worksFilteredAll = works.filter((work) => {
        return id === "all" || work.categoryId === id;
        //return (id) === "all";
      });
      console.log({ worksFilteredAll });

      // Objets - Appartements - Hotel & restaurants
      const worksFiltered = works.filter((work) => {
        return work.categoryId === Number(id);
      });
      console.log({ worksFiltered });

      // TODO le déplacer dans displayGallery
      let gallery = document.querySelector(".gallery");
      gallery.innerHTML = "";

      // TODO il ne doit y en avoir qu'un
      displayGallery(worksFiltered);
      displayGallery(worksFilteredAll);
    });
  });
};
