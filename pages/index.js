import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { convertToTitleCase } from "../libs/strings";
import Image from "next/image";
import { getRandomPokemon } from "../libs/pokemon";
import { PokeContextProvider, usePokeContext } from "../context/poke-context";

const wait = (s, cb = () => {}) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      cb();
      resolve();
    }, s * 1000)
  );
};

export default function Home() {
  const [amount, setAmount] = useState(3);
  return (
    <PokeContextProvider>
      <Layout>
        <Header>Pokemon</Header>

        <Setting amount={amount} setAmount={setAmount} />

        <div className="grid grid-cols-3 gap-2 px-3 pt-1 pb-2">
          {Array.from({ length: amount }).map((_, i) => (
            <Item key={i} fetchOrder={i + 1} />
          ))}
        </div>
      </Layout>
    </PokeContextProvider>
  );
}

const Setting = ({ amount, setAmount }) => {
  const { waitTime, setWaitTime, setCurrentOrder, setRestart } =
    usePokeContext();

  const onStart = () => {
    setCurrentOrder(1);
  };

  const onReset = () => {
    setRestart(true);
  };

  return (
    <div className="flex items-center justify-between px-3 py-2">
      <div className="flex gap-1 items-center">
        <label htmlFor="waitTime">Wait time (s)</label>
        <input
          type="number"
          id="waitTime"
          value={waitTime}
          onChange={(e) => setWaitTime(e.target.valueAsNumber)}
          className="border border-1 rounded-sm px-1 py-0.5 w-16"
        />

        <button
          className="px-3 bg-blue-400 rounded-sm text-white hover:bg-blue-600 py-0.5"
          onClick={onStart}
          id="start"
        >
          Run
        </button>
        <button
          className="px-3 bg-blue-400 rounded-sm text-white hover:bg-blue-600 py-0.5"
          onClick={onReset}
          id="reset"
        >
          Reset
        </button>
      </div>

      <div>
        <label htmlFor="amount">Amount</label>
        <input
          name="amount"
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.valueAsNumber)}
          className="border border-1 rounded-sm px-1 py-0.5 w-16 ml-1"
        />
      </div>
    </div>
  );
};

const defaultPokemon = {
  name: "",
  img: "",
  stats: [],
};

const Item = ({ fetchOrder }) => {
  const [pokemon, setPokemon] = useState(defaultPokemon);
  const [doFetch, setDoFetch] = useState(true);
  const { currentOrder, waitTime, restart, setCurrentOrder } = usePokeContext();

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await getRandomPokemon();
      setPokemon(data);
      await wait(waitTime, () => {
        setCurrentOrder((prev) => prev + 1);
      });
    };

    if (fetchOrder === currentOrder && doFetch) {
      fetchPokemon();
    }
  }, [fetchOrder, currentOrder]);

  useEffect(() => {
    const resetBtn = document.getElementById("reset");

    const reset = () => {
      setPokemon(defaultPokemon);
      setCurrentOrder(-1);
      setDoFetch(false);
    };

    if (resetBtn) {
      resetBtn.addEventListener("click", reset);

      return () => {
        resetBtn.removeEventListener("click", reset);
      };
    }
  }, [restart]);

  useEffect(() => {
    const startBtn = document.getElementById("start");

    const start = () => {
      setDoFetch(true);
    };

    if (startBtn) {
      startBtn.addEventListener("click", start);

      return () => {
        startBtn.removeEventListener("click", start);
      };
    }
  }, [restart]);

  return (
    <div className="bg-white border border-1 min-h-[200px]">
      {pokemon?.name ? (
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
        <div className="text-gray-300 pl-2">{doFetch ? "Loading..." : ""}</div>
      )}
    </div>
  );
};
