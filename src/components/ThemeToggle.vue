<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue';
    const darkTheme = 'mocha';
    const lightTheme = 'latte';
    const activeColor = 'fill-yellow';
    const inactiveColor = 'fill-overlay1';
    const highlightColor = 'fill-blue';
    const altHighlightColor = 'fill-sky';
    const resetSpacer = "mr-0";
    const resetFilled = "-mr-6";
    let article: HTMLElement | null;

    const theme = ref(lightTheme);
    const themePref = ref(false);
    const hovered = ref(false);
    const resetHovered = ref(false);
    const tapped = ref(false);
    const tapTimeout = ref();

    onMounted(() => {
        if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
            theme.value = localStorage.getItem("theme") === "dark" ? darkTheme : lightTheme;
            themePref.value = true;
        }
        else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            theme.value = darkTheme;
        }
        article = document.querySelector('article');
    });

    function toggleTheme(_e?: MouseEvent | null, save=true, newTheme?:string) {
        // in-case button was tapped
        tapped.value = false;
        clearTimeout(tapTimeout.value);

        if (!newTheme || newTheme !== theme.value) {
            document.documentElement.classList.toggle(darkTheme);
            document.documentElement.classList.toggle(lightTheme);
            if (article) article.classList.toggle('!prose-invert');
            theme.value = theme.value === darkTheme ? lightTheme : darkTheme;
        }
        
        if (save) {
            themePref.value = true;
            localStorage.setItem("theme", theme.value === darkTheme ? 'dark' : 'light');
        }   
    }

    function resetPref() {
        themePref.value = false;
        tapped.value = false; // in-case button was tapped
        clearTimeout(tapTimeout.value);
        let userDefault = window.matchMedia("(prefers-color-scheme: dark)").matches ? darkTheme : lightTheme;
        localStorage.removeItem("theme");
        if (userDefault !== theme.value) {
            toggleTheme(null, false);
        }
    }

    function handleTouch(_:TouchEvent|null,unTap=false) {
        hovered.value = false;
        resetHovered.value = false;
        if (!themePref.value && !unTap) {
            toggleTheme();
        }
        else if (tapped.value) {
            clearTimeout(tapTimeout.value);
            tapped.value = false;
            if (!unTap) toggleTheme();
        }
        else {
            tapped.value = true;
            tapTimeout.value = setTimeout(() => { tapped.value = false; }, 10000);
        }
    }

    const moonFullClass = computed(() => ([
        hovered.value ? inactiveColor : activeColor,
        { hidden: themePref.value === false || theme.value === lightTheme },
        "h-6",
        "w-6",
        "p-1",
    ]));

    const moonEmptyClass = computed(() => ([
        ((theme.value === darkTheme) !== hovered.value) && !resetHovered.value ? activeColor : inactiveColor,
        theme.value !== darkTheme || themePref.value ? 'hidden' : 'inline-block',
        theme.value === darkTheme && themePref.value ? 'sm:hidden' : 'sm:inline-block',
        "h-6",
        "w-6",
        "p-1",
    ]));

    const sunFullClass = computed(() => ([
        hovered.value ? inactiveColor : activeColor,
        { hidden: theme.value === darkTheme || themePref.value === false },
        "h-5",
        "w-5",
        "p-px",
    ]));

    const sunEmptyClass = computed(() => ([
        ((theme.value === lightTheme) !== hovered.value) && !resetHovered.value ? activeColor : inactiveColor,
        theme.value !== lightTheme || themePref.value ? 'hidden' : 'inline-block',
        theme.value === lightTheme && themePref.value ? 'sm:hidden' : 'sm:inline-block',
        "h-5",
        "w-5",
        "p-px",

    ]));
</script>
<template>
    <div :class="[hovered && themePref ? resetFilled : resetSpacer, {'ml-5': tapped, 'pl-1': (tapped && theme===darkTheme)}]" class="flex flex-1 justify-center items-center sm:bg-crust sm:border sm:border-surface0 rounded-full">
        <button @touchstart.prevent="handleTouch(null,false)" @mouseenter="!tapped && ((hovered=true) || (resetHovered=true))" @mouseleave="hovered=false" @click.prevent="toggleTheme" :class="{hidden: tapped}" class="flex flex-1 justify-center items-center rounded-full sm:pr-1 sm:bg-base">
            <svg :class="moonFullClass" viewBox="-4 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin">
                <path d='M12.253.335A10.086 10.086 0 0 0 8.768 8c0 4.632 3.068 8.528 7.232 9.665A9.555 9.555 0 0 1 9.742 20C4.362 20 0 15.523 0 10S4.362 0 9.742 0c.868 0 1.71.117 2.511.335z' />
            </svg>
            <svg :class="moonEmptyClass" viewBox="-4 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin">
                <path d='M2 10c0 4.43 3.478 8 7.742 8 .658 0 1.302-.085 1.922-.248-2.996-2.2-4.896-5.786-4.896-9.752 0-2.09.527-4.095 1.489-5.853C4.699 2.863 2 6.097 2 10zm6.768-2c0 4.632 3.068 8.528 7.232 9.665A9.555 9.555 0 0 1 9.742 20C4.362 20 0 15.523 0 10S4.362 0 9.742 0c.868 0 1.71.117 2.511.335A10.086 10.086 0 0 0 8.768 8z'/>
            </svg>
            <svg :class="sunFullClass" viewBox="-2 -1.5 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin">
                <path d='M10 15.565a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-15a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm-9-7h2a1 1 0 1 1 0 2H1a1 1 0 0 1 0-2zm16 0h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2zm.071-6.071a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM5.757 14.808a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM4.343 3.494l1.414 1.414a1 1 0 0 1-1.414 1.414L2.93 4.908a1 1 0 0 1 1.414-1.414zm11.314 11.314l1.414 1.414a1 1 0 0 1-1.414 1.414l-1.414-1.414a1 1 0 1 1 1.414-1.414z' />
            </svg>
            <svg :class="sunEmptyClass" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin">
                <path d='M10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-15a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zM1 9h2a1 1 0 1 1 0 2H1a1 1 0 0 1 0-2zm16 0h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2zm.071-6.071a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM5.757 14.243a1 1 0 0 1 0 1.414L4.343 17.07a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM4.343 2.929l1.414 1.414a1 1 0 0 1-1.414 1.414L2.93 4.343A1 1 0 0 1 4.343 2.93zm11.314 11.314l1.414 1.414a1 1 0 0 1-1.414 1.414l-1.414-1.414a1 1 0 1 1 1.414-1.414z'/>
            </svg>
        </button>
        <button @mouseenter="hovered=true" @mouseleave="hovered=false" v-show="hovered && themePref" class="flex flex-1 justify-center items-center rounded-full">
            <svg @click="resetPref" :class="[inactiveColor, `hover:${highlightColor}`]" class="h-5 w-5 p-px mr-1" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin">
                <path d='M10 18c.112 0 .112-5.333 0-16a8 8 0 1 0 0 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z' />
            </svg>
        </button>
        <div v-if="tapped" class="relative">
            <div class="absolute -left-7 -top-4 opacity-90 backdrop-blur-xl bg-mantle rounded-full border border-flamingo">
                <div class="flex flex-1 flex-col justify-center gap-y-2">
                    <button class="justify-center" @touchstart.prevent="handleTouch(null,true)">
                        <svg :class="theme===darkTheme ? `mx-1 mt-1` : `mx-1 mt-1`" class="h-6 w-6 fill-red" viewBox="-6 -6 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin">
                            <path d='M7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z' />
                        </svg>
                    </button>
                    <hr class="border-flamingo" />
                    <button @touchstart="toggleTheme(null,true,darkTheme)">
                        <svg :class="[altHighlightColor, `h-6`, `w-6`, `m-1`]" viewBox="-4 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin">
                            <path d='M12.253.335A10.086 10.086 0 0 0 8.768 8c0 4.632 3.068 8.528 7.232 9.665A9.555 9.555 0 0 1 9.742 20C4.362 20 0 15.523 0 10S4.362 0 9.742 0c.868 0 1.71.117 2.511.335z' />
                        </svg>
                    </button>
                    <button @touchstart="toggleTheme(null,true,lightTheme)">
                        <svg :class="[activeColor, `h-6`, `w-6`, `m-1`,]" viewBox="-2 -1.5 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin">
                            <path d='M10 15.565a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-15a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm-9-7h2a1 1 0 1 1 0 2H1a1 1 0 0 1 0-2zm16 0h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2zm.071-6.071a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM5.757 14.808a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM4.343 3.494l1.414 1.414a1 1 0 0 1-1.414 1.414L2.93 4.908a1 1 0 0 1 1.414-1.414zm11.314 11.314l1.414 1.414a1 1 0 0 1-1.414 1.414l-1.414-1.414a1 1 0 1 1 1.414-1.414z' />
                        </svg>
                    </button>
                    <button @touchstart="resetPref" :class="highlightColor">
                        <svg class="h-6 w-6 m-1" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin">
                            <path d='M10 18c.112 0 .112-5.333 0-16a8 8 0 1 0 0 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z' />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>