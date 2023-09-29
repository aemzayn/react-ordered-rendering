import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { convertToTitleCase } from "../libs/strings";
import Image from "next/image";
import { getRandomPokemon } from "../libs/pokemon";

const wait = (s, cb = () => {}) =>
  new Promise((resolve) =>
    setTimeout(() => {
      cb();
      resolve();
    }, s * 1000)
  );

export default function Home() {
  const [fetchOrder, setFetchOrder] = useState(1);
  const [waitTime, setWaitTime] = useState(2);

  const onStart = () => {
    setFetchOrder(1);
  };

  return (
    <Layout>
      <Header>Pokemon</Header>

      <div className="flex gap-1 px-3 py-2 items-center">
        <label htmlFor="waitTime">Wait time</label>
        <input
          type="number"
          value={waitTime}
          onChange={(e) => setWaitTime(e.target.valueAsNumber)}
          className="border border-1 rounded-sm px-1 py-0.5 w-16"
        />

        <button
          className="px-3 bg-blue-400 rounded-sm text-white hover:bg-blue-600 py-0.5"
          onChange={onStart}
        >
          Start
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 px-3 pt-1 pb-2">
        <Item
          fetchOrder={1}
          setFetchOrder={setFetchOrder}
          currentOrder={fetchOrder}
          waitTime={waitTime}
        />
        <Item
          fetchOrder={2}
          setFetchOrder={setFetchOrder}
          currentOrder={fetchOrder}
          waitTime={waitTime}
        />
        <Item
          fetchOrder={3}
          setFetchOrder={setFetchOrder}
          currentOrder={fetchOrder}
          waitTime={waitTime}
        />
      </div>
    </Layout>
  );
}

const Item = ({ fetchOrder, setFetchOrder, currentOrder, waitTime }) => {
  const [pokemon, setPokemon] = useState({ name: "", img: "", stats: [] });
  console.log(fetchOrder);

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await getRandomPokemon();
      setPokemon(data);
      await wait(waitTime, () => {
        setFetchOrder((prev) => prev + 1);
        console.log("finish", fetchOrder);
      });
    };
    if (fetchOrder === currentOrder) {
      fetchPokemon();
    }
  }, [fetchOrder, currentOrder]);

  return (
    <div className="bg-white border border-1 min-h-[120px]">
      {pokemon.name ? (
        <>
          <div className="text-sm px-1 text-center font-bold bg-gray-100">
            {convertToTitleCase(pokemon.name)}
          </div>
          <div className="py-2 grid grid-cols-3">
            {pokemon.img ? (
              <Image
                src={pokemon.img}
                alt={pokemon.name}
                width={100}
                height={100}
              />
            ) : (
              <div className="bg-gray-100" />
            )}
            <div className="col-span-2 flex flex-col gap-0">
              {pokemon.stats.map((stat) => (
                <div
                  key={stat.stat.name}
                  className="grid grid-cols-3 items-center pr-2"
                >
                  <span className="text-sm">{stat.stat.name}</span>
                  <div className="h-2 col-span-2 bg-green-200">
                    <div
                      className="h-full bg-green-500"
                      style={{
                        width: `${
                          stat.base_stat > 100 ? 100 : stat.base_stat
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-gray-300 pl-2">Loading...</div>
      )}
    </div>
  );
};
