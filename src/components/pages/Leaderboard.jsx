import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Background from '../UI/background/Background'
import '../..//styles/Leaderboard.scss';

const Leaderboard = () => {

  const [list, setList] = useState([])

  useEffect(() => {
    const tmpList = JSON.parse(localStorage.getItem('leaderboard'))
    if (tmpList) {
      setList(tmpList)
    }
  }, [])


  return (
    <div className='leaderboard'>
      <Link to="/menu" ><button className='btn-back'>{'< Назад'}</button></Link>
      <Background />
      {list.length ?
        <div className='list'>
          <div className='row'>
            <span className='player__name'>Имя</span><span>Время</span>
          </div>
          {[...list]
            .sort((a, b) => a.time - b.time)
            .filter((v, i) => i < 10)
            .map((player, i) =>
              <div className='row' key={i}>
                <span className='player__name'>{player.name}</span>
                <span className='player__time'>{player.time}</span>
              </div>
            )}
        </div>
        :
        <h1 className='empty-list-text'>Список пуст</h1>

      }
    </div>
  )
}

export default Leaderboard