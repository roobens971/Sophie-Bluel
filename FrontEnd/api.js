export async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    console.log("Réponse API brute :", response); // Vérifie la réponse brute

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des travaux");
    }

    return await response.json(); // Retourne les travaux en JSON
  } catch (error) {
    console.error("Impossible de charger les travaux :", error);
    return []; // Retourne un tableau vide en cas d'erreur pour éviter un plantage
  }
}

// login
export async function login(userLogin) {
  console.log(userLogin);
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "sophie.bluel@test.tld",
        password: "S0phie",
      }),
    });

    if (!response.ok) {
      throw new Error("Erreur dans l’identifiant ou le mot de passe");
    }
    const userToken = await response.json();
    console.log({ userToken });
    console.log("response", response);
    window.localStorage.setItem("token", userToken.token);
    window.location.href = "/FrontEnd";
  } catch (error) {
    console.error("Impossible de charger les travaux :", error);
  }
}

// fetch categories
export async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    console.log("Réponse API brute :", response); // Vérifie la réponse brute

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des categories");
    }

    return await response.json(); // Retourne les travaux en JSON
  } catch (error) {
    console.error("Impossible de charger les travaux :", error);
    return []; // Retourne un tableau vide en cas d'erreur pour éviter un plantage
  }
}

// add works

// delete work
