import { useRouter } from "next/router";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { usePokemonDetail } from "../hooks/usePokemonDetail";
import { convertToTitleCase } from "../libs/strings";

export default function PokemonDetailsPage() {
  const router = useRouter();
  const { id: pokemonName } = router.query;
  const {} = usePokemonDetail(pokemonName);

  return (
    <Layout>
      <Header>{convertToTitleCase(pokemonName)}</Header>
    </Layout>
  );
}
