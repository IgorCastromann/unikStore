import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "@src/screens/Cart";
import Home from "@src/screens/Home";
import { AntDesign } from "@expo/vector-icons";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Stacks = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: "unikStore",
            headerRight: () => (
              <AntDesign
                name="shoppingcart"
                size={24}
                onPress={() => {
                  navigation.navigate("Cart");
                }}
              />
            ),
          })}
        />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacks;
