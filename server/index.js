const express = require("express");
const { MongoClient } = require("mongodb");
const { format } = require("date-fns");
const xl = require("excel4node");
const fs = require("fs");
const path = require("path");
const { generateReport } = require("./controllers/report");
const { getRecord } = require("./controllers/record");
const cors = require("cors");
const { convert } = require("./controllers/convertStringToDate");
const { generatePDF } = require("./controllers/generatePdf");
const app = express();

app.use(express.json());
app.use(cors());

require("dotenv").config();

app.get("/report", generateReport);

app.post("/record", getRecord);

app.post("/generate-pdf", generatePDF);

// app.post("/convert", convert);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
