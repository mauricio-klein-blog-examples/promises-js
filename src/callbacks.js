"use strict"

// Callback success if time < 4000.
// Otherwise, callback error
const MAX_SUCCESS_TIME = 4000

const timeConsumingOperation = (id, success, error) => {
  // Generate a random value between 1000 and 5000
  // (used in interval)
  const time = Math.round((Math.random() * 4000) + 1000)

  setTimeout(() => {
    if (time < MAX_SUCCESS_TIME) success({id: id, time: time})
    else                         error  ({id: id, time: time})
  }, time)
}

// Execute a single time consuming operation
timeConsumingOperation(0,
  (result) => console.log(`[SINGLE] Operation finished successfully in ${result.time}ms`),
  (error)  => console.log(`[SINGLE] Operation finished unsuccessfully: ${error.time}ms > ${MAX_SUCCESS_TIME}ms`)
)

// Executing 5 time consuming operations
const initialTime = new Date().getTime()

timeConsumingOperation(1,
  (result) => {
    console.log(`[MULTIPLE] Operation ${result.id} finished in ${result.time}ms`)
    timeConsumingOperation(2,
      (result) => {
        console.log(`[MULTIPLE] Operation ${result.id} finished in ${result.time}ms`)
        timeConsumingOperation(3,
          (result) => {
            console.log(`[MULTIPLE] Operation ${result.id} finished in ${result.time}ms`)
            timeConsumingOperation(4,
              (result) => {
                console.log(`[MULTIPLE] Operation ${result.id} finished in ${result.time}ms`)
                timeConsumingOperation(5,
                  (result) => {
                    console.log(`[MULTIPLE] Operation ${result.id} finished in ${result.time}ms`)
                    console.log(`[MULTIPLE] All 5 operations finished successfully in ${new Date().getTime() - initialTime}ms`)
                  },
                  (error) => console.log(`[MULTIPLE] Operation ${error.id} failed: ${error.time}ms > ${MAX_SUCCESS_TIME}ms`)
                )
              },
              (error) => console.log(`[MULTIPLE] Operation ${error.id} failed: ${error.time}ms > ${MAX_SUCCESS_TIME}ms`)
            )
          },
          (error) => console.log(`[MULTIPLE] Operation ${error.id} failed: ${error.time}ms > ${MAX_SUCCESS_TIME}ms`)
        )
      },
      (error) => console.log(`[MULTIPLE] Operation ${error.id} failed: ${error.time}ms > ${MAX_SUCCESS_TIME}ms`)
    )
  },
  (error) => console.log(`[MULTIPLE] Operation ${error.id} failed: ${error.time}ms > ${MAX_SUCCESS_TIME}ms`)
)
