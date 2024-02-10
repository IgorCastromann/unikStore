import useCartStore from "@src/store/cart";
import {
  Frames,
  CardNumber,
  ExpiryDate,
  Cvv,
  SubmitButton,
} from "frames-react-native";
import { View } from "native-base";
import { useState } from "react";
import { StyleSheet } from "react-native";

export const CheckoutForm = () => {
  const [isValid, setIsValid] = useState(false);
  const totalCartValue = useCartStore((state) =>
    state.getTotalValueCartItems(),
  );

  return (
    <Frames
      config={{
        debug: true,
        publicKey: "pk_test_4296fd52-efba-4a38-b6ce-cf0d93639d8a",
      }}
      cardTokenized={(e) => {
        alert(e.token);
      }}
      frameValidationChanged={(e) => {
        setIsValid(e.isValid);
      }}
    >
      <CardNumber style={styles.cardNumber} placeholderTextColor="#9898A0" />

      <View style={styles.dateAndCode}>
        <ExpiryDate style={styles.expiryDate} placeholderTextColor="#9898A0" />
        <Cvv style={styles.cvv} placeholderTextColor="#9898A0" />
      </View>

      <SubmitButton
        title={isValid ? `Pay R$${totalCartValue}` : "Invalid card"}
        style={styles.button}
        textStyle={styles.buttonText}
        disabled={!isValid}
        onPress={() => alert("Payment button pressed")}
      />
    </Frames>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 80,
    paddingLeft: 10,
    paddingRight: 10,
  },
  dateAndCode: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardNumber: {
    fontSize: 18,
    height: 50,
    color: "#FEFFFF",
    backgroundColor: "#1B1C1E",
    borderColor: "#3A4452",
    borderRadius: 5,
    borderWidth: 0,
  },
  expiryDate: {
    fontSize: 18,
    height: 50,
    width: "48%",
    color: "#FEFFFF",
    backgroundColor: "#1B1C1E",
    borderWidth: 0,
  },
  cvv: {
    fontSize: 18,
    height: 50,
    width: "48%",
    color: "#FEFFFF",
    backgroundColor: "#1B1C1E",
    borderWidth: 0,
  },
  button: {
    height: 50,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: "center",
    backgroundColor: "#4285F4",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
