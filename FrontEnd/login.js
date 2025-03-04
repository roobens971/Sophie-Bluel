import { login } from "./api.js";
//ajoutListenerSeConnecter();

const init = async () => {
  console.log("init");

  const formulaireLogIn = document.querySelector("form");
  formulaireLogIn.addEventListener("submit", async function (event) {
    event.preventDefault();

    const userLogin = {
      email: event.target.querySelector("[id=email]").value.trim(),
      password: event.target.querySelector("[name=password]").value.trim(),
    };

  // Récupère le login
  const connecter = await login(userLogin);
  console.log({ userLogin });
});
}
init();
