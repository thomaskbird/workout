import { ChevronLeft } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button color="inherit" startIcon={<ChevronLeft />} onClick={() => router.back()}>
      Back
    </Button>
  );
};

export default BackButton;