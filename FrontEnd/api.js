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
    window.location.href = "/Frontend";
  } catch (error) {
    console.error("Impossible de se connecter :", error);
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
export async function addFormData(formData) {
  console.log(formData);
  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des travaux");
    }

    const result = await response.json();
    console.log("Succès", result);
    return result;
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
    return []; // Retourne un tableau vide en cas d'erreur pour éviter un plantage
  }
}

// delete work
export async function deleteModalWork(id) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des travaux");
    }
  } catch (error) {
    console.error("Erreur lors de la supression du projet :", error);
    return []; // Retourne un tableau vide en cas d'erreur pour éviter un plantage
  }
}
