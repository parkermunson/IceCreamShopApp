import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
const [flavors, setFlavors] = useState([])

useEffect (() => {
  const fetchFlavors = async () => {
    const {data} = await axios.get('http://localhost:3000/api/flavors/')
    setFlavors(data)
  }
  fetchFlavors()
}, [])


const deleteFlavors = async (deletedFlavor) => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/flavors/${deletedFlavor.id}`)
    setFlavors(flavors.filter((remainingFlavors) => {return remainingFlavors.id !== deletedFlavor.id}))
  } catch (error) {
    console.log(error)
  }

}

  return (
    <div>
      <h1>Our Flavors - {flavors.length}</h1>
      {
        flavors.map((flavor) => {
          return (
            <div className='flavors-list' key={flavor.id}>
              {flavor.name}
              <br/>
              <button className='icecream-button' onClick={() => {deleteFlavors(flavor)}}> Remove </button>
            </div>
          )

        })
        
      }

    </div>
  )
}

export default App
