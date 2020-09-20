import Head from 'next/head'
import styles from '../styles/Home.module.css'
import fetch from 'isomorphic-unfetch'
import { useTable } from 'react-table'
import { useMemo } from 'react'

const Home = ({ cards }) => {

  const withEmojis = cards.map(card => {
    const categories = {
      baseball: "⚾",
      basketball: "🏀",
      football: "🏈",
      hockey: "🏒",
      other_sports: "❓",
      gaming: "🎮",
      non_sport: "❓"
    }

    return {...card, emoji: categories[card.category]}
  })

  const colStyle = {
    textAlign: "center",
    marginLeft: "1rem",
    marginRight: "1rem",
    maxWidth: "300px",
  }

  const columns = useMemo(
    () => [
      {
        Header: () => <div style={{...colStyle, textAlign: "left"}}>Name</div>,
        accessor: "name",
        Cell: row => <div style={{...colStyle, textAlign: "left"}}>{row.value}</div>,
      },
      {
        Header: <div style={colStyle}>Release Date</div>,
        accessor: "release_date",
        Cell: row => <div style={colStyle}>{row.value}</div>
      },
      {
        Header: <div style={colStyle}>Category</div>,
        accessor: "emoji",
        Cell: row => <div style={colStyle}>{row.value}</div>
      },
    ],
    []
  )

  const data = useMemo(
    () => withEmojis,
    []
  )

  const tableInstance = useTable({ columns, data })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Tempest Cards
        </h1>

        <p className={styles.description}>
          Currently tracking {cards.length} sets
        </p>

        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    )
                    })}
                </tr>
              )
                  })}
          </tbody>
        </table>

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
