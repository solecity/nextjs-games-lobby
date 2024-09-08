import { FunctionComponent, useState } from "react";

import BurgerMenuIcon from "../icons/burger-menu";

import styles from "./index.module.scss";

interface IMenuLink {
  label: string;
  isSelected: boolean;
  action: () => void;
}

const MenuLink: FunctionComponent<IMenuLink> = ({ label, isSelected, action }) => {
  const selectedClass: string = isSelected ? "selected" : "";

  return (
    <button className={`${styles.btn} ${styles[selectedClass]}`} type="button" onClick={action}>
      {label}
    </button>
  );
};

interface INavBar {
  categories: Category[];
  selectedCategory: string;
  handleSelection: (selected: string) => void;
}

const NavBar: FunctionComponent<INavBar> = ({ categories, selectedCategory, handleSelection }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMenu = (selected: string) => {
    setIsOpen(false);
    handleSelection(selected);
  };

  return (
    <div className={`${styles.wrapper} ${styles[isOpen ? "open" : "closed"]}`}>
      <div className={styles.menu}>
        <div onClick={() => setIsOpen((prev) => !prev)}>
          <BurgerMenuIcon />
        </div>

        <h1>Lobby</h1>
      </div>

      <div className={styles.overlay} onClick={() => setIsOpen(false)} />

      <nav>
        <h3>Categories</h3>

        <section>
          {categories.map((category: Category) => (
            <MenuLink
              key={category.id}
              label={category.name}
              isSelected={selectedCategory === category.id}
              action={() => handleMenu(category.id)}
            />
          ))}
        </section>
      </nav>
    </div>
  );
};

export default NavBar;
