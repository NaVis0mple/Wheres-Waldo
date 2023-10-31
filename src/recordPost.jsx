import './recordPost.css'
function Recordpost ({ timeRecord }) {
  return (
    <>
      <form action='http://localhost:3000/api/rank/Post' method='post'>
        <label htmlFor='name'>name</label>
        <input type='text' name='name' id='name' />
        <input type='hidden' name='time' value={timeRecord} />
        <input type='submit' value='rank it' />
      </form>
    </>
  )
}

export default Recordpost
