import { useTable } from 'react-table'
import { useMemo } from 'react'

const Table = (props) => {
  const colStyle = {
    textAlign: "center",
    marginLeft: "1rem",
    marginRight: "1rem",
    maxWidth: "350px",
    whiteSpace: "pre-wrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }

  const columns = useMemo(
    () => [
      {
        Header: () => <div style={colStyle}>Set Name</div>,
        accessor: "emoji",
        Cell: row => <div style={{...colStyle, textAlign: "left"}}>{row.value}</div>,
      },
      {
        Header: <div style={colStyle}>Release Date</div>,
        accessor: "release_date",
        Cell: row => <div style={colStyle}>{row.value}</div>
      },
      // {
      //   Header: <div style={colStyle}>Category</div>,
      //   accessor: "emoji",
      //   Cell: row => <div style={colStyle}>{row.value}</div>
      // },
    ],
    []
  )

  const data = useMemo(
    () => props.data,
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
  )

}

export default Table

