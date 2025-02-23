import { fetchWorks, fetchCategories } from "./api.js";

const init = async () => {
  console.log("init");

  // Récupère les works
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

  // <button data-id="1"></button>
  // Affiche des categories + addEventListener (data-id + .filter sur les works qui ont le même data-id)
  // displayGallery(worksFiltered);
};

init();

const displayGallery = (works) => {
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
    // btn.classList.add("oah");

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

      displayGallery(worksFiltered);
      displayGallery(worksFilteredAll);
    });
  });
};
