// utils/reports.js
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Esta função busca todos os reports de um endpoint específico.
export const getAllReports = async () => {
  try {
    // Fazendo a chamada para o endpoint localhost:3004/reports.
    const response = await axios.get(`${apiUrl}/reports`);

    // Retornando os reports obtidos na resreporta.
    return response.data;
  } catch (error) {
    // Se houver um erro na requisição, trataremos aqui.
    console.error("Erro ao buscar os reports:", error);
    // Retornando um array vazio em caso de erro para evitar quebras na aplicação.
    return [];
  }
};
