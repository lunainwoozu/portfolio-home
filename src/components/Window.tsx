import React from "react";

const Window = ({ window, title, content }: any) => {
  return (
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