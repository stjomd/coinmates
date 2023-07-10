export class User {
	constructor(
		public id?: number,
		public email?: string,
		public password?: string,
		public firstName?: string,
		public lastName?: string,
		public role?: User.Role,
		public status?: User.Status
	) {}
}

// Makes Role and Status 'nested' inside User; but linter complains
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace User {
	export enum Role {
		REGULAR = 'REGULAR',
		ADMIN = 'ADMIN',
	}
	export enum Status {
		ACTIVE = 'ACTIVE',
		RESTRICTED = 'RESTRICTED',
		DELETED = 'DELETED',
	}
}
