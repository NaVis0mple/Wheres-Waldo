import { useState, useEffect } from 'react'
function RankRoute () {
  const [list, setList] = useState([])
  useEffect(() => {
    const fetchRankList = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/rank/Get')
        const json = await response.json()
        setList(json)
      } catch (error) {

      }
    }
    fetchRankList()
  }, [])

  return (
    <>
      <a href='http://localhost:5173/'>back</a>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {list.sort((a, b) => a.useTime - b.useTime).map((object, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{object.name}</td>
              <td>{object.useTime}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  )
}
export default RankRoute
