import Link from "next/link";
import Layout from "../components/Layout";
import Header from "../components/Header";
import usePokemon from "../hooks/usePokemon";
import { convertToTitleCase } from "../libs/strings";

export default function Home() {
  const { data } = usePokemon();

  return (
    <Layout>
      <Header>Pokemon</Header>
      <div className="grid px-2 py-3 gap-2">
        {data?.results.map((item) => (
          <Link href={`/${item.name}`} passHref key={item.name}>
            <div className="col-12 md:col-6 lg:col-4 bg-white border-round-md py-4 px-3 shadow-1">
              {convertToTitleCase(item.name)}
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
