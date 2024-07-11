import { Loading } from "./Loading";
import { Logo } from "../icons/Logo";
import styles from "./loading.module.css";

export function HomepageLoading() {
  return (
    <>
      <section className={styles.homepageLoadingContainer}>
        <Logo />
        <Loading />
        <p className={styles.subtext}>
          Server is hosted on free tier, please be patient!
        </p>
      </section>
    </>
  );
}
