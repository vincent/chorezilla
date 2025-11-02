<script lang="ts">
	import PercentOff1 from '$lib/components/icons/50-percent-off-1.svg.svelte';
	import PercentOff2 from '$lib/components/icons/50-percent-off-2.svg.svelte';
	import PercentOff3 from '$lib/components/icons/50-percent-off-3.svg.svelte';
	import PercentOff4 from '$lib/components/icons/50-percent-off-4.svg.svelte';
	import Accommodation from '$lib/components/icons/accommodation-2.svg.svelte';
	import AirTicket from '$lib/components/icons/air-ticket-2.svg.svelte';
	import AlienGrayJunk from '$lib/components/icons/alien-gray-junk.svg.svelte';
	import AlienGrayLineDrawing from '$lib/components/icons/alien-gray-line-drawing.svg.svelte';
	import AncientGreekHelmet from '$lib/components/icons/ancient-greek-helmet-1.svg.svelte';
	import AncientGreekHelmet3 from '$lib/components/icons/ancient-greek-helmet-3.svg.svelte';
	import AngryMagnolia from '$lib/components/icons/angry-magnolia-2.svg.svelte';
	import AngryMagnolia4 from '$lib/components/icons/angry-magnolia-4.svg.svelte';
	import Applause from '$lib/components/icons/applause-1.svg.svelte';
	import Approved from '$lib/components/icons/approved2.svg.svelte';
	import ArabicSword from '$lib/components/icons/arabic-sword.svg.svelte';
	import Arrow from '$lib/components/icons/arrow.svg.svelte';
	import AtomicBomb from '$lib/components/icons/atomic-bomb.svg.svelte';
	import Auction from '$lib/components/icons/auction-4.svg.svelte';
	import AuctionFree1 from '$lib/components/icons/auction-free-1.svg.svelte';
	import AuctionFree3 from '$lib/components/icons/auction-free-3.svg.svelte';
	import Award from '$lib/components/icons/award.svg.svelte';
	import Ax from '$lib/components/icons/ax.svg.svelte';
	import Barbecue1 from '$lib/components/icons/barbecue-1.svg.svelte';
	import Barbecue4 from '$lib/components/icons/barbecue-4.svg.svelte';
	import BasketFreeMaterial from '$lib/components/icons/basket-free-material.svg.svelte';
	import Basket from '$lib/components/icons/basket.svg.svelte';
	import Bath from '$lib/components/icons/bath-1.svg.svelte';
	import BathFree from '$lib/components/icons/bath-free-3.svg.svelte';
	import Bathtub from '$lib/components/icons/bathtub.svg.svelte';
	import BatteryFree from '$lib/components/icons/battery-free.svg.svelte';
	import BatteryPart from '$lib/components/icons/battery-part-2.svg.svelte';
	import Battle from '$lib/components/icons/battle.svg.svelte';
	import BeachBall from '$lib/components/icons/beach-ball.svg.svelte';
	import BeachUmbrella1 from '$lib/components/icons/beach-umbrella-1.svg.svelte';
	import BeachUmbrella2 from '$lib/components/icons/beach-umbrella-2.svg.svelte';
	import Bed3 from '$lib/components/icons/bed-3.svg.svelte';
	import Bed4 from '$lib/components/icons/bed-4.svg.svelte';
	import Bed6 from '$lib/components/icons/bed-6.svg.svelte';
	import Bed9 from '$lib/components/icons/bed-9.svg.svelte';
	import BedFree2 from '$lib/components/icons/bed-free-2.svg.svelte';
	import BedFree5 from '$lib/components/icons/bed-free-5.svg.svelte';
	import BedFree8 from '$lib/components/icons/bed-free-8.svg.svelte';
	import BewareOfFragileItems3 from '$lib/components/icons/beware-of-fragile-items-3.svg.svelte';
	import BewareOfFragileItems5 from '$lib/components/icons/beware-of-fragile-items-5.svg.svelte';
	import BewareOfFragileItems6 from '$lib/components/icons/beware-of-fragile-items-6.svg.svelte';
	import BombOnPalm from '$lib/components/icons/bomb-on-palm.svg.svelte';
	import BoneLineDrawingThatCanBeUsedForFree from '$lib/components/icons/bone-line-drawing-that-can-be-used-for-free.svg.svelte';
	import Boomerang from '$lib/components/icons/boomerang-2.svg.svelte';
	import BottleCap from '$lib/components/icons/bottle-cap-1.svg.svelte';
	import BottleCapFreeMaterial from '$lib/components/icons/bottle-cap-free-material-2.svg.svelte';
	import BowAndArrow from '$lib/components/icons/bow-and-arrow.svg.svelte';
	import Box from '$lib/components/icons/box-2.svg.svelte';
	import BoxFreeMaterial from '$lib/components/icons/box-free-material-3.svg.svelte';
	import BoxFree from '$lib/components/icons/box-free.svg.svelte';
	import Bubble from '$lib/components/icons/bubble-3.svg.svelte';
	import BubbleFree from '$lib/components/icons/bubble-free-1.svg.svelte';
	import BulletFree1 from '$lib/components/icons/bullet-free-1.svg.svelte';
	import BulletFree2 from '$lib/components/icons/bullet-free-2.svg.svelte';
	import BulletFree3 from '$lib/components/icons/bullet-free-3.svg.svelte';
	import BulletFree5 from '$lib/components/icons/bullet-free-5.svg.svelte';
	import Burr from '$lib/components/icons/burr.svg.svelte';
	import Cannon from '$lib/components/icons/cannon-2.svg.svelte';
	import CannonFree from '$lib/components/icons/cannon-free-1.svg.svelte';
	import CardboardBox11 from '$lib/components/icons/cardboard-box-11.svg.svelte';
	import CardboardBox12 from '$lib/components/icons/cardboard-box-12.svg.svelte';
	import CardboardBox3 from '$lib/components/icons/cardboard-box-3.svg.svelte';
	import CardboardBox9 from '$lib/components/icons/cardboard-box-9.svg.svelte';
	import CardboardBoxFree from '$lib/components/icons/cardboard-box-free-7.svg.svelte';
	import CardboardBoxMaterial from '$lib/components/icons/cardboard-box-material.svg.svelte';
	import Chair3 from '$lib/components/icons/chair-3.svg.svelte';
	import Chair5 from '$lib/components/icons/chair-5.svg.svelte';
	import Chair6 from '$lib/components/icons/chair-6.svg.svelte';
	import Chair7 from '$lib/components/icons/chair-7.svg.svelte';
	import Chair9 from '$lib/components/icons/chair-9.svg.svelte';
	import ChairFree1 from '$lib/components/icons/chair-free-1.svg.svelte';
	import ChairFree2 from '$lib/components/icons/chair-free-2.svg.svelte';
	import ChairFree8 from '$lib/components/icons/chair-free-8.svg.svelte';
	import ClayPipeFree from '$lib/components/icons/clay-pipe-free.svg.svelte';
	import ClayPot1 from '$lib/components/icons/clay-pot-1.svg.svelte';
	import ClayPot2 from '$lib/components/icons/clay-pot-2.svg.svelte';
	import ClayPot3 from '$lib/components/icons/clay-pot-3.svg.svelte';
	import CloudPictogram1 from '$lib/components/icons/cloud-pictogram-1.svg.svelte';
	import CloudPictogram2 from '$lib/components/icons/cloud-pictogram-2.svg.svelte';
	import CloudyWeather from '$lib/components/icons/cloudy-weather-2.svg.svelte';
	import CloudyWeatherMaterial from '$lib/components/icons/cloudy-weather-material.svg.svelte';
	import CoinToss1 from '$lib/components/icons/coin-toss-1.svg.svelte';
	import CoinToss3 from '$lib/components/icons/coin-toss-3.svg.svelte';
	import CoinToss4 from '$lib/components/icons/coin-toss-4.svg.svelte';
	import CommentFree from '$lib/components/icons/comment-free.svg.svelte';
	import CommentMaterial from '$lib/components/icons/comment-material-2.svg.svelte';
	import Crib from '$lib/components/icons/crib.svg.svelte';
	import CrossedAx from '$lib/components/icons/crossed-ax.svg.svelte';
	import Cube from '$lib/components/icons/cube-1.svg.svelte';
	import CubeFreeMaterial from '$lib/components/icons/cube-free-material-2.svg.svelte';
	import CurtainAndWindowPictogram from '$lib/components/icons/curtain-and-window-pictogram.svg.svelte';
	import CuteMountain from '$lib/components/icons/cute-mountain-2.svg.svelte';
	import CuteSkull from '$lib/components/icons/cute-skull.svg.svelte';
	import DangerousGoods from '$lib/components/icons/dangerous-goods.svg.svelte';
	import Delivery from '$lib/components/icons/delivery.svg.svelte';

	let { icon, className = '' } = $props();
</script>

<div class={className}>
	{#if icon === '50-percent-off-1'}
		<PercentOff1 />
	{:else if icon === '50-percent-off-2'}
		<PercentOff2 />
	{:else if icon === '50-percent-off-3'}
		<PercentOff3 />
	{:else if icon === '50-percent-off-4'}
		<PercentOff4 />
	{:else if icon === 'accommodation-2'}
		<Accommodation />
	{:else if icon === 'air-ticket-2'}
		<AirTicket />
	{:else if icon === 'alien-gray-junk'}
		<AlienGrayJunk />
	{:else if icon === 'alien-gray-line-drawing'}
		<AlienGrayLineDrawing />
	{:else if icon === 'ancient-greek-helmet-1'}
		<AncientGreekHelmet />
	{:else if icon === 'ancient-greek-helmet-3'}
		<AncientGreekHelmet3 />
	{:else if icon === 'angry-magnolia-2'}
		<AngryMagnolia />
	{:else if icon === 'angry-magnolia-4'}
		<AngryMagnolia4 />
	{:else if icon === 'applause-1'}
		<Applause />
	{:else if icon === 'approved2'}
		<Approved />
	{:else if icon === 'arabic-sword'}
		<ArabicSword />
	{:else if icon === 'arrow'}
		<Arrow />
	{:else if icon === 'atomic-bomb'}
		<AtomicBomb />
	{:else if icon === 'auction-4'}
		<Auction />
	{:else if icon === 'auction-free-1'}
		<AuctionFree1 />
	{:else if icon === 'auction-free-3'}
		<AuctionFree3 />
	{:else if icon === 'award'}
		<Award />
	{:else if icon === 'ax'}
		<Ax />
	{:else if icon === 'barbecue-1'}
		<Barbecue1 />
	{:else if icon === 'barbecue-4'}
		<Barbecue4 />
	{:else if icon === 'basket-free-material'}
		<BasketFreeMaterial />
	{:else if icon === 'basket'}
		<Basket />
	{:else if icon === 'bath-1'}
		<Bath />
	{:else if icon === 'bath-free-3'}
		<BathFree />
	{:else if icon === 'bathtub'}
		<Bathtub />
	{:else if icon === 'battery-free'}
		<BatteryFree />
	{:else if icon === 'battery-part-2'}
		<BatteryPart />
	{:else if icon === 'battle'}
		<Battle />
	{:else if icon === 'beach-ball'}
		<BeachBall />
	{:else if icon === 'beach-umbrella-1'}
		<BeachUmbrella1 />
	{:else if icon === 'beach-umbrella-2'}
		<BeachUmbrella2 />
	{:else if icon === 'bed-3'}
		<Bed3 />
	{:else if icon === 'bed-4'}
		<Bed4 />
	{:else if icon === 'bed-6'}
		<Bed6 />
	{:else if icon === 'bed-9'}
		<Bed9 />
	{:else if icon === 'bed-free-2'}
		<BedFree2 />
	{:else if icon === 'bed-free-5'}
		<BedFree5 />
	{:else if icon === 'bed-free-8'}
		<BedFree8 />
	{:else if icon === 'beware-of-fragile-items-3'}
		<BewareOfFragileItems3 />
	{:else if icon === 'beware-of-fragile-items-5'}
		<BewareOfFragileItems5 />
	{:else if icon === 'beware-of-fragile-items-6'}
		<BewareOfFragileItems6 />
	{:else if icon === 'bomb-on-palm'}
		<BombOnPalm />
	{:else if icon === 'bone-line-drawing-that-can-be-used-for-free'}
		<BoneLineDrawingThatCanBeUsedForFree />
	{:else if icon === 'boomerang-2'}
		<Boomerang />
	{:else if icon === 'bottle-cap-1'}
		<BottleCap />
	{:else if icon === 'bottle-cap-free-material-2'}
		<BottleCapFreeMaterial />
	{:else if icon === 'bow-and-arrow'}
		<BowAndArrow />
	{:else if icon === 'box-2'}
		<Box />
	{:else if icon === 'box-free-material-3'}
		<BoxFreeMaterial />
	{:else if icon === 'box-free'}
		<BoxFree />
	{:else if icon === 'bubble-3'}
		<Bubble />
	{:else if icon === 'bubble-free-1'}
		<BubbleFree />
	{:else if icon === 'bullet-free-1'}
		<BulletFree1 />
	{:else if icon === 'bullet-free-2'}
		<BulletFree2 />
	{:else if icon === 'bullet-free-3'}
		<BulletFree3 />
	{:else if icon === 'bullet-free-5'}
		<BulletFree5 />
	{:else if icon === 'burr'}
		<Burr />
	{:else if icon === 'cannon-2'}
		<Cannon />
	{:else if icon === 'cannon-free-1'}
		<CannonFree />
	{:else if icon === 'cardboard-box-11'}
		<CardboardBox11 />
	{:else if icon === 'cardboard-box-12'}
		<CardboardBox12 />
	{:else if icon === 'cardboard-box-3'}
		<CardboardBox3 />
	{:else if icon === 'cardboard-box-9'}
		<CardboardBox9 />
	{:else if icon === 'cardboard-box-free-7'}
		<CardboardBoxFree />
	{:else if icon === 'cardboard-box-material'}
		<CardboardBoxMaterial />
	{:else if icon === 'chair-3'}
		<Chair3 />
	{:else if icon === 'chair-5'}
		<Chair5 />
	{:else if icon === 'chair-6'}
		<Chair6 />
	{:else if icon === 'chair-7'}
		<Chair7 />
	{:else if icon === 'chair-9'}
		<Chair9 />
	{:else if icon === 'chair-free-1'}
		<ChairFree1 />
	{:else if icon === 'chair-free-2'}
		<ChairFree2 />
	{:else if icon === 'chair-free-8'}
		<ChairFree8 />
	{:else if icon === 'clay-pipe-free'}
		<ClayPipeFree />
	{:else if icon === 'clay-pot-1'}
		<ClayPot1 />
	{:else if icon === 'clay-pot-2'}
		<ClayPot2 />
	{:else if icon === 'clay-pot-3'}
		<ClayPot3 />
	{:else if icon === 'cloud-pictogram-1'}
		<CloudPictogram1 />
	{:else if icon === 'cloud-pictogram-2'}
		<CloudPictogram2 />
	{:else if icon === 'cloudy-weather-2'}
		<CloudyWeather />
	{:else if icon === 'cloudy-weather-material'}
		<CloudyWeatherMaterial />
	{:else if icon === 'coin-toss-1'}
		<CoinToss1 />
	{:else if icon === 'coin-toss-3'}
		<CoinToss3 />
	{:else if icon === 'coin-toss-4'}
		<CoinToss4 />
	{:else if icon === 'comment-free'}
		<CommentFree />
	{:else if icon === 'comment-material-2'}
		<CommentMaterial />
	{:else if icon === 'crib'}
		<Crib />
	{:else if icon === 'crossed-ax'}
		<CrossedAx />
	{:else if icon === 'cube-1'}
		<Cube />
	{:else if icon === 'cube-free-material-2'}
		<CubeFreeMaterial />
	{:else if icon === 'curtain-and-window-pictogram'}
		<CurtainAndWindowPictogram />
	{:else if icon === 'cute-mountain-2'}
		<CuteMountain />
	{:else if icon === 'cute-skull'}
		<CuteSkull />
	{:else if icon === 'dangerous-goods'}
		<DangerousGoods />
	{:else if icon === 'delivery'}
		<Delivery />
	{:else}
		<BoxFree />
	{/if}
</div>
