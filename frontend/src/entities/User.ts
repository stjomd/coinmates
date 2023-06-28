export class User {
	constructor(
		public id?: string,
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
		REGULAR,
		ADMIN,
	}
	export enum Status {
		ACTIVE,
		RESTRICTED,
		DELETED,
	}
}
