import { createNextRouteHandler } from "uploadthing/next";

import { userImageRouter } from "../../../server/uploadthing";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: userImageRouter,
});
