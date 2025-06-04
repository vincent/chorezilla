/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';

export enum Collections {
	Authorigins = '_authOrigins',
	Externalauths = '_externalAuths',
	Mfas = '_mfas',
	Otps = '_otps',
	Superusers = '_superusers',
	Courts = 'courts',
	Locations = 'locations',
	MatchParticipants = 'match_participants',
	Matches = 'matches',
	UserSkills = 'user_skills',
	Users = 'users'
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T };

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString;
	collectionId: string;
	collectionName: Collections;
} & ExpandType<T>;

export type AuthSystemFields<T = unknown> = {
	email: string;
	emailVisibility: boolean;
	username: string;
	verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string;
	created?: IsoDateString;
	fingerprint: string;
	id: string;
	recordRef: string;
	updated?: IsoDateString;
};

export type ExternalauthsRecord = {
	collectionRef: string;
	created?: IsoDateString;
	id: string;
	provider: string;
	providerId: string;
	recordRef: string;
	updated?: IsoDateString;
};

export type MfasRecord = {
	collectionRef: string;
	created?: IsoDateString;
	id: string;
	method: string;
	recordRef: string;
	updated?: IsoDateString;
};

export type OtpsRecord = {
	collectionRef: string;
	created?: IsoDateString;
	id: string;
	password: string;
	recordRef: string;
	sentTo?: string;
	updated?: IsoDateString;
};

export type SuperusersRecord = {
	created?: IsoDateString;
	email: string;
	emailVisibility?: boolean;
	id: string;
	password: string;
	tokenKey: string;
	updated?: IsoDateString;
	verified?: boolean;
};

export type CourtsRecord = {
	created?: IsoDateString;
	id: string;
	location?: RecordIdString;
	name: string;
	qr_code?: string;
	sport_type: string;
	status: string;
	updated?: IsoDateString;
};

export type LocationsRecord = {
	address: string;
	coordinates: string;
	created?: IsoDateString;
	id: string;
	name: string;
	updated?: IsoDateString;
};

export type MatchParticipantsRecord = {
	created?: IsoDateString;
	id: string;
	joined_at?: IsoDateString;
	match?: RecordIdString;
	status: string;
	updated?: IsoDateString;
	user?: RecordIdString;
};

export type MatchesRecord = {
	actual_start_time?: IsoDateString;
	court?: RecordIdString;
	created?: IsoDateString;
	creator?: RecordIdString;
	current_players_count?: number;
	end_time?: IsoDateString;
	id: string;
	max_players: number;
	scheduled_start_time: IsoDateString;
	sport_type?: string;
	status: string;
	updated?: IsoDateString;
};

export type UserSkillsRecord = {
	created?: IsoDateString;
	id: string;
	skill_level: string;
	sport_type: string;
	updated?: IsoDateString;
	user?: RecordIdString;
};

export type UsersRecord = {
	avatar?: string;
	created?: IsoDateString;
	email?: string;
	emailVisibility?: boolean;
	id: string;
	name?: string;
	password: string;
	tokenKey: string;
	updated?: IsoDateString;
	username: string;
	verified?: boolean;
};

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> &
	BaseSystemFields<Texpand>;
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> &
	BaseSystemFields<Texpand>;
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>;
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>;
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> &
	AuthSystemFields<Texpand>;
export type CourtsResponse<Texpand = unknown> = Required<CourtsRecord> & BaseSystemFields<Texpand>;
export type LocationsResponse<Texpand = unknown> = Required<LocationsRecord> &
	BaseSystemFields<Texpand>;
export type MatchParticipantsResponse<Texpand = unknown> = Required<MatchParticipantsRecord> &
	BaseSystemFields<Texpand>;
export type MatchesResponse<Texpand = unknown> = Required<MatchesRecord> &
	BaseSystemFields<Texpand>;
export type UserSkillsResponse<Texpand = unknown> = Required<UserSkillsRecord> &
	BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord;
	_externalAuths: ExternalauthsRecord;
	_mfas: MfasRecord;
	_otps: OtpsRecord;
	_superusers: SuperusersRecord;
	courts: CourtsRecord;
	locations: LocationsRecord;
	match_participants: MatchParticipantsRecord;
	matches: MatchesRecord;
	user_skills: UserSkillsRecord;
	users: UsersRecord;
};

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse;
	_externalAuths: ExternalauthsResponse;
	_mfas: MfasResponse;
	_otps: OtpsResponse;
	_superusers: SuperusersResponse;
	courts: CourtsResponse;
	locations: LocationsResponse;
	match_participants: MatchParticipantsResponse;
	matches: MatchesResponse;
	user_skills: UserSkillsResponse;
	users: UsersResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>;
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>;
	collection(idOrName: '_mfas'): RecordService<MfasResponse>;
	collection(idOrName: '_otps'): RecordService<OtpsResponse>;
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>;
	collection(idOrName: 'courts'): RecordService<CourtsResponse>;
	collection(idOrName: 'locations'): RecordService<LocationsResponse>;
	collection(idOrName: 'match_participants'): RecordService<MatchParticipantsResponse>;
	collection(idOrName: 'matches'): RecordService<MatchesResponse>;
	collection(idOrName: 'user_skills'): RecordService<UserSkillsResponse>;
	collection(idOrName: 'users'): RecordService<UsersResponse>;
};
