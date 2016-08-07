"use strict"

// Callback success if time < 4000
// Otherwise, callback error
const MAX_SUCCESS_TIME = 4000

const timeConsumingOperation = (id) => {
  // Generate a random value between 1000 and 5000
  // (used in interval)
  const time = Math.round((Math.random() * 4000) + 1000)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (time < MAX_SUCCESS_TIME) resolve({id: id, time: time})
      else                         reject ({id: id, time: time})
    }, time)
  })
}

// Singe operation
timeConsumingOperation(1)
  .then((result) => console.log(`[SINGLE] Operation finished successfully in ${result.time}ms`))
  .catch((error) => console.log(`Operation ${error.id} failed: ${error.time}ms > ${MAX_SUCCESS_TIME}ms`))

const initialTime = new Date().getTime()

Promise.all([
  timeConsumingOperation(1),
  timeConsumingOperation(2),
  timeConsumingOperation(3),
  timeConsumingOperation(4),
  timeConsumingOperation(5)
])
.then ((results) => {
  const endTime = new Date().getTime()

  results.forEach((result) => {
    console.log(`[MULTIPLE] Operation ${result.id} finished successfully in ${result.time}ms`)
  })

  console.log(`[MULTIPLE] All 5 operations finished successfully in ${endTime - initialTime}ms`)
})
.catch((error) => console.log(`[MULTIPLE] Operation ${error.id} failed: ${error.time}ms > ${MAX_SUCCESS_TIME}ms`))
