import React from "react";
import styles from "./Loader.module.css";

type LoaderProps = {
  text?: string;
};

export const Loader: React.FC<LoaderProps> = ({ text }) => {
  return <div className={styles.loader}>{text || "Loading..."}</div>;
};
