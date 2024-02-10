import { RouteProp } from "@react-navigation/native";
import { type ParamListBase } from "@react-navigation/native";
import { type NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface RootStackParamList extends ParamListBase {
  Home: undefined;
  Cart: undefined;
}

export interface RootStackScreenComponent<T extends keyof RootStackParamList> {
  navigation?: NativeStackNavigationProp<RootStackParamList, T>;
  route?: RouteProp<RootStackParamList, T>;
}

export type NavigationRoutes = NativeStackNavigationProp<RootStackParamList>;
