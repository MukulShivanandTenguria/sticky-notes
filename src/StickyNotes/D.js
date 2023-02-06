import React, { createContext } from 'react'

const Firstname=createContext()
const D = () => {
  return (
    <div>
      <Firstname.Provider value="Mukul">

      </Firstname.Provider>
    </div>
  )
}

export default D
export {Firstname}