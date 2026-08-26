export class MemberBranch {
    memberId;
    branchId;
    createdAt;
    constructor(data) {
        this.memberId = data.memberId;
        this.branchId = data.branchId;
        this.createdAt = data.createdAt ?? new Date();
    }
}
//# sourceMappingURL=member-branch.entity.js.map