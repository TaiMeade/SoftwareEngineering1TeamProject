import "@uploadthing/react/styles.css";

import { generateComponents } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { UserImageRouter } from "~/server/uploadthing";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<UserImageRouter>();

export const { useUploadThing } = generateReactHelpers<UserImageRouter>();
