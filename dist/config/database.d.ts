import { PrismaClient } from '@prisma/client';
declare const prisma: PrismaClient<{
    log: ({
        level: "query";
        emit: "event";
    } | {
        level: "error";
        emit: "event";
    } | {
        level: "warn";
        emit: "event";
    })[];
}, "error" | "warn" | "query", import("@prisma/client/runtime/library").DefaultArgs>;
export { prisma };
//# sourceMappingURL=database.d.ts.map