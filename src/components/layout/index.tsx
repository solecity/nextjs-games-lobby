import { FunctionComponent, ReactNode } from "react";
import Head from "next/head";

import styles from "./index.module.scss";

interface ILayout {
  hasError?: boolean;
  children: ReactNode;
}

const Layout: FunctionComponent<ILayout> = ({ hasError, children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="PlayNorth - Games Lobby" />
        <link rel="icon" href="/favicon.ico" />

        <title>PlayNorth - Games Lobby</title>
      </Head>

      <main className={styles.main}>{hasError ? <div>ERROR</div> : <section>{children}</section>}</main>
    </>
  );
};

export default Layout;
