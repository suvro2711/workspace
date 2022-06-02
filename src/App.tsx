import  React, {useState} from 'react'
import {useGetPostsQuery} from './services/posts-slice-api'
import WorkBlockHolder from './componenets/workBlockHolder'
import TimeGraph from './componenets/TimeGraph'
export default function App() {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPostsQuery('')
  
  
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')
  return (
    <div className="App" style={styles.App}>
      <TimeGraph />
    </div>
  )
}

const styles = {
  App:{
    width:"100vw",
    height:"100vh",
    display: "flex",
    justifyContent: "center"
  }
}