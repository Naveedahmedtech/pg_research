// import puppeteer from 'puppeteer'

// export const exportToPDF = async (name, code, price, selectedSupplier, image) => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   console.log("Working Me");

//   const content = `
//     <html>
//       <head>
//           <title>Product Data</title>
//       </head>
//       <body>
//           <h1>Product: ${name}</h1>
//           <p>Code: ${code}</p>
//           <p>Price: ${price}</p>
//           <p>Supplier: ${selectedSupplier}</p>
//           <img src="${URL.createObjectURL(image)}" alt="Product Image" />
//       </body>
//     </html>
//     `;

//   await page.setContent(content);
//   const pdfBuffer = await page.pdf({ format: "A4" });
//   await browser.close();

//   // Trigger download
//   const blob = new Blob([pdfBuffer], { type: "application/pdf" });
//   const link = document.createElement("a");
//   link.href = URL.createObjectURL(blob);
//   link.download = "product-data.pdf";
//   link.click();
//   URL.revokeObjectURL(link.href);
// };
