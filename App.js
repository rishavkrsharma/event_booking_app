import { EventContext } from "./src/Context";
import StackNavigator from "./src/navigation/StackNavigator";

export default function App() {
  return (
    <>
      <EventContext>
        <StackNavigator />
      </EventContext>
    </>
  );
}
