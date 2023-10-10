import {
  TextField,
  Box,
  MenuItem,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { get, post } from "./server/server";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function App() {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [combineData, setCombineData] = useState([]);

  useEffect(() => {
    const getSuppliers = async () => {
      const { res, err } = await get("/suppliers");
      if (err) {
        console.log(err);
      }
      if (res) {
        setSuppliers(res.suppliers);
      }
    };
    getSuppliers();
  }, []);

  useEffect(() => {
    const getCombineData = async () => {
      const { res, err } = await get("/supplier-products");
      if (err) {
        console.log(err);
      }
      if (res) {
        setCombineData(res.result);
      }
    };
    getCombineData();
  }, []);

  const handleExportToPDF = async (e) => {
    try {
      const response = await fetch("/export-pdf", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "exported.pdf";

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("There was an error with the download:", error);
    }
  };

  const handleSupplierChange = (e) => {
    console.log(e.target.value);
    setSelectedSupplier(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("code", code);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("supplier_id", selectedSupplier);
    const { res, err } = await post("/add-products", formData);
    if (err) {
      console.error(err);
    }
    if (res) {
      console.log(res);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", margin: "25px 0" }}>
        <div style={{ width: "500px" }}>
          <Typography>Add Product Data</Typography>
          <div style={{ margin: "20px 0" }}>
            <TextField
              id="outlined-basic"
              label="Product Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ margin: "20px 0" }}>
            <TextField
              id="outlined-basic"
              label="Product Price"
              type="number"
              variant="outlined"
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div style={{ margin: "20px 0" }}>
            <TextField
              id="outlined-basic"
              label="Product Code"
              type="number"
              variant="outlined"
              fullWidth
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div style={{ margin: "20px 0" }}>
            <Button
              component="label"
              variant="contained"
              fullWidth
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" onChange={handleImageChange} />
            </Button>
          </div>
          <div style={{ margin: "20px 0" }}>
            <TextField
              select
              label="Select Supplier"
              value={selectedSupplier}
              onChange={handleSupplierChange}
              variant="outlined"
              fullWidth
            >
              {suppliers.map((supplier) => (
                <MenuItem
                  key={supplier.supplier_id}
                  value={supplier.supplier_id}
                >
                  {supplier.name}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              sx={{ marginBottom: "50px" }}
            >
              Submit
            </Button>
          </div>
          {/* <Button variant="contained" fullWidth onClick={handleExportToPDF}>
            Export as PDF
          </Button> */}
        </div>
      </Box>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "25px" }}>
        {combineData.length > 0 &&
          combineData.map((data) => (
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={`http://localhost:8000/images/${data.image}`}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.code}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </div>
    </>
  );
}

export default App;
