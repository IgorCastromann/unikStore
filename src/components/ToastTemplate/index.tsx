import { Box } from "native-base";

type ToastTypes = "success" | "error" | "info";

interface ToastTemplateProps {
  type: ToastTypes;
  message: string;
}
export const ToastTemplate = ({ type, message }: ToastTemplateProps) => {
  return (
    <Box
      bg={getColorByType(type)}
      className="p-2 rounded-sm mb-5"
      _text={{ color: "white" }}
    >
      {message}
    </Box>
  );
};

export default ToastTemplate;

export const getColorByType = (type: ToastTypes) => {
  switch (type) {
    case "success":
      return "emerald.500";

    case "error":
      return "red.500";

    case "info":
      return "blue.500";

    default:
      return "";
  }
};
