import { idSchema } from "@/shared/schemas/id.schema";
import * as v from "valibot";

export const folderBreadcrumbSchema = v.object({
  name: v.string(),
  id: idSchema(),
});

export type IFolderBreadcrumb = v.InferOutput<typeof folderBreadcrumbSchema>;
