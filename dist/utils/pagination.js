"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaginatedResponse = exports.getPaginationParams = void 0;
const env_1 = require("../config/env");
const getPaginationParams = (page, limit) => {
    const defaultPageSize = parseInt(env_1.env.DEFAULT_PAGE_SIZE);
    const maxPageSize = parseInt(env_1.env.MAX_PAGE_SIZE);
    const validPage = Math.max(1, page || 1);
    const validLimit = Math.min(maxPageSize, Math.max(1, limit || defaultPageSize));
    return {
        skip: (validPage - 1) * validLimit,
        take: validLimit,
    };
};
exports.getPaginationParams = getPaginationParams;
const createPaginatedResponse = (items, total, page, limit) => {
    return {
        items,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
};
exports.createPaginatedResponse = createPaginatedResponse;
//# sourceMappingURL=pagination.js.map