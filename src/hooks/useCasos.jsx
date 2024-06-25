import { useContext } from "react";
import CasoContext from "../context/CasoProvider";

const useCasos = () => {
  return useContext(CasoContext)
}

export default useCasos