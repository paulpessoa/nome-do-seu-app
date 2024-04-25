// utils/posts.js
import axios from "axios";

// Esta função busca todos os posts de um endpoint específico.
export const getAllPosts = async () => {
  try {
    // Fazendo a chamada para o endpoint localhost:3004/posts.
    const response = await axios.get("http://localhost:3004/posts");

    // Retornando os posts obtidos na resposta.
    return response.data;
  } catch (error) {
    // Se houver um erro na requisição, trataremos aqui.
    console.error("Erro ao buscar os posts:", error);
    // Retornando um array vazio em caso de erro para evitar quebras na aplicação.
    return [];
  }
};
