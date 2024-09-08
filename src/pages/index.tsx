import { ChangeEvent, FunctionComponent, useCallback, useState } from "react";
import { GetServerSideProps } from "next";

import DefaultLayout from "@/components/layout";
import NavBar from "@/components/navigation";
import GamesGrid from "@/components/gamesGrid";
import GeneralService from "@/lib/general";
import { ALL_GAMES_ID } from "@/lib/constants";

interface IHome {
  data: any;
  hasError: boolean;
}

const Home: FunctionComponent<IHome> = ({ data, hasError }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_GAMES_ID);
  const [search, setSearch] = useState<string>("");

  const handleSelection = useCallback((selected: string): void => {
    setSelectedCategory(selected);
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <DefaultLayout hasError={hasError}>
      <NavBar
        categories={data.menu.lobby.items}
        selectedCategory={selectedCategory}
        handleSelection={handleSelection}
      />

      <GamesGrid selectedCategory={selectedCategory} search={search} handleSearch={handleSearch} />
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { success, data } = await GeneralService.getAllCategories();

  if (!success) {
    return { props: { data: [], hasError: true } };
  }

  return { props: { data, hasError: false } };
};

export default Home;
