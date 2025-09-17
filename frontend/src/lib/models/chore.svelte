<script lang="ts" module>
	export type Chore = {
		id: string;
		title: string;
		location: string;
		roomId: string;
		due: string;
		description?: string;

		icon?: string;
		iconBg?: string;
		iconColor?: string;
	};
</script>
