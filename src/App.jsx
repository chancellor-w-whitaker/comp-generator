import { Button } from "./components/Button";

export default function App() {
  return (
    <Button
      bsBtn={["primary", "lg"]}
      bsBg={"secondarySubtle"}
      bsText={"secondary"}
      bsRounded={"0"}
    >
      Chance
    </Button>
  );
}
