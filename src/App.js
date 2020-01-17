import React, { useContext, useEffect } from 'react'
import { Store } from './Store'

export default function App () {
  const { state, dispatch } = useContext(Store)

  const fetchDataAction = async () => {
    const data = await fetch(
      'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes'
    )
    const dataJSON = await data.json()

    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    })
  }

  useEffect(() => {
    state.episodes.length === 0 && fetchDataAction()
  })

  return (
    <>
      {console.log(state)}
      <div>
        <h1 className='header'>Rick and Morty</h1>
        <p>Pick your favorite episodes</p>
      </div>
      <section className='episode-layout'>
        {state.episodes.map(episode => {
          return (
            <section key={episode.id} className='episode-box'>
              <img
                src={episode.image.medium}
                alt={`Rick and Morty ${episode.name}`}
              />
              <div>{episode.name}</div>
              <section>
                <div>
                  Season: {episode.season} Number: {episode.number}
                </div>
              </section>
            </section>
          )
        })}
      </section>
    </>
  )
}
