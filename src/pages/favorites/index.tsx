import { useMemo } from "react";
import { Bookmark, BookmarkFill } from "react-bootstrap-icons";
import { toast } from "react-toastify";

import { FavoriteTable } from "./FavoriteTable";
import TooltipWrapper from "../../components/tooltipWrapper";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { certificateActions } from "../../redux/modules/certificateSlice";

function Favorite() {
  const dispatch = useAppDispatch();
  const { favoriteCertificates } = useAppSelector((state) => state.certificate);

  const onCopyUniqueId = async (id: string) => {
    await navigator.clipboard.writeText(id);
    toast.success("You just copied unique id");
  };

  const TipElement = useMemo(() => {
    return <span>Click to copy the certificate ID</span>;
  }, []);

  const onHandleFavorite = (id: number) => {
    dispatch(certificateActions.handleFavorite(id));
  };

  return (
    <div className="favorite-page">
      <FavoriteTable responsive="lg">
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
          {!favoriteCertificates.length ? (
            <tr>
              <td colSpan={7}>
                <div className="d-flex justify-content-center py-3">
                  There is no favorite certificate
                </div>
              </td>
            </tr>
          ) : (
            favoriteCertificates.map((certificate) => (
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
                  <div
                    onClick={() => onHandleFavorite(certificate.id)}
                    className="cursor-pointer"
                  >
                    {certificate.isFavorite ? <BookmarkFill /> : <Bookmark />}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </FavoriteTable>
    </div>
  );
}

export default Favorite;
