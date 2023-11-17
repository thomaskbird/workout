import { selectIsLoading, selectSetIsLoading } from "@app/store/selectors/globalStore";
import { useGlobalStore } from "@app/store/useGlobalStore";
import { Backdrop, CircularProgress } from "@mui/material";

const Loading = () => {
  const setIsLoading = useGlobalStore(selectSetIsLoading);
  const isLoading = useGlobalStore(selectIsLoading);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
      onClick={() => setIsLoading(false)}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default Loading;