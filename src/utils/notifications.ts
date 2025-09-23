import { addToast } from "@heroui/toast";

// error
export const showError = (message: string) => {
  addToast({
    title: "Error",
    description: message,
    color:"danger",
    radius:"none"
  });
};