/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	Chores = "chores",
	HouseholdMembers = "household_members",
	Households = "households",
	Rooms = "rooms",
	UserSubscriptions = "user_subscriptions",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T }

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
} & ExpandType<T>

export type AuthSystemFields<T = unknown> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export type ChoresRecord = {
	approved_at?: IsoDateString
	approved_by?: RecordIdString
	assigned_users?: RecordIdString[]
	created?: IsoDateString
	created_by: RecordIdString
	description?: string
	frequency: string
	household: RecordIdString
	id: string
	last_completed?: IsoDateString
	name: string
	updated?: IsoDateString
}

export type HouseholdMembersRecord = {
	created?: IsoDateString
	household: RecordIdString
	id: string
	role?: string
	updated?: IsoDateString
	user: RecordIdString
}

export type HouseholdsRecord = {
	created?: IsoDateString
	id: string
	name: string
	updated?: IsoDateString
}

export type RoomsRecord = {
	created?: IsoDateString
	description?: string
	household: RecordIdString
	icon: string
	icon_color: string
	id: string
	location?: string
	name: string
	updated?: IsoDateString
}

export type UserSubscriptionsRecord<Tsubscription = unknown> = {
	created?: IsoDateString
	id: string
	subscription: null | Tsubscription
	updated?: IsoDateString
	user?: RecordIdString
}

export type UsersRecord = {
	avatar?: string
	avatarColor?: string
	created?: IsoDateString
	email?: string
	emailVisibility?: boolean
	households?: RecordIdString[]
	id: string
	name?: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	username: string
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type ChoresResponse<Texpand = unknown> = Required<ChoresRecord> & BaseSystemFields<Texpand>
export type HouseholdMembersResponse<Texpand = unknown> = Required<HouseholdMembersRecord> & BaseSystemFields<Texpand>
export type HouseholdsResponse<Texpand = unknown> = Required<HouseholdsRecord> & BaseSystemFields<Texpand>
export type RoomsResponse<Texpand = unknown> = Required<RoomsRecord> & BaseSystemFields<Texpand>
export type UserSubscriptionsResponse<Tsubscription = unknown, Texpand = unknown> = Required<UserSubscriptionsRecord<Tsubscription>> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	chores: ChoresRecord
	household_members: HouseholdMembersRecord
	households: HouseholdsRecord
	rooms: RoomsRecord
	user_subscriptions: UserSubscriptionsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	chores: ChoresResponse
	household_members: HouseholdMembersResponse
	households: HouseholdsResponse
	rooms: RoomsResponse
	user_subscriptions: UserSubscriptionsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'chores'): RecordService<ChoresResponse>
	collection(idOrName: 'household_members'): RecordService<HouseholdMembersResponse>
	collection(idOrName: 'households'): RecordService<HouseholdsResponse>
	collection(idOrName: 'rooms'): RecordService<RoomsResponse>
	collection(idOrName: 'user_subscriptions'): RecordService<UserSubscriptionsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
