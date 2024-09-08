import { ChangeEventHandler, FunctionComponent, useState } from "react";

import styles from "./index.module.scss";

interface ISearchInput {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchInput: FunctionComponent<ISearchInput> = ({ ...props }) => {
  return (
    <div className={styles.wrapper}>
      <input id="search" type="search" placeholder="Search..." {...props} />
    </div>
  );
};

export default SearchInput;
