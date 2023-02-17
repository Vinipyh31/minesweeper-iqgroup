import React from 'react';
import { Link } from 'react-router-dom';
import '../..//styles/Menu.scss';
import Background from '../UI/background/Background';

const Menu = () => {
  return (
    <div className='menu'>
      <Background />
      <Link to="/game"><button>Играть</button></Link>
      <Link to="/leaderboard"><button>Список лидеров</button></Link>
      <Link to="/options"><button>Настройки</button></Link>
    </div>
  )
}

export default Menu