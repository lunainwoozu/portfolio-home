import { useState, useEffect, useCallback } from 'react';
import Draggable from 'react-draggable';
import {useWindowStore} from "../store/windowManagerStore";


const Window = () => {
  const { windows, isMobile, closeWindow, bringToFront } = useWindowStore();

  return (
    <>
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
            <div className="title">
              {win.title}
              <button onClick={() => closeWindow(win.id)}>X</button>
            </div>
            <div className="content">
              내용 {win.id}
            </div>
          </div>
        </Draggable>
      ))}
    </>
  );
};

export default Window;