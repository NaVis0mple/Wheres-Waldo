import { useState, useEffect, useRef } from 'react'

function TimeCounter ({ start, winStatus, count, setCount }) {
  const requestIdRef = useRef(null) // use to save id and use at clearfunction
  useEffect(() => {
    if (!start) {
      return
    }
    if (winStatus) {
      // Don't update the count if winStatus is true
      return
    }

    const startTime = performance.now()

    const animate = () => {
      const currentTime = performance.now()
      const elapsed = Math.floor((currentTime - startTime))
      setCount((elapsed / 1000).toFixed(3))

      if (!winStatus) { // recursive call the animate function
        requestIdRef.current = requestAnimationFrame(animate) // telling the browser to schedule the animate function to run before the next repaint. The browser will aim to execute this function just before it updates the display.
      }
    }

    requestIdRef.current = requestAnimationFrame(animate) // the
    return () => {
      cancelAnimationFrame(requestIdRef.current)
    }
  }, [start, winStatus, setCount])

  return <div>{count}</div>
}

export default TimeCounter

// When you call requestAnimationFrame(animate), you are telling the browser to schedule the animate function to run before the next repaint. The browser will aim to execute this function just before it updates the display.
// This scheduling is crucial for smooth animations and updates because it synchronizes your code with the browser's rendering cycle. It allows you to make changes to the interface, update animations, or perform other visual tasks precisely when the browser is about to update what's displayed on the screen.
// The animate function captures the current time, calculates any necessary changes, and updates the interface (in this case, the timer). Then, it schedules the next call to animate by calling requestAnimationFrame(animate) again.
