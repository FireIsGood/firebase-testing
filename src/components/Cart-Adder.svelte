<script lang="ts">
    import { database } from "../scripts/util";
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
        let cartItemNames = cartItems.map((i) => i.value);

        const inputExists = item === "";
        const alreadyInCart: boolean = cartItemNames.includes(item);
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
        const serverItems = Object.entries(snapshotOrEmpty).map((entry) => {
            return { key: entry[0], value: entry[1] };
        });
        cartItems = serverItems;
    });

    // Stop the form
    function handleForm(e: Event) {
        e.preventDefault();
    }
</script>

<div class="cart-container">
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
    <ul class="cart">
        {#each cartItems as { key, value }}
            <li>
                <button on:click={() => handleDelete(key)}
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
</div>

<style>
    /* Default style reset */
    .cart-container {
        margin: 1rem;
    }
    .cart-container > * + * {
        margin-top: 1rem;
    }

    .inputs {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

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

    /* Button style */
    .cart li > button {
        position: relative;
        flex-grow: 1;
        text-align: center;
        padding: 0.5em 1em;
        background-color: var(--chip-bg);
        color: var(--chip-color);
        box-shadow: var(--shadow-light);
        border-radius: var(--radius-small);
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
