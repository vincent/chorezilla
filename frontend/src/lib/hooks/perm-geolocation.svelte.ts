import { writable } from 'svelte/store';

export const geoLocationStatus = writable<"unknown" | "prompt" | "error" | "denied" | "granted">("unknown")
export const geoLocation = writable<object|undefined>(undefined)

function getGeoLocation() {
  if (!('permissions' in navigator)) return Promise.reject("no permissions")
  return navigator.permissions
    .query({ name: "geolocation" })
    .then(result => {
      geoLocationStatus.set(result.state);

      if (result.state === "prompt") {
        geoLocationStatus.set(result.state);

        navigator.geolocation.getCurrentPosition(
          position => {
            geoLocationStatus.set("granted");
            geoLocation.set(position);
          },
          _ => {
            geoLocationStatus.set("error");
            geoLocation.set(undefined);
          },
          { maximumAge: 30_000 },
        );
      }
      result.addEventListener("change", () => geoLocationStatus.set(result.state));
    });
}


export function initGeoLocation() {
  geoLocationStatus.set("unknown");
  geoLocation.set(undefined);

  getGeoLocation()
    .catch((e) => console.error('cannot use get geolocation'));
}