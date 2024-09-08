import { FunctionComponent, ReactNode } from "react";

import styles from "./index.module.scss";

interface IScrollVertical {
  className?: string;
  children: ReactNode;
}

const ScrollVertical: FunctionComponent<IScrollVertical> = ({ className, children }) => {
  return <div className={`${className} ${styles.wrapper}`}>{children}</div>;
};

export default ScrollVertical;
