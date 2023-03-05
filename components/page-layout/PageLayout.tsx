import { ReactNode } from "react";
import styles from "./page.module.css";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = (props: PageLayoutProps) => {
  return <main className={styles.main}>{props.children}</main>;
};
