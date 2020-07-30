import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { enableScreens } from "react-native-screens";
import MealsNavigator from "./navigation/MealsNavigator";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import mealReducers from "./store/reducers/meals";

enableScreens();

const rootReducer = combineReducers({
  meals: mealReducers,
});
const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  // make sure fonts loaded
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}
