import React from "react";

function Hero() {
  return (
    <div className={"flex min-h-[500px]"}>
      <div
        className={
          "w-1/2 bg-primary bg-[url('/images/wireframe-bw.webp')] bg-cover bg-center"
        }
      >
        <div className={"w-full h-full bg-primary opacity-20"}></div>
      </div>
      <div className={"w-1/2 bg-primary/10 flex items-center justify-center"}>
        <div className={"text-center font-bold text-3xl"}>
          <h1>
            <span className={"italic"}>Design</span> with Empathy,
          </h1>
          <h1>
            Build with <span className={"italic"}>Intelligence</span>.
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Hero;
