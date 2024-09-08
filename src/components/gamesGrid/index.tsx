import { ChangeEvent, FunctionComponent, useCallback, useEffect, useState } from "react";
import Image from "next/image";

import ScrollVertical from "../containers/scrollVertical";
import SearchInput from "@/components/inputs/search";
import GeneralService from "@/lib/general";
import { debounce } from "@/lib/utils";

import styles from "./index.module.scss";

interface IGameCard {
  game: Game;
}

const GameCard: FunctionComponent<IGameCard> = ({ game }) => {
  return (
    <div className={styles.card}>
      <Image className={styles.logo} src={game.image.small.src} alt={game.image.alt} width={180} height={38} priority />

      <div className={styles.title}>{game.gameText}</div>
    </div>
  );
};

interface IGamesGrid {
  selectedCategory: string;
  search: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const GamesGrid: FunctionComponent<IGamesGrid> = ({ selectedCategory, search, handleSearch }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [games, setGames] = useState<Game[]>([]);

  const fetchData = useCallback(
    debounce(async (search: string) => {
      setIsLoading(true);

      const { success, data } = await GeneralService.getAllGames({ search });

      if (!success) {
        throw new Error("Failed to get games");
      }

      setGames(data.items);
      setIsLoading(false);
    }, 500),
    []
  );

  useEffect(() => {
    fetchData(search);
  }, [search]);

  return (
    <section className={styles.wrapper}>
      <SearchInput value={search} onChange={handleSearch} />

      <ScrollVertical className={styles.scrollWrapper}>
        {isLoading ? <div>Loading...</div> : games.map((game: Game, i: number) => <GameCard key={i} game={game} />)}
      </ScrollVertical>
    </section>
  );
};

export default GamesGrid;
