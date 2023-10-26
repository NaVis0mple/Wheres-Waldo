import { useState, useRef } from 'react'
import './App.css'
import img from '../src/img.jpg'
import catman from '../src/catman.png'
import fishman from '../src/fishman.png'
import greenman from '../src/greenman.png'

const targetlist = []
const target1 = {
  name: 'fishman',
  top: 0.8403480451986298,
  left: 0.5103324348607368,
  right: 0.5579514824797843,
  bottom: 0.9386196306941218,
  imgsrc: fishman
}
const target2 = {
  name: 'greenman',
  top: 0.3389109807472735,
  left: 0.44833782569631625,
  right: 0.5076370170709793,
  bottom: 0.42710342926886885,
  imgsrc: greenman
}

const target3 = {
  name: 'catman',
  top: 0.34647033347769596,
  left: 0.025157232704402517,
  right: 0.06558849955076371,
  bottom: 0.4107248316862869,
  imgsrc: catman
}

targetlist.push(target1, target2, target3)

function App () {
  const imgContainerRef = useRef(null)
  const [targetListPos, setTargetListPos] = useState({ x: 0, y: 0 })
  function handleClick (e) {
    const imgContainer = imgContainerRef.current
    if (imgContainer) {
      const rect = imgContainer.getBoundingClientRect()
      const x = (e.pageX - rect.left) / rect.width
      const y = (e.pageY - rect.top) / rect.height
      setTargetListPos({ x, y })
      // check
      for (const target of targetlist) {
        if (target.left < x && x < target.right && target.top < y && y < target.bottom) {
          console.log(target.name + 'bingo')
        } else {
          console.log(target.name + 'miss')
        }
      }
    }
  }
  return (
    <>
      <div className='imgContainer' ref={imgContainerRef} onClick={handleClick}>
        <img src={img} alt='' />
        <ul style={{
          position: 'absolute',

          top: targetListPos.y * 100 + '%',
          left: targetListPos.x * 100 + '%',
          transform: `${(targetListPos.x + 0.5 > 1) ? 'translateX(-100%)' : ''} ${(targetListPos.y + 0.5 > 1) ? 'translateY(-100%)' : ''}`, // this is genius
          backgroundColor: 'white',
          zIndex: 999,
          transformOrigin: 'top left',
          margin: 0,
          padding: 0
        }}
        >
          {targetlist.map((target, index) => (
            <li style={{ minWidth: '100px' }} key={index}><img src={target.imgsrc} alt='' /></li>
          ))}
        </ul>
      </div>

    </>

  )
}

export default App
