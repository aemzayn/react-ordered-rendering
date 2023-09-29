import axios from "axios";

export const getRandomId = () => {
  return Math.round(Math.random() * 100);
};

export const getRandomPokemon = async () => {
  try {
    const id = getRandomId();
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = response.data;
    return {
      name: data.name,
      img: data.sprites.front_default,
      stats: data.stats,
    };
  } catch (error) {
    return null;
  }
};
