import type {
	ChoresRecord,
	HouseholdMembersRecord,
	HouseholdsRecord,
	InvitationsRecord,
	RoomsRecord,
	UsersRecord
} from './pocketbase/generated-types';

export type Chore = ChoresRecord & {
	expand?: {
		room: RoomsRecord;
	};
};

export type Room = RoomsRecord & {
	expand?: {
		chores_via_room: Chore[];
	};
};

export type HouseholdMember = HouseholdMembersRecord & {
	expand?: {
		household?: Household;
		user?: User;
	};
};

export type User = UsersRecord;
export type Household = HouseholdsRecord;
export type Invitation = InvitationsRecord;

export type Person = {
	memberId: string;
	userId: string;
	email: string;
	name: string;
	role?: string;
	choresCompleted?: number;
};
