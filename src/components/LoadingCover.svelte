<script lang="ts">
    export let loaded: boolean;
</script>

<div class="loading-cover" class:loaded>
    <div class="loading-icon">
        <slot name="spinner" />
    </div>
</div>

<style>
    .loading-cover {
        position: absolute;
        display: grid;
        place-items: center;
        inset: 0;
        background-color: var(--background-primary);
        z-index: 1;
        pointer-events: none;
        opacity: 1;
    }

    .loading-cover.loaded {
        animation: hide-cover 200ms ease-out forwards;
    }

    @keyframes hide-cover {
        to {
            opacity: 0;
            display: none;
        }
    }

    .loading-icon {
        max-width: 50%;
    }
</style>
