import "../App.css";
export interface AbilityInfo {
  effect_entries: {
    effect: string;
    language: {
      name: string;
    };
  }[];
}

function AbilityPopup() {
  return (
    <div
      className="extra-info"
      style={{
        position: "absolute",
        background: "black",
        width: "18rem",
        height: "18.5rem",
        margin: "1rem",
        marginTop: "-5.5rem",
        zIndex: 5,
        borderRadius: "13px",
        padding: ".8rem",
        paddingLeft: "1rem",
        marginLeft: "-1rem",
      }}
    >
      <h2>bög</h2>
    </div>
  );
}

export default AbilityPopup;
