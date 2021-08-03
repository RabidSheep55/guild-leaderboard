export default function pointsFunction(props) {
  return (
    props["Sea Emperor Kills"] * 8 +
    props["GW Kills"] * 3 +
    props["Hydra Kills"] * 3.5
  );
}
