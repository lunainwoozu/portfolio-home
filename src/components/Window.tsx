import { useState, useEffect, useCallback } from 'react';
import Draggable from 'react-draggable';
import {useWindowManager} from "../hooks/useWindowManager";


const Window = () => {
  const { windows, isMobile, openWindow, closeWindow, bringToFront } = useWindowManager([1, 2]);

  return (
    {windows.map((win) => (
        <Draggable
          key={win.id}
          handle=".title"
          disabled={isMobile}
          bounds="parent"
          onMouseDown={() => bringToFront(win.id)}
        >
          <div
            className={`window w${win.id} ${!win.isOpen ? 'closed' : ''}`}
            style={{
              zIndex: win.zIndex,
              position: 'absolute',
              display: win.isOpen ? 'block' : 'none',
              border: '1px solid #000',
              background: '#fff',
              width: '300px'
            }}
          >
            <div className="title" style={{ padding: '10px', background: '#eee' }}>
              Window {win.id}
              <button onClick={() => closeWindow(win.id)}>X</button>
            </div>
            <div className="content" style={{ padding: '20px' }}>
              내용 {win.id}
            </div>
          </div>
        </Draggable>
      ))}
      
      <button onClick={() => openWindow(1)} style={{ position: 'fixed', bottom: 20 }}>
        1번 창 다시 열기
      </button>
    </div>
  
    <article id={window} className={window}>
      <section className="title">
        <h2>{title}</h2>
        <button className="closebtn">x</button>
      </section>
      <section className="content">{content}</section>
    </article>
  );
};

export default Window;