import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    clientPrefix: "PUBLIC_",
    client: {
        PUBLIC_BASE_PATH: z.string().optional().default("/"),
    },
    runtimeEnv: import.meta.env,
});
