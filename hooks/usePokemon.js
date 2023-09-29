import useSWR from "swr";
import { GET_POKEMON_API } from "../constants/paths";
import { fetcher } from "../libs/fetcher";

export default function usePokemon() {
  const { data, error } = useSWR(GET_POKEMON_API, fetcher, {});

  return {
    data: data?.data,
    error,
    isLoading: !data && !error,
  };
}
