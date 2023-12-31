<script lang="ts">
    import { database } from "../scripts/firebase";
    import {
        ref,
        push,
        remove,
        onValue,
        type DataSnapshot,
    } from "firebase/database";
    const itemsInCart = ref(database, "items");

    type CartItem = {
        key: string;
        value: string;
    };

    // Cart stuff
    let cartItems: CartItem[] = [];
    let item: string = "";

    function handleNewItem() {
        const itemClean = item.trim();
        let cartItemNames = cartItems.map((i) => i.value);

        const inputExists = itemClean === "";
        const alreadyInCart: boolean = cartItemNames.includes(itemClean);
        if (inputExists || alreadyInCart) {
            item = "";
            return;
        }

        push(itemsInCart, item);
        item = "";
    }

    function handleDelete(key: string) {
        const locationInDatabase = ref(database, `items/${key}`);
        remove(locationInDatabase);
    }

    // Updating live
    onValue(itemsInCart, (snapshot: DataSnapshot | null) => {
        const snapshotOrEmpty: object = snapshot?.val() ?? {};
        const serverItems = Object.entries(snapshotOrEmpty)
            .map((entry) => {
                return { key: entry[0], value: entry[1] };
            })
            .toReversed();
        cartItems = serverItems;
    });

    function handleForm(e: Event) {
        e.preventDefault();
    }
</script>

<form class="inputs" action="" on:submit={handleForm}>
    <input
        bind:value={item}
        type="text"
        id="input-field"
        placeholder="Bread"
        autocomplete="off"
    />
    <input
        type="submit"
        value="Add to cart"
        id="add-button"
        on:click={handleNewItem}
    />
</form>

{#if cartItems.length === 0}
    <div class="loading-icon">
        <slot name="spinner" />
    </div>
{/if}

<ul class="cart">
    {#each cartItems as { key, value }, i (key)}
        <li>
            <button style={`--offset: ${i}`} on:click={() => handleDelete(key)}
                >{value}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-x"
                    ><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
                >
            </button>
        </li>
    {/each}
</ul>

<style>
    /* Default style reset */
    ul {
        margin: 0;
    }

    /* Form style */
    .inputs {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: min(600px, 100%);
        margin-inline: auto;
        margin-bottom: 2rem;
    }

    /* Loading icon style */
    .loading-icon {
        max-width: 50%;
        margin-inline: auto;
    }

    /* Cart style */
    .cart {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        padding: 0;
        list-style: none;
    }
    .cart li {
        display: contents;
    }

    /* Cart item button style */
    .cart li > button {
        position: relative;
        flex-grow: 1;
        text-align: center;
        padding: 0.5em;
        background-color: var(--chip-bg);
        color: var(--chip-color);
        box-shadow: var(--shadow-light);
        border-radius: var(--radius-small);
        animation: cart-item-in ease-in-out forwards;
        animation-duration: 250ms;
        animation-delay: calc(35ms * var(--offset, 0));
        opacity: 0;
    }

    @keyframes cart-item-in {
        from {
            opacity: 0;
            translate: 0 10px;
        }
        to {
            opacity: 1;
            translate: 0 0;
        }
    }

    /* Delete icon style */
    .cart li button svg {
        position: absolute;
        top: 7px;
        right: 7px;
        color: var(--chip-delete);
        opacity: 0;
        transition: opacity 70ms ease-in;
    }

    /* Hover style */
    .cart li > button:hover {
        background-color: var(--chip-bg-hover);
    }
    .cart li > button:hover > svg {
        opacity: 1;
    }
</style>
