import { validateEmail } from "@src/utils/validations";
import {
  FormControl,
  Input,
  Stack,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  address: string;
}

export const AdressSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleEmptyValidation = (value: string) => {
    return value.length > 0;
  };

  return (
    <VStack space={0} testID="address-section">
      <FormControl isRequired isInvalid={!handleEmptyValidation(formData.name)}>
        <Stack mx="2">
          <FormControl.Label>Nome</FormControl.Label>
          <Input
            type="text"
            className="text-white"
            placeholder="Nome"
            value={formData.name}
            onChangeText={(value) => handleChange("name", value)}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Campo obrigatório
          </FormControl.ErrorMessage>
        </Stack>
      </FormControl>

      <FormControl isRequired isInvalid={!validateEmail(formData.email)}>
        <Stack mx="2">
          <FormControl.Label>Email</FormControl.Label>
          <Input
            type="text"
            className="text-white"
            placeholder="Email"
            value={formData.email}
            onChangeText={(value) => handleChange("email", value)}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Campo obrigatório
          </FormControl.ErrorMessage>
        </Stack>
      </FormControl>

      <FormControl
        isRequired
        isInvalid={!handleEmptyValidation(formData.address)}
      >
        <Stack mx="2">
          <FormControl.Label>Endereço</FormControl.Label>
          <Input
            type="text"
            className="text-white"
            placeholder="Endereço"
            value={formData.address}
            onChangeText={(value) => handleChange("address", value)}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Campo obrigatório
          </FormControl.ErrorMessage>
        </Stack>
      </FormControl>
    </VStack>
  );
};
