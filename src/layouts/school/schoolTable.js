import { useState, useEffect } from "react";
import DataTable from "examples/Tables/DataTable";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

// Data
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useMaterialUIController } from "context";
import { Visibility, Edit, Delete } from "@mui/icons-material";

function SchoolModule({ name }) {
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

function SchoolTable({ filtereddata, onOpenEditModal, onOpenDeleteModal, onOpenViewModal }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [rows, setRows] = useState([]);
  // const [filtereddata, setFilteredData] = useState([]);
  const [columns] = useState([
    { Header: "s.no", accessor: "sno", align: "left" },
    { Header: "school", accessor: "school", align: "left" },
    { Header: "series", accessor: "series", align: "center" },
    { Header: "contact", accessor: "contact", align: "center" },
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
        school: <SchoolModule name={`${v.name}`} />,
        series: (
          <List>
            {v.school_series &&
              v.school_series.length > 0 &&
              v.school_series.map((w, j) => (
                // eslint-disable-next-line react/no-array-index-key
                <ListItem disablePadding key={i + j} dense>
                  <ListItemButton>
                    <ListItemText primary={w} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        ),
        contact: <SchoolModule name={`${v.contact}`} />,
        action: (
          <ButtonGroup size="small" variant="text" aria-label="outlined primary button group">
            <MDButton
              color={!darkMode ? "warning" : "secondary"}
              onClick={() => onOpenViewModal(v)}
              size="small"
            >
              <Visibility />
            </MDButton>
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

export default SchoolTable;
