import { toast } from 'svelte-sonner';

export const toasts = {
	info<T>(message: string) {
		return (t?: T) => {
			toast.info(message);
			return t;
		};
	},

	success<T>(message: string) {
		return (t?: T) => {
			toast.success(message);
			return t;
		};
	},

	warning<T>(message: string) {
		return (t?: T) => {
			toast.warning(message);
			return t;
		};
	},

	error<T>(message = 'Oops, there was an issue') {
		return (t?: T) => {
			toast.error(message);
			throw t;
		};
	}
};
