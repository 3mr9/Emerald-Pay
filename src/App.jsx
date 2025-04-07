import "./App.css";
import { useState, useRef, useEffect } from "react";
import soundFile from "/PaySuccessSFX.mp3";
import "./minecraft_font.ttf"

const getRandomCardNumber = () =>
  "4" +
  Array(15)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10))
    .join("");
const getFunnyDate = () => {
  const year = 20 + Math.floor(Math.random() * 80);
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  return `${month}/${year}`;
};

export default function App() {
  const [name, setName] = useState("");
  const [card, setCard] = useState(null);
  const soundRef = useRef(new Audio(soundFile));
  const [showSetPop, setSetPop] = useState(false);

  const handleShowCard = () => {
    if (!name.trim()) return;
    localStorage.setItem('user-name',name);
    setCard({
      name,
      number: getRandomCardNumber(),
      expiry: getFunnyDate(),
    });
  };

  useEffect(() => {
    const savedName = localStorage.getItem("user-name");
    if (savedName) {
      setName(savedName);
    }
  }, []);

  const playSound = () => {
    soundRef.current.currentTime = 0;
    soundRef.current.play().catch((e) => {
      console.log("SFX Error Occered:", e);
    });
  };

  return (
    <div className="container">
      <h1 className="herotext">Welcome Back, {name}!</h1>
      <button className="show-btn" onClick={() => setSetPop(true)}>
        ⚙
      </button>
      <button className="show-btn" onClick={handleShowCard}>
        Show Card
      </button>

      {/*Card JSX*/}
      {card && (
        <div className="card" onClick={playSound}>
          {/*<div className="card-name" style={{fontFamily: "craft"}}>Emerald Pay</div>*/}
          <div className="epLogo"></div>
          <div className="chip"></div>
          <div className="network"></div>
          <br />
          <div className="card-type">{card.type}</div>
          <div className="card-number">
            {card.number.replace(/(.{4})/g, "$1 ")}
          </div>
          <div className="card-footer">
            <div className="card-user">{card.name.toUpperCase()}</div>
            <div className="card-expiry">EXP {card.expiry}</div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSetPop && (
        <div className="popup-backdrop" onClick={() => setSetPop(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Name</h2>
            <input
              className="popup-inputer"
              placeholder="give me your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="popup-name-reset"
              onClick={() => {
                localStorage.removeItem("user-name");
                setName("");
              }}
            >
              Name Reset
            </button>
            <button
              className="popup-save"
              onClick={() => {
                localStorage.setItem("user-name", name);
                setSetPop(false);
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
      <p style={{ color: "gray", opacity: "30%" }}>
        created by <a href="https://x.com/_3mr9_" target="_blank">@_3mr9_</a>.
        <a href="https://github.com/3mr9/Emerald-Pay" target="_blank">this project in on gitHub</a>.
      </p>
      <p style={{ color: "gray", opacity: "30%", textAlign: 'center' }}>
      NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG.<br />
      Minecraft is copyright Mojang Studios and is not affiliated with this site.
      </p>
    </div>
  );}