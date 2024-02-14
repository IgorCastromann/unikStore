import { Frames, CardNumber, ExpiryDate, Cvv } from "frames-react-native";
import { View } from "native-base";
import { StyleSheet } from "react-native";

interface CardSectionProps {
  publicKey: string;
  setIsValid: (value: boolean) => void;
}
export const CardSectionForm = ({
  publicKey,
  setIsValid,
}: CardSectionProps) => {
  return (
    <Frames
      config={{
        debug: true,
        publicKey,
      }}
      cardTokenized={(e) => {
        alert("Card tokenized");
        console.log({ e });
      }}
      frameValidationChanged={(e) => {
        setIsValid(e.isValid);
      }}
    >
      <CardNumber style={styles.cardNumber} placeholderTextColor="#9898A0" />

      <View style={styles.dateAndCode}>
        <ExpiryDate style={styles.expiryDate} placeholderTextColor="#9898A0" />
        <Cvv style={styles.cvv} placeholderTextColor="#9898A0" testID="cvv" />
      </View>
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
});
