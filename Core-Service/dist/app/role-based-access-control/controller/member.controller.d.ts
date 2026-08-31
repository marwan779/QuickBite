import type { Request, Response, NextFunction } from "express";
import type { MemberService } from "../service/member.service";
export declare class MemberController {
    private readonly memberService;
    constructor(memberService: MemberService);
    createMember: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    listMembers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateMember: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteMember: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateMemberBranches: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getRolePermissions: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPermissionsByRole: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=member.controller.d.ts.map