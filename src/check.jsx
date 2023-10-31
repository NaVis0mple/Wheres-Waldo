import './check.css'
import { useEffect, useState } from 'react'
function Check ({ status }) {
  let warning
  if (status.target === null) {
    return
  }
  if (status.status === true) {
    warning = 'correct'
  } else if (status.status === false) {
    warning = ('wrong')
  }

  return (
    // use date to trigger
    <>
      <div key={status.date} className={warning}>{warning}</div>
    </>
  )
}

export default Check
