import { useState } from "react";
import type { Poke, AbilityInfo } from "./Pages/PokemonInfoPage";
import { capitalizeFirstLetter } from "./Pages/PokemonInfoPage";
import { X } from "lucide-react";

export function AbilityPopup({
  ability,
  onClose,
}: {
  ability: AbilityInfo | null;
  onClose: () => void;
}) {
  return (
    <div className="extra-info2">
      <div>
        <button onClick={onClose} className="abilityXButton">
          <X />
        </button>
      </div>
      <h4 style={{ color: "rgb(233, 225, 214)" }}>
        {" "}
        Ability Description: <br />
      </h4>
      <h5>
        {ability?.effect_entries?.find((entry) => entry.language.name === "en")
          ?.short_effect ?? "Ingen effekt hittades"}
      </h5>
    </div>
  );
}

export function AbilityDesc({ pokemon }: { pokemon: Poke }) {
  const [showPopup, setShowPopup] = useState(false);
  const [ability, setAbility] = useState<AbilityInfo | null>(null);

  async function handleAbilityClick() {
    const abilityUrl = "http://localhost:5010/api/ability";
    const abilityName = pokemon?.abilities[0].ability.name;
    const aUrl = `${abilityUrl}/${abilityName}`;

    try {
      const response = await fetch(aUrl);
      const data = await response.json();
      console.log("Fetched ability data:", data);
      setAbility(data.data);

      setShowPopup(true);
    } catch (error) {
      console.log("error, kunde inte ladda ability");
    }
  }

  return (
    <h5>
      <button className="abilityButton" onClick={handleAbilityClick}>
        Abilities:&nbsp;&nbsp;
        {capitalizeFirstLetter(pokemon!.abilities[0].ability.name)}
      </button>
      {showPopup && ability && (
        <AbilityPopup ability={ability} onClose={() => setShowPopup(false)} />
      )}
    </h5>
  );
}
