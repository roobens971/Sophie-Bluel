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
export async function fetchLogin() {
  try {
    const response = await fetch("http://localhost:5678/api/users/login");
    console.log("Réponse API brute :", response); // Vérifie la réponse brute

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération du login");
    }

    return await response.json(); // Retourne les travaux en JSON
  } catch (error) {
    console.error("Impossible de charger les travaux :", error);
    return []; // Retourne un tableau vide en cas d'erreur pour éviter un plantage
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
