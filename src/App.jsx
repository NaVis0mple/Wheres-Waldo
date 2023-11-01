import { useState, useRef, useEffect } from 'react'
import './App.css'
import img from '../src/img.jpg'
import catman from '../src/catman.png'
import fishman from '../src/fishman.png'
import greenman from '../src/greenman.png'
import { styled } from 'styled-components'
import Check from './check'
import Time from './time'
import Recordpost from './recordPost'

function App () {
  const [isStarted, setIsStarted] = useState(false)
  const imgContainerRef = useRef(null)
  const [targetListPos, setTargetListPos] = useState({ x: 0, y: 0 })
  const [checkStatus, setCheckStatus] = useState({ target: null, status: false })
  const [targetImg, setTargetImg] = useState(['catman', 'fishman', 'greenman'])
  const [count, setCount] = useState(0)
  const [winStatus, setWinStatus] = useState(false)
  // // fetch targetlist http://localhost:3000/api/targetlist
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3000/api/targetlist')
  //       if (response.ok) {
  //         const data = await response.json()
  //         setTargetList(data)
  //       }
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   }
  //   fetchData()
  // }, [])

  useEffect(() => { // win check
    if (targetImg.length === 0) {
      setWinStatus(true)
    }
  }, [targetImg])

  function handleStartClick () {
    setIsStarted(true)
  }
  function handleClick (e) {
    if (!isStarted) {
      return
    }

    // event delegation
    const imgContainer = imgContainerRef.current
    if (e.target.id === 'big') {
      // click the img
      if (imgContainer) {
        const rect = imgContainer.getBoundingClientRect()
        const x = (e.pageX - rect.left) / rect.width
        const y = (e.pageY - rect.top) / rect.height
        setTargetListPos({ x, y })
      }
    } else if (e.target.id !== 'big') {
      // send check to backend
      const formData = new FormData()
      formData.append('x', targetListPos.x)
      formData.append('y', targetListPos.y)
      formData.append('checkTarget', e.target.id)
      fetch('http://localhost:3000/api/check', {
        method: 'POST',
        body: formData // no need to set header content-type
      })
        .then(response => {
          return response.json()
        })
        .then(result => {
          setCheckStatus({ target: result.checkTarget, status: result.checkResult, date: Date.now() })
          if (result.checkResult) {
            const target = targetImg.filter((value) => value !== result.checkTarget)
            setTargetImg(target)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  return (
    <>

      <div className=' imgContainer ' style={{ }} ref={imgContainerRef} onClick={(e) => handleClick(e)}>

        {isStarted
          ? null
          : <>
            <div className='overlay' />
            <button onClick={() => handleStartClick()}>start</button>
          </>}
        <img src={img} id='big' alt='' />
        <ul style={{
          top: targetListPos.y * 100 + '%',
          left: targetListPos.x * 100 + '%',
          transform: `${(targetListPos.x + 0.5 > 1) ? 'translateX(-100%)' : ''} ${(targetListPos.y + 0.5 > 1) ? 'translateY(-100%)' : ''}` // this is genius
        }}
        >
          {targetImg.map((target, index) => (
            <li
              key={target}
              style={{
                width: `${(imgContainerRef?.current) ? (imgContainerRef.current.getBoundingClientRect().width / 30) + 'px' : '100px'}` // adjust list to all solution
              }}
            >
              <img
                id={target}
                className='target'
                src={`../src/${target}.png`} alt=''
              />
            </li>
          ))}
        </ul>
      </div>
      <Check status={checkStatus} />
      <Time start={isStarted} setCount={setCount} winStatus={winStatus} count={count} />
      {winStatus ? <Recordpost timeRecord={count} /> : ''}
      <a href='http://localhost:5173/rank'>rank</a>
    </>

  )
}

export default App
