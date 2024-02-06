import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormGroup, IconButton, TextField, Box } from "@mui/material";
// import { styled } from "@mui/material/styles";
import { Close } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  distributor: yup.string().required("Distributor is required"),
});

// const MaterialUISwitch = styled(Switch)(({ theme }) => ({
//   width: 62,
//   height: 34,
//   padding: 7,
//   "& .MuiSwitch-switchBase": {
//     margin: 1,
//     padding: 0,
//     transform: "translateX(6px)",
//     "&.Mui-checked": {
//       color: "#fff",
//       transform: "translateX(22px)",
//       "& .MuiSwitch-thumb:before": {
//         backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><circle cx="64" cy="64" r="48" fill="%23000" opacity="0.3"/><text x="50%" y="50%" fill="%23fff" font-family="Arial" font-size="40" font-weight="bold" text-anchor="middle" alignment-baseline="middle">On</text></svg>')`,
//       },
//       "& + .MuiSwitch-track": {
//         opacity: 1,
//         backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
//       },
//     },
//   },
//   "& .MuiSwitch-thumb": {
//     backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
//     width: 32,
//     height: 32,
//     "&:before": {
//       content: "''",
//       position: "absolute",
//       width: "100%",
//       height: "100%",
//       left: 0,
//       top: 0,
//       backgroundRepeat: "no-repeat",
//       backgroundPosition: "center",
//       backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><circle cx="64" cy="64" r="48" fill="%23000" opacity="0.3"/><text x="50%" y="50%" fill="%23fff" font-family="Arial" font-size="40" font-weight="bold" text-anchor="middle" alignment-baseline="middle">Off</text></svg>')`,
//     },
//   },
//   "& .MuiSwitch-track": {
//     opacity: 1,
//     backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
//     borderRadius: 20 / 2,
//     width: "3rem",
//     height: "1.2375rem",
//   },
// }));

export function DistributorDeleteModal({ isOpen, onClose, onCloseEmpty, editModalData }) {
  const {
    name,
    // status
  } = editModalData;
  const initialValues = {
    distributor: name,
    // status
  };

  const onSubmit = (values) => {
    console.log(values);
    onClose(values);
  };

  return (
    <Dialog open={isOpen} fullWidth>
      <DialogTitle className="flex justify-content-between">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box padding="8px" fontSize={18}>
            Confirm Delete
          </Box>

          <IconButton onClick={onCloseEmpty}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ values, handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              <FormGroup row style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  name="distributor"
                  label="Distributor"
                  variant="outlined"
                  error={touched.distributor && Boolean(errors.distributor)}
                  helperText={touched.distributor && errors.distributor}
                  defaultValue={values.distributor}
                  disabled
                />

                {/* <FormControlLabel
                  style={{ display: "flex", justifyContent: "flex-end", marginLeft: 0 }}
                  control={
                    <MaterialUISwitch sx={{ m: 1 }} checked={values.status !== "off"} disabled />
                  }
                  label="Status"
                  labelPlacement="start"
                /> */}
              </FormGroup>
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary">
                Delete
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

export default DistributorDeleteModal;
