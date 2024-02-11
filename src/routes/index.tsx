import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "@src/screens/Cart";
import Home from "@src/screens/Home";
import { RootStackParamList } from "./types";
import { HeaderLeft, HeaderRight } from "@src/components/Header";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Stacks = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: "",
            headerLeft: () => <HeaderLeft />,
            headerRight: () => <HeaderRight navigation={navigation} />,
          })}
        />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacks;
