import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCertificates } from "../../redux/modules/certificateSlice";

function Certificate() {
  const dispatch = useAppDispatch();
  const { certificates, status } = useAppSelector((state) => state.certificate);

  console.log(certificates, status);

  useEffect(() => {
    dispatch(getCertificates());
  }, [dispatch]);

  return <div>Certificate</div>;
}

export default Certificate;
