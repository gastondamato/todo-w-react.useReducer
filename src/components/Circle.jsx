import "./Circle.css";

export default function Circle({ deg }) {
  const num = Math.floor(((360 / 100) * deg) / 2);
  document.documentElement.style.setProperty("--percentage", `${num}deg`);
  return (
    <div className="circle-wrap">
      <div className="circle">
        <div className="mask full">
          <div className="fill"></div>
        </div>

        <div className="mask half">
          <div className="fill"></div>
        </div>

        <div className="inside-circle">{deg}%</div>
      </div>
    </div>
  );
}
