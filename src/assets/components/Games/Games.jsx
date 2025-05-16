import { useState } from "react";
import "./PokemonGame.css";

const POKEBALLS = {
  feu: "/src/assets/img/pokeball-transparent-png-2.png",
  eau: "/src/assets/img/pokeball-transparent-png-2.png",
  plante: "/src/assets/img/pokeball-transparent-png-2.png",
};

const POKEMONS = {
  feu: "/src/assets/img/salamèche.png",
  eau: "/src/assets/img/carapuce.png",
  plante: "/src/assets/img/001.webp",
};

const POKEMON_NAMES = {
  feu: "Salamèche",
  eau: "Carapuce",
  plante: "Bulbizarre",
};

const CHOIX = ["feu", "eau", "plante"];

function calculerRésultat(joueur, ordi) {
  if (joueur === ordi) return "ÉGALITÉ";

  if (
    (joueur === "feu" && ordi === "plante") ||
    (joueur === "plante" && ordi === "eau") ||
    (joueur === "eau" && ordi === "feu")
  ) {
    return "GAGNÉ";
  }
  return "PERDU";
}

export default function PokemonGame() {
  const [score, setScore] = useState(0);
  const [étapeJeu, setÉtapeJeu] = useState("selection");
  const [choixJoueur, setChoixJoueur] = useState(null);
  const [choixOrdi, setChoixOrdi] = useState(null);
  const [résultat, setRésultat] = useState(null);

  const gérerChoix = (type) => {
    setChoixJoueur(type);
    setÉtapeJeu("duel");

    const choixAléatoire = CHOIX[Math.floor(Math.random() * CHOIX.length)];
    setChoixOrdi(choixAléatoire);

    const res = calculerRésultat(type, choixAléatoire);
    setRésultat(res);

    if (res === "GAGNÉ") setScore((s) => s + 1);
    else if (res === "PERDU") setScore((s) => (s > 0 ? s - 1 : 0));

    setTimeout(() => {
      setÉtapeJeu("résultat");
    }, 1500);
  };

  const rejouer = () => {
    setÉtapeJeu("selection");
    setChoixJoueur(null);
    setChoixOrdi(null);
    setRésultat(null);
  };

  return (
    <div className="pokemon-game-container">
  <h1>ELEMENTS FIGHT</h1>
  <div className="score">Score : {score}</div>

  {étapeJeu === "selection" && (
    <div>
      <h2>Choisis ta Pokéball</h2>
      <div className="choices">
        {CHOIX.map((type) => (
          <div key={type} onClick={() => gérerChoix(type)}>
            <img
              className="pokeball"
              src={POKEBALLS[type]}
              alt={`Pokéball ${type}`}
            />
            <div>{POKEMON_NAMES[type]}</div>
          </div>
        ))}
      </div>
    </div>
  )}

  {(étapeJeu === "duel" || étapeJeu === "résultat") && (
    <div className="duel">
      <div>
        <h3>Toi</h3>
        <img className="pokemon" src={POKEMONS[choixJoueur]} alt={choixJoueur} />
        <p>{POKEMON_NAMES[choixJoueur]}</p>
      </div>
      <div className="versus">VS</div>
      <div>
        <h3>Adversaire</h3>
        {choixOrdi ? (
          <>
            <img className="pokemon" src={POKEMONS[choixOrdi]} alt={choixOrdi} />
            <p>{POKEMON_NAMES[choixOrdi]}</p>
          </>
        ) : (
          <p>...</p>
        )}
      </div>
    </div>
  )}

  {étapeJeu === "résultat" && (
    <div>
      <h2>
        {résultat === "GAGNÉ"
          ? "Tu as gagné !"
          : résultat === "PERDU"
          ? "Tu as perdu..."
          : "Égalité"}
      </h2>
      <button onClick={rejouer}>Rejouer</button>
    </div>
  )}
    </div>
  );
}