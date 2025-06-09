import { geoLocationStatus } from './perm-geolocation.svelte';
import { goto } from '$app/navigation';
import { get } from 'svelte/store';

export * from './perm-notifications.svelte';
export * from './perm-geolocation.svelte';

export function redirectIfNoGeoLocation(redirectUrl: string) {
    if (get(geoLocationStatus) !== "granted") goto(`/welcome/?redirect_url=${redirectUrl}`)
}