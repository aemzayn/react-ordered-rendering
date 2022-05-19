import useSWR from "swr";
import { GET_POKEMON_DETAIL_API } from "../constants/paths";
import { fetcher } from "../libs/fetcher";

export const usePokemonDetail = (pokemonName) => {
  const { data, error } = useSWR(GET_POKEMON_DETAIL_API(pokemonName), fetcher);

  return {
    data: data?.data,
    isLoading: !data && !error,
    isError: Boolean(error),
  };
};
