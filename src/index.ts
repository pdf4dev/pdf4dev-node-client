import "dotenv/config";
import main from "./lib/PDF4dev";
import operation from "./lib/classes/Operation";

export {
  PDF_CREATE_PAGE_ITEM,
  PDF_MEDIA_TYPE,
  PDF_ORIENTATION,
  PDF_PAGE_SIZE,
  IMAGE_FORMAT,
  PDF_TO_DOCUMENT_OUTPUT,
  PDF_PROTECT_PERMISSIONS,
  BARCODES_TYPES,
  TEXT_ALIGMENT,
  BARCODE_ROTATION,
} from "./lib/operations/enums";

export const PDF4dev = main;
export const Operation = operation;
