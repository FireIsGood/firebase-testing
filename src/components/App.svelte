<script lang="ts">
    import { onAuthStateChanged, type User } from "firebase/auth";
    // Load the database
    import "../scripts/firebase";
    import { auth, signIn, signOut } from "../scripts/auth";
    // Components
    import Cart from "./Cart.svelte";
    import LoadingCover from "./LoadingCover.svelte";

    // Wait for auth to load
    let loaded = false;

    // Log in state
    let currentUser: User | null = null;
    $: loggedIn = currentUser !== null;

    let userImage = "";
    onAuthStateChanged(auth, (user) => {
        loaded = true;
        currentUser = user;
        loggedIn = user !== null;
        userImage = user?.photoURL ?? "";
    });
</script>

<LoadingCover {loaded}>
    <slot name="spinner" slot="spinner" />
</LoadingCover>

<header>
    {#if loggedIn}
        <button class="sign-out button-alt" on:click={signOut}>Sign Out</button>
        <div class="username">{currentUser?.displayName}</div>
        <div class="profile-picture">
            <img src={userImage} alt="" />
        </div>
    {/if}
</header>

<main>
    <div class="icon">
        <slot name="icon" />
    </div>
    {#if loggedIn}
        <Cart>
            <slot name="spinner" slot="spinner" />
        </Cart>
    {:else}
        <p class="center">Sign in to continue</p>
        <button class="button-alt" on:click={signIn}>Sign In</button>
    {/if}
</main>

<style>
    .username {
        font-family: var(--font-title);
        font-weight: 500;
    }

    .profile-picture {
        width: 50px;
        aspect-ratio: 1 / 1;
        border-radius: var(--radius-medium);
        overflow: clip;
        user-select: none;
    }
    .profile-picture > img {
        -webkit-user-drag: none;
        user-select: none;
        object-fit: cover;
    }

    .sign-out {
        font-size: 0.9em;
        padding: 0.5em;
        margin-inline-end: auto;
    }

    /* icon styles */
    .icon {
        width: min(400px, 65%);
        aspect-ratio: 1 / 1;
        user-select: none;
        margin-inline: auto;
    }
</style>
