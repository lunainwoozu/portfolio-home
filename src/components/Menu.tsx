import React from 'react';
import "../style.css";
import {useWindowStore} from "../store/useWindowStore";

const Menu = () => {
  const { openWindow } = useWindowStore();
  return (
    <ul className="icons">
      <li><button className="i1" onClick={() => openWindow(1)}><img src="../../public/resources/playlist.png" alt="playlist" /></button></li>
      <li><button className="i2" onClick={() => openWindow(2)}><img src="../../public/resources/profile.png" alt="profile" /></button></li>
      <li><button className="i3" onClick={() => openWindow(3)}><img src="../../public/resources/team.png" alt="team" /></button></li>
      <li><button className="i4" onClick={() => openWindow(4)}><img src="../../public/resources/business.png" alt="business" /></button></li>
      <li><button className="i5" onClick={() => openWindow(5)}><img src="../../public/resources/personal.png" alt="personal" /></button></li>
    </ul>
  );
};

export default Menu
