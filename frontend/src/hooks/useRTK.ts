import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"

// storeに値を格納するためのカスタムフック
export const useAppDispatch = () => useDispatch<AppDispatch>();
// storeから値を取得するためのカスタムフック
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;