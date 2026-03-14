import { MobileAuthPayload, AdminAuthPayload } from '../types';
export declare const generateMobileAccessToken: (payload: MobileAuthPayload) => string;
export declare const generateMobileRefreshToken: (payload: MobileAuthPayload) => string;
export declare const verifyMobileAccessToken: (token: string) => MobileAuthPayload;
export declare const verifyMobileRefreshToken: (token: string) => MobileAuthPayload;
export declare const generateAdminAccessToken: (payload: AdminAuthPayload) => string;
export declare const generateAdminRefreshToken: (payload: AdminAuthPayload) => string;
export declare const verifyAdminAccessToken: (token: string) => AdminAuthPayload;
export declare const verifyAdminRefreshToken: (token: string) => AdminAuthPayload;
//# sourceMappingURL=jwt.d.ts.map