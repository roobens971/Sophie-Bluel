import { login } from "./api.js";

const init = async () => {
  console.log("init");

  const formulaireLogIn = document.querySelector("form");
  formulaireLogIn.addEventListener("submit", async function (event) {
    event.preventDefault();

    // const userLogin = {
    //   email: event.target.querySelector("[id=email]").value.trim(),
    //   password: event.target.querySelector("[name=password]").value.trim(),
    // };

    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;
    const errorMsg = document.getElementById("errorMessage");
    const correctEmail = "sophie.bluel@test.tld";
    const correctPassword = "S0phie";

    // Validation du Login et l'affichage erreurs login
    if (email === correctEmail && password === correctPassword) {
      errorMsg.style.display = "none"; // On cache le message d'erreur si tout est bon

      // On appelle le login uniquement si les identifiants sont bons
      const userLogin = { email, password };
      await login(userLogin);


    } else if (email !== correctEmail && password !== correctPassword) {
      // Cas où les identifiants sont incorrects
      errorMsg.textContent = "Erreur dans l’identifiant ou le mot de passe.";
      errorMsg.style.display = "block";
    } else if (email !== correctEmail) {
      errorMsg.textContent = "Identifiant incorrect.";
      errorMsg.style.display = "block";
    } else if (password !== correctPassword) {
      errorMsg.textContent = "Mot de passe incorrect.";
      errorMsg.style.display = "block";
    }

    // Récupère le login
    const connecter = await login(userLogin);
    console.log({ userLogin });
  });
};
init();