import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../..//styles/Sapper.scss';
import clock from '../../images/clock.svg';
import flag from '../../images/flag.svg';
import mine from '../../images/mine.svg';
import restart from '../../images/restart.svg';
import { generateEmptyTable, generateOpenedTable, generateTable } from '../../utils/gameTable';
import Background from '../UI/background/Background';

const Sapper = () => {

  const tableWidth = useSelector((state) => state.optionsReducer.width)
  const tableHeight = useSelector((state) => state.optionsReducer.height)
  const tableNumOfMines = useSelector((state) => state.optionsReducer.numOfMines)
  const userName = useSelector((state) => state.optionsReducer.userName)

  const dispatch = useDispatch()

  const [table, setTable] = useState([])
  const [openedFields, setOpenedFields] = useState(generateEmptyTable(tableWidth, tableHeight));
  const [gameWin, setGameWin] = useState(false);
  const [gameLose, setGameLose] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [numOfFlags, setNumOfFlags] = useState(0);

  useEffect(() => {
    setTable(generateTable(tableHeight, tableWidth, tableNumOfMines));
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    if (gameLose) {
      clearInterval(intervalId);
    }
    if (gameWin) {
      clearInterval(intervalId);
      const tmpList = JSON.parse(localStorage.getItem('leaderboard'))
      if (tmpList) {
        localStorage.setItem('leaderboard', JSON.stringify([...tmpList, { name: userName || 'noName', time: seconds}]));
      } else {
        localStorage.setItem('leaderboard', JSON.stringify([{ name: userName || 'noName', time: seconds}]));
      }
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [gameLose, gameWin])



  const gameIsLost = () => {
    setGameLose(true);
    setOpenedFields(generateOpenedTable(tableWidth, tableHeight));
  }

  const restartGame = () => {
    setOpenedFields(generateEmptyTable(tableWidth, tableHeight))
    setTable(generateTable(tableHeight, tableWidth, tableNumOfMines));
    setGameLose(false);
    setGameWin(false);
    setSeconds(0);
    setNumOfFlags(0);
  }

  const checkWin = () => {
    let saveFields = 0;
    let minesFields = 0;
    for (let i = 0; i < tableHeight; i++) {
      for (let j = 0; j < tableWidth; j++) {
        if (openedFields[i][j] === 'O') saveFields++;
        if (table[i][j] === 'M') minesFields++;
      }
    }
    if ((tableHeight * tableWidth - minesFields) === saveFields) {
      setGameWin(true);
    }
  }

  const isOpenedField = (x, y) => {
    return openedFields[y][x] === table[y][x]
  }

  const openField = (x, y) => {
    const map = new Map();
    const fn = (x, y) => {
      if (map.has(`${y},${x}`)) {
        return;
      }
      map.set(`${y},${x}`, true);
      openedFields[y][x] = 'O';
      setOpenedFields(openedFields.map(row => row.slice()));
      if (table[y][x] === 'M') {
        gameIsLost()
        return;
      }
      if (table[y][x] === 0) {
        for (let xt = -1; xt <= 1; xt++) {
          for (let yt = -1; yt <= 1; yt++) {
            if (x + xt >= 0 && x + xt < tableWidth && y + yt >= 0 && y + yt < tableHeight) {
              fn(x + xt, y + yt);
            }
          }
        }
      }
    };
    fn(x, y);
  };


  const onRestartClick = () => {
    restartGame();
  }

  const onFieldRightClick = (x, y, event) => {
    event.preventDefault();
    if (openedFields[y][x] === 'O') return;
    const currentValue = openedFields[y][x];
    let newFieldValue;

    if (currentValue === 'C') {
      newFieldValue = 'F';
      setNumOfFlags(num => ++num)
    } else if (currentValue === 'F') {
      newFieldValue = '?';
      setNumOfFlags(num => --num)
    } else {
      newFieldValue = 'C';
    }

    openedFields[y][x] = newFieldValue;
    setOpenedFields(openedFields.map(row => row.slice()));
  };

  const onMouseDown = (x, y, event) => {
    if (event.button === 0) {
      openField(x, y);
    }
    if (event.button === 1) {
      onWheelClick(x, y, event);
    }
    checkWin();
  }

  const onWheelClick = (x, y, event) => {
    const flaggedCount = countFlaggedMinesAround(x, y);
    if (flaggedCount === table[y][x]) {
      for (let xt = -1; xt <= 1; xt++) {
        for (let yt = -1; yt <= 1; yt++) {
          const newX = x + xt;
          const newY = y + yt;
          if (newX >= 0 && newX < tableWidth && newY >= 0 && newY < tableHeight && openedFields[newY][newX] === 'C') {
            openField(newX, newY);
          }
        }
      }
    }
  };

  const countFlaggedMinesAround = (x, y) => {
    let count = 0;
    for (let xt = -1; xt <= 1; xt++) {
      for (let yt = -1; yt <= 1; yt++) {
        const newX = x + xt;
        const newY = y + yt;
        if (newX >= 0 && newX < tableWidth && newY >= 0 && newY < tableHeight && openedFields[newY][newX] === 'F') {
          count++;
        }
      }
    }
    return count;
  };

  const classForDigit = (num) => {
    const nums = {
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five',
      6: 'six',
      7: 'seven',
      8: 'eight',
    }
    return nums[num]
  }

  return (
    <div className='sapper'>
      <Background />
      <Link to="/menu" ><button className='btn-back'>{'< Назад'}</button></Link>
      {/* <span className='btn-restart' onClick={onRestartClick}>ЗАНОВО</span> */}
      <div className='game'>
        <div className='game__header'>
          <div className='mines'><img className='mine' src={mine} alt="mine" /><span className='mines__count'>{tableNumOfMines - numOfFlags}</span></div>
          <div className='timer'><img className='clock' src={clock} alt="clock" /><span className='seconds'>{seconds}</span></div>
          <img
            className={`restart ${(gameLose || gameWin) && 'click-me'}`}
            src={restart}
            alt="restart"
            onClick={onRestartClick}
          />
        </div>
        <div className='table'>
          {gameLose &&
            <div className='game-end'>
              <span className='game-end__text'>Ты проиграл x_X</span>
            </div>
          }
          {
            gameWin &&
            <div className='game-end'>
              <span className='game-end__text'>Победа вместо обеда</span>
            </div>
          }
          {openedFields.map((row, y) =>
            <div key={y} className='table__row'>
              {row.map((field, x) =>
                <div
                  key={x}
                  className={`table__row__field ${field === 'O' && 'opened'} ${(x + y) % 2 === 0 && 'dark'}`}
                  value={field}
                  onMouseDown={(event) => onMouseDown(x, y, event)}
                  onContextMenu={(event) => onFieldRightClick(x, y, event)}
                >
                  {field === 'O' && (table[y][x] === 'M' ? <img className='mine' src={mine} alt="mine" /> :
                    <span className={classForDigit(table[y][x])}>{table[y][x] !== 0 && table[y][x]}</span>)}
                  {field === 'F' && <img className='flag' src={flag} alt="flag" />}
                  {field === '?' ? '?' : ''}

                </div>)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sapper