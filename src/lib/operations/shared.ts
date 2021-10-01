import { PDF_ORIENTATION, PDF_MEDIA_TYPE, PDF_PAGE_SIZE } from "./enums";

export interface PDFMargin {
  left?: Number;
  right?: Number;
  top?: Number;
  bottom?: Number;
}

export interface PDFViewport {
  width: Number;
  height: Number;
}

export interface PDFRect {
  x: Number;
  y: Number;
  width: Number;
  height: Number;
}

export interface PDFMetadata {
  title?: String;
  author?: String;
  subject?: String;
  keywords?: Array<String>;
  producer?: String;
  creationDate?: String;
  modificationDate?: String;
}

export interface PDFCreationOptions {
  /** Scale for rendering. Default to 1. Must be between 0.1 and 2. */
  scale?: Number;
  /** Enum: portrait, landscape */
  orientation?: PDF_ORIENTATION;
  /** We set it to true automatically if you are using a header or a footer. */
  displayHeaderFooter?: Boolean;
  /** Enum: screen, print */
  mediaType?: PDF_MEDIA_TYPE;
  printBackground?: Boolean;
  format?: PDF_PAGE_SIZE;
  width?: Number;
  height?: Number;
  margin?: PDFMargin;
  viewPort?: PDFViewport;
}

export interface Authorization {}
