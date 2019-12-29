import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './animation.css';

function Animation() {
  const [bubbles, setBubbles] = useState([]);
  const [bubbledrops, setBubbledrops] = useState([]);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://api.myjson.com/bins/b3bko',
      );
      setBubbles(result.data.bubbles);
      setBubbledrops(result.data.bubbledrops);
      hideElements(0);
    };
    fetchData();
    console.log('Mounted');
  }, []);

  function hideElements(count){
    setInterval(()=>{
      count+=1;
      console.log(count);
      if(count >= 50){
        setHidden(true);
      }
    }, 1000)
  }
  return (
    <div className="bubbles-container">
      {bubbledrops.map(item => (
        <div className={"bubble-drops "+(hidden ? 'hidden' : 'show')} key={item.id} >
          <div className = "obj-center"></div>
          <div className = "obj-animate"></div>
          <div className = "obj-move"></div>
          {item.bubbles.map(item => (
            <div className={'obj-'+item.id} key={item.id}></div>
          ))}
        </div>
      ))}
      {bubbles.map(item => (
        <div className={'bubbles-design bubbles-'+item.id} key={item.id} style={{width : item.width, height : item.height, left: item.left, top: item.top,
          background: item.backgroundColor, opacity: item.opacity, border: '1px solid '+item.borderColor}}>
        </div>
      ))}
    </div>
  );
}
export default Animation;
