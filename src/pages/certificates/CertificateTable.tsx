import styled from "styled-components";
import Table from "react-bootstrap/Table";

export const CertificateTable = styled(Table)`
  border-collapse: separate;
  border-spacing: 0 6px;

  thead {
    th {
      background: unset;
      border-bottom-width: 0;
      text-transform: uppercase;
      font-size: 12px;
      color: grey;
      padding: 10px 20px;
    }
  }

  tbody {
    td {
      padding: 10px 20px;
      font-size: 16px;
    }
  }

  .unique_id {
    div {
      width: 250px;
    }
  }
`;
