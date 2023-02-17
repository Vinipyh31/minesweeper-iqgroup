import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../..//styles/Options.scss';
import { setHeight, setNumOfMines, setUserName, setWidth } from '../../store/optionsSlice';
import Background from '../UI/background/Background';

const Options = () => {

  const tableWidth = useSelector((state) => state.optionsReducer.width)
  const tableHeight = useSelector((state) => state.optionsReducer.height)
  const tableNumOfMines = useSelector((state) => state.optionsReducer.numOfMines)
  const userName = useSelector((state) => state.optionsReducer.userName)
  const dispatch = useDispatch()

  const onDifficultyClick = (e) => {
    if (e.target.value === 'easy') {
      dispatch(setWidth(8));
      dispatch(setHeight(8));
      dispatch(setNumOfMines(6));
    }
    if (e.target.value === 'normal') {
      dispatch(setWidth(16));
      dispatch(setHeight(16));
      dispatch(setNumOfMines(30));
    }
    if (e.target.value === 'hard') {
      dispatch(setWidth(32));
      dispatch(setHeight(16));
      dispatch(setNumOfMines(60));
    }
  }

  const onChangeName = (e) => {
    dispatch(setUserName(e.target.value))
  }


  return (
    <div className='options'>
      <Background/>
      <Link to="/menu" ><button className='btn-back'>{'< Назад'}</button></Link>
      <div className='container'>
        <h1>Имя:</h1>
        <input className='username-input' type="text" value={userName} onChange={onChangeName}/>
        <h1>Сложность:</h1>
        <div className='difficulty-container'>
          <button onClick={onDifficultyClick} value='easy'>Простая</button>
          <button onClick={onDifficultyClick} value='normal'>Средняя</button>
          <button onClick={onDifficultyClick} value='hard'>Сложная</button>
        </div>
        <div className='parameters'>
          <div className='parameters__row'><span className='parameter-name'>Высота поля: </span><span className='parameter-value'>{tableWidth}</span></div>
          <div className='parameters__row'><span className='parameter-name'>Ширина поля: </span><span className='parameter-value'>{tableHeight}</span></div>
          <div className='parameters__row'><span className='parameter-name'>Кол-во мин: </span><span className='parameter-value'>{tableNumOfMines}</span></div>
        </div>
      </div>
    </div>
  )
}

export default Options