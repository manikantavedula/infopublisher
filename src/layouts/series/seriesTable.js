import { useState, useEffect } from "react";
import DataTable from "examples/Tables/DataTable";

// Data
import MDButton from "components/MDButton";
// import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ButtonGroup from "@mui/material/ButtonGroup";
// import { useMaterialUIController } from "context";
import { Edit, Delete } from "@mui/icons-material";

function SeriesModule({ name }) {
  return (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

function SeriesTable({ filtereddata, onOpenEditModal, onOpenDeleteModal }) {
  // const [controller] = useMaterialUIController();
  // const { darkMode } = controller;
  const [rows, setRows] = useState([]);
  // const [filtereddata, setFilteredData] = useState([]);
  const [columns] = useState([
    { Header: "s.no", accessor: "sno", align: "left" },
    { Header: "series", accessor: "series", align: "left" },
    // { Header: "status", accessor: "status", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ]);

  useEffect(() => {
    let row = [];
    console.log(filtereddata);

    if (filtereddata && filtereddata !== null) {
      row = filtereddata.map((v, i) => ({
        sno: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {i + 1}
          </MDTypography>
        ),
        series: <SeriesModule name={`${v.name}`} />,
        // status: (
        //   <MDBox ml={-1}>
        //     <MDBadge
        //       badgeContent={`${v.status}`}
        //       color={v.status === "on" ? "success" : "error"}
        //       variant="gradient"
        //       size="sm"
        //     />
        //   </MDBox>
        // ),
        action: (
          <ButtonGroup size="small" variant="text" aria-label="outlined primary button group">
            <MDButton color="success" onClick={() => onOpenEditModal(v)} size="small">
              <Edit />
            </MDButton>
            <MDButton color="error" onClick={() => onOpenDeleteModal(v)} size="small">
              <Delete />
            </MDButton>
          </ButtonGroup>
        ),
      }));
    }

    setRows(row);
  }, [filtereddata]);

  return (
    <MDBox pt={3}>
      <DataTable
        table={{ columns, rows }}
        isSorted={false}
        entriesPerPage={false}
        showTotalEntries={false}
        noEndBorder
      />
    </MDBox>
  );
}

export default SeriesTable;
