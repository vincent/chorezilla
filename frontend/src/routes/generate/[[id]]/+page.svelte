<script lang="ts">
	import { page } from "$app/state";
    import QRCode from "easyqrcodejs";
	import { onMount } from "svelte";

    const withUrl = false;
    const defaultCount = 8;
    const qr = {
        // logo: "/sport.png",
        quietZone: 10,
        height: 200,
        width: 200,
    }

    const uuidv4 = () => 'xxxxxx4xxxyxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    })

    let { data } = $props();
    let imgs = $state<HTMLDivElement>();

    const container = (child: HTMLElement, text?: string) => {
        const div = document.createElement("div")
        const tit = document.createElement("div")
        div.style.border = "2px solid #eee";
        tit.style.fontFamily = "Helvetica";
        tit.style.letterSpacing = "2px";
        tit.style.textAlign = "center";
        tit.style.fontWeight = "bold";
        tit.style.fontSize = "32px";
        tit.innerText = "¿Jugamos?";
        tit.style.color = "black";
        div.appendChild(tit);

        div.appendChild(child);

        if (text) {
            const foot = document.createElement("div")
            div.style.border = "1px solid #eee";
            foot.style.textAlign = "center";
            foot.style.fontWeight = "bold";
            foot.style.fontSize = "12px";
            foot.style.color = "black";
            foot.innerText = text;
            div.appendChild(foot);
        }

        return div;
    }

    function ids(count: string | number) {
        const c = isNaN(+count) ? defaultCount : +count;
        return new Array(c).fill(0).map(_ => page.params.id || uuidv4())
    }

    function text(id: string | number) {
        return `${data.config.site.url}/join/${id}`
    }

    function addQRcode(text: string) {
        const img = document.createElement("div")
        const div = container(img, withUrl ? text : undefined)
        imgs?.appendChild(div)
        return new QRCode(img, {...qr, text})
    }

    onMount(() => {
        let asked = page.url.searchParams.get('count') || defaultCount;
        ids(asked).map(text).forEach(text => addQRcode(text));
    })
</script>

<div class="flex flex-wrap" bind:this={imgs} ></div>

<style>
    @media print 
    {
        @page { margin: 0; }
        :global(body)  { margin: 2cm; }
    }
    :global(body) {
        background-color: white;
    }
    :global(.nav-header) {
        display: none;
    }
</style>