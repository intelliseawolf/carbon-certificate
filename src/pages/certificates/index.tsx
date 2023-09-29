import { useEffect } from "react";
import { Bookmark } from "react-bootstrap-icons";
import Tooltip from "react-bootstrap/Tooltip";

import { CertificateTable } from "./CertificateTable";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCertificates } from "../../redux/modules/certificateSlice";

function Certificate() {
  const dispatch = useAppDispatch();
  const { certificates, status } = useAppSelector((state) => state.certificate);

  console.log(certificates, status);

  useEffect(() => {
    dispatch(getCertificates());
  }, [dispatch]);

  return (
    <CertificateTable responsive="lg">
      <thead>
        <tr>
          <th className="unique_id">unique id</th>
          <th className="w-20">originator</th>
          <th className="w-15">originator country</th>
          <th className="w-20">owner</th>
          <th className="w-15">owner country</th>
          <th className="w-5">status</th>
          <th className="w-5"></th>
        </tr>
      </thead>
      <tbody>
        {certificates.map((certificate) => (
          <tr key={certificate.id}>
            <td className="unique_id">
              <div className="text-truncate">{certificate.uniqueNumber}</div>
            </td>
            <td className="w-20">{certificate.companyName}</td>
            <td className="w-15">{certificate.countryCode}</td>
            <td className="w-20">
              {
                certificate.carbonCertificateOwnerAccount.carbonUser.company
                  .name
              }
            </td>
            <td className="w-15">
              {
                certificate.carbonCertificateOwnerAccount.carbonUser.company
                  .address.country
              }
            </td>
            <td className="w-5">{certificate.ownershipStatus}</td>
            <td className="w-5">
              <Bookmark />
            </td>
          </tr>
        ))}
      </tbody>
    </CertificateTable>
  );
}

export default Certificate;
