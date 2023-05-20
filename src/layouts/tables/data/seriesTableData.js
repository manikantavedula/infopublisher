/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import { useEffect, useState } from "react";

export default function seriesTableData(series) {
  const [rows] = useState([]);

  useEffect(() => {
    console.log(series);
  }, []);

  const Series = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  useEffect(() => {
    console.log(series);
  }, []);

  useEffect(() => {
    console.log(rows);
  }, [rows]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!series.isLoading &&
        series.data.map((v, i) => ({
          sno: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {i + 1}
            </MDTypography>
          ),
          series: <Series name={`${v.name}`} />,
          status: (
            <MDBox ml={-1}>
              <MDBadge
                badgeContent={`${v.status}`}
                color={v.status === "on" ? "success" : "danger"}
                variant="gradient"
                size="sm"
              />
            </MDBox>
          ),
          action: (
            <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
              Edit
            </MDTypography>
          ),
        }))}
    </>
  );
}
