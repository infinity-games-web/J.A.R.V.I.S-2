import fetch from "node-fetch";

export async function searchInternet(query){
const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;
const res = await fetch(url);
const data = await res.json();
return data.Abstract || "Nada encontrado.";
}
