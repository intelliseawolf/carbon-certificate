import { useEffect, useMemo } from "react";
import { Bookmark } from "react-bootstrap-icons";

import { CertificateTable } from "./CertificateTable";
import TooltipWrapper from "../../components/tooltipWrapper";
import Spinner from "../../components/spinner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCertificates } from "../../redux/modules/certificateSlice";

function Certificate() {
  const dispatch = useAppDispatch();
  const { certificates, status } = useAppSelector((state) => state.certificate);

  useEffect(() => {
    dispatch(getCertificates());
  }, [dispatch]);

  const onCopyUniqueId = async (id: string) => {
    await navigator.clipboard.writeText(id);
  };

  const TipElement = useMemo(() => {
    return <span>Click to copy the certificate ID</span>;
  }, []);

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
        {status === "loading" ? (
          <tr>
            <td colSpan={7}>
              <div className="d-flex justify-content-center py-3">
                <Spinner />
              </div>
            </td>
          </tr>
        ) : (
          certificates.map((certificate) => (
            <tr key={certificate.id}>
              <td
                className="unique_id cursor-pointer"
                onClick={() => onCopyUniqueId(certificate.uniqueNumber)}
              >
                <TooltipWrapper tipElement={TipElement}>
                  {(props) => (
                    <div className="text-truncate" {...props}>
                      {certificate.uniqueNumber}
                    </div>
                  )}
                </TooltipWrapper>
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
          ))
        )}
      </tbody>
    </CertificateTable>
  );
}

export default Certificate;
