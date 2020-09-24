import Head from 'next/head'
import styles from '../styles/Home.module.css'
import fetch from 'isomorphic-unfetch'
import Table from '../components/table'

const Home = ({cards}) => {

  const withEmojis = cards.map(card => {

    const categories = {
      baseball: "⚾",
      basketball: "🏀",
      football: "🏈",
      hockey: "🏒",
      other_sports: "🃏",
      gaming: "🎮",
      non_sport: "🃏"
    }

    return {...card, date: new Date(card.release_date), emoji: `${categories[card.category]}  ${card.name}`}
  }).filter(card => card.date > Date.now()).sort((a, b) => a.date - b.date)

  return (
    <div className={styles.container}>
      <Head>
        <title>Tempest Cards Calendar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Tempest Cards <br /> Calendar
        </h1>

        <p className={styles.description}>
          Currently tracking <strong>{withEmojis.length}</strong> sets
        </p>

        <Table data={withEmojis} />

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  const HOSTNAME = process.env.HOSTNAME || "https://card-calendar-site.vercel.app/"
  const res = await fetch(`${HOSTNAME}api/cards/`)
  const cards = await res.json()
  return {
    props: {
      cards,
    }
  }
}

export default Home
