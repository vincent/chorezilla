import { geoLocationStatus, initGeoLocation } from './perm-geolocation.svelte';
import { initMatchNotifications } from './perm-notifications.svelte';
import { goto } from '$app/navigation';
import { get } from 'svelte/store';

export * from './perm-notifications.svelte';
export * from './perm-geolocation.svelte';

export function redirectIfNoGeoLocation(redirectUrl: string) {
  if (get(geoLocationStatus) !== "granted") {
    localStorage.setItem("redirect", redirectUrl);
    goto(`/welcome`);
  }
}

export function waitForGeolocation(vapidPublicKey: string, redirectUrl: string) {
  setTimeout(() => redirectIfNoGeoLocation(redirectUrl), 5_000);
  initMatchNotifications(vapidPublicKey);
  initGeoLocation();
}