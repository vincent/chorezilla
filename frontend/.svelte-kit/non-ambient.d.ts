
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/chores" | "/chores/add" | "/chores/[id]" | "/chores/[id]/edit" | "/login" | "/people" | "/people/add" | "/people/[id]" | "/people/[id]/edit" | "/rooms" | "/rooms/add" | "/rooms/[id]" | "/rooms/[id]/chores" | "/rooms/[id]/edit" | "/settings" | "/signup";
		RouteParams(): {
			"/chores/[id]": { id: string };
			"/chores/[id]/edit": { id: string };
			"/people/[id]": { id: string };
			"/people/[id]/edit": { id: string };
			"/rooms/[id]": { id: string };
			"/rooms/[id]/chores": { id: string };
			"/rooms/[id]/edit": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/chores": { id?: string };
			"/chores/add": Record<string, never>;
			"/chores/[id]": { id: string };
			"/chores/[id]/edit": { id: string };
			"/login": Record<string, never>;
			"/people": { id?: string };
			"/people/add": Record<string, never>;
			"/people/[id]": { id: string };
			"/people/[id]/edit": { id: string };
			"/rooms": { id?: string };
			"/rooms/add": Record<string, never>;
			"/rooms/[id]": { id: string };
			"/rooms/[id]/chores": { id: string };
			"/rooms/[id]/edit": { id: string };
			"/settings": Record<string, never>;
			"/signup": Record<string, never>
		};
		Pathname(): "/" | "/chores" | "/chores/" | "/chores/add" | "/chores/add/" | `/chores/${string}` & {} | `/chores/${string}/` & {} | `/chores/${string}/edit` & {} | `/chores/${string}/edit/` & {} | "/login" | "/login/" | "/people" | "/people/" | "/people/add" | "/people/add/" | `/people/${string}` & {} | `/people/${string}/` & {} | `/people/${string}/edit` & {} | `/people/${string}/edit/` & {} | "/rooms" | "/rooms/" | "/rooms/add" | "/rooms/add/" | `/rooms/${string}` & {} | `/rooms/${string}/` & {} | `/rooms/${string}/chores` & {} | `/rooms/${string}/chores/` & {} | `/rooms/${string}/edit` & {} | `/rooms/${string}/edit/` & {} | "/settings" | "/settings/" | "/signup" | "/signup/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}