import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { MovieContext } from "./Context";
// import BookedTicket from "./screens/BookedTicket";
import StackNavigator from "./StackNavigator";

export default function App() {
  return (
    <>
      <MovieContext>
          <StackNavigator />
          {/* <Test/> */}
          {/* <BookedTicket/> */}
          {/* <StatusBar style="auto" /> */}
      </MovieContext>
    </>
  );
}

