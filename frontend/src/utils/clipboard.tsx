import toast from "react-hot-toast";

export const copyToClipboard = (address: string) => {
  navigator.clipboard.writeText(address);

  const message = "Copied to clipboard!";

  toast.success(message, {
    duration: 3000,
  });
};
