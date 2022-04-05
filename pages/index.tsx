import type { NextPage } from 'next'
import Link from 'next/link'
import Search from 'components/SearchBar';
import styles from './index.module.css'

const Home: NextPage = () => {
  return (
    <div>
    <div className={styles.home}>
      <div className={styles.home__body}>
        <Link href="/">
          <img
            src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
            alt="Google logo"
            className={styles.home__logo}
          />
        </Link>
      </div>
      <div className={styles.home__inputContainer}>
        <Search />
      </div>
    </div>
  </div>
  )
}

export default Home
