# PDF4.dev - Node Client

This is the officially supported [node.js](http://nodejs.org/) library for using our [PDF4.dev API](https://api.pdf4.dev/v1/docs/)

You can sign up for a PDF4.dev account at [https://pdf4.dev](https://pdf4.dev).
Register now and receive 50 credits for free. ❤️

## ✨ Features

#### Create PDF:

- Create from HTML Code.
- Create from Website URL.
- Create from Documents (doc, docx, ppt, pptx, xml, xmlx and odt, ods, odp).
- Create from Images.
- Create or add elements to a PDF using a JSON.

#### PDF Utilities:

- Merge multiples files in one file.
- Reorganize (Remove or change pages order, split in multiple files, etc).
- Protect - Unprotect.
- Fill and List fields.
- Repair.

#### Create Images:

- Create from HTML Code.
- Create from Website URL (Screenshot).
- Create from a PDF file.

#### QR - Barcodes:

- Read QR - Barcodes from a PDF or a Image file.
- Create QR - Barcodes.

#### Create Documents:

- Create from a PDF file (doc, docx).

## 🚀 Quickstart

### 1. Installing the client library

```sh
npm install --save pdf4dev-node-client
```

### 2. Setting the API Key

#### 2.1 Get an API Key:

- Login into the [dashboard panel](https://dashboard.pdf4.dev).
- Navigate to API Keys.
- Press **Create new API Key** and follow the steps.

#### 2.2 Configuration:

```js
const { PDF4dev } = require("pdf4dev-node-client");

const pdf4dev = new PDF4dev({
  apiKey: "your-api-key",
});
```

💡 You can also set your API key using the `PDF4DEV_API_KEY` environment variable. It'll look better!

### 3. Make your first operation

```js
const html = "<h1>Hello World</h1>";

// HTML to PDF
const operation = await pdf4dev.htmlToPdf(html);

// Save to a file
await operation.save("result.pdf");
```

Also you can make something like this:

```js
pdf4dev.htmlToPdf(html).then((operation) => {
  operation.save("result.pdf").then(() => {
    console.log("Success");
  });
});
```

🎉 That's all! You can check for more below or [here](https://github.com/pdf4dev/pdf4dev-node-client/tree/main/examples).

## 📥 Downloading the files

When you have an operation you'll be able to:

```js
// Download and save the file:
await operation.save("result.pdf");

// Or get a buffer:
const buffer = await operation.download();
```

Sometimes you'll get more than one file (For example, when you convert a PDF with multiple pages to images). In those cases you can:

```js
// Download and save files in a folder:
await operation.saveAll("/my-folder");

// Or get an array of buffers:
const buffer = await operation.downloadAll();
```

## 📤 Uploading your local files

We use our [Storage API](https://storage-api.pdf4.dev/v1/docs) to upload your local files to the server. It works transparent, for example:

```js
// The file is on internet, so we'll use the specified URL directly:
await pdf4dev.barcodeReader("https://your-address.com/remote-file.pdf");

// The file is local, we'll upload it:
await pdf4dev.barcodeReader("./local-file.pdf");

// If you want you can use a buffer, we'll upload it too:
const buffer = fs.readFileSync("./local-file.pdf");
await pdf4dev.barcodeReader(buffer);
```

## ✨ Examples

💡 You can find these examples and more within the project [right here](https://github.com/pdf4dev/pdf4dev-node-client/tree/main/examples).

### HTML to PDF

```js
const html = "<h1>Hello {{name}}</h1>";

const operation = await pdf4dev.htmlToPdf(html, {
  template: {
    name: "World",
  },
});

await operation.save("./output/html-to-pdf.pdf");
```

### WEB to PDF

```js
const url = "https://www.wikipedia.org/";
const operation = await pdf4dev.webToPdf(url);

await operation.save("./output/web-to-pdf.pdf");
```

### Document to PDF

```js
const file = fs.readFileSync("./files/document.docx");
const operation = await pdf4dev.documentToPdf(file);

await operation.save("./output/document-to-pdf.pdf");
```

### Read QR - Barcodes

```js
const file = fs.readFileSync("./files/barcodes.pdf");
const operation = await pdf4dev.barcodeReader(file);

for (let code of operation.output.barcodes) {
  console.log(code.value);
}
```

### WEB To Image (Screenshot)

```js
const url = "https://en.wikipedia.org/wiki/Madrid";

const operation = await pdf4dev.webToImage(url, {
  output: IMAGE_FORMAT.PNG,
  options: {
    fullPage: true,
  },
});
```

💡 Check out for more examples [here](https://github.com/pdf4dev/pdf4dev-node-client/tree/main/examples).

## 💣 Advanced options

### Asynchronous operations

It's possible to use this library to make [asynchronous operations](https://api.pdf4.dev/v1/docs/#section/Asynchronous-operations).

You can specified the callback URL when you create the instance:

```js
const pdf4dev = new PDF4dev({
  callbackUrl: "https://url-to-your-server/",
});
```

Keep in mind that you won't be able to download the generated files:

```js
const operation = await pdf4dev.htmlToPdf("<h1>Hello World</h1>");

// Oops! You'll get an error:
await operation.save("result.pdf");
```

However, If you want you can use this library to handle the received request from our API:

```js
const { Operation } = require("pdf4dev-client");

const handler = async (req, res, next) => {
  const operation = new Operation(req.body);
  await operation.save("result.pdf");
};
```
