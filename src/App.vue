<script setup lang="ts">
import { GAME_STATES, BOARD_SIZES } from './constants';
import { makeCard, shuffle } from './utils';
import Card from './Card.vue';

const boardSize = ref<BoardSize>(BOARD_SIZES[0].value);
const state = ref<GameState>(GAME_STATES.CHOOSING_SIZE);

const deck = ref<Card[]>([]);

const onSubmit = () => {
  state.value = GAME_STATES.PLAYING;
  const halfDeck = Array.from(
    { length: (boardSize.value.w * boardSize.value.h) / 2 },
    (_, i) => makeCard(i)
  );

  deck.value = shuffle([...halfDeck, ...halfDeck]);
};

const revealedCards = ref<number[]>([]);
const selectedCards = ref<number[]>([]);
const tries = ref(0);
const canSelect = ref(true);

const isRevealed = (index: number) =>
  revealedCards.value.includes(index) || selectedCards.value.includes(index);

const onCardClick = (cardIndex: number) => {
  if (!canSelect.value) return;
  if (revealedCards.value.includes(cardIndex)) return;
  if (selectedCards.value.includes(cardIndex)) return;

  const index = selectedCards.value.indexOf(cardIndex);
  if (index > -1) {
    selectedCards.value.splice(index, 1);
  } else {
    selectedCards.value.push(cardIndex);
  }
};

watchEffect(() => {
  if (state.value !== GAME_STATES.PLAYING) return;
  if (selectedCards.value.length !== 2) return;
  tries.value++;
  const [card1, card2] = [
    deck.value[selectedCards.value[0]],
    deck.value[selectedCards.value[1]]
  ];

  const isMatch =
    card1.color === card2.color &&
    card1.shape === card2.shape &&
    card1.filled === card2.filled;

  if (isMatch) {
    // if we don't wrap it in nextTick the watchEffect stops firing ... no clue why
    nextTick(() => {
      revealedCards.value.push(...selectedCards.value);
      selectedCards.value = [];
    });
  } else {
    canSelect.value = false;
    setTimeout(() => {
      selectedCards.value = [];
      canSelect.value = true;
    }, 1500);
  }
});

watchEffect(() => {
  if (state.value !== GAME_STATES.PLAYING) return;
  if (revealedCards.value.length === deck.value.length) {
    state.value = GAME_STATES.GAME_OVER;
  }
});

const reset = () => {
  boardSize.value = BOARD_SIZES[0].value;
  state.value = GAME_STATES.CHOOSING_SIZE;
  revealedCards.value = [];
  selectedCards.value = [];
  tries.value = 0;
};
</script>

<template>
  <main>
    <h1>Memory Game - Vue Edition</h1>
    <form v-if="state === GAME_STATES.CHOOSING_SIZE" @submit.prevent="onSubmit">
      <label for="size-select">Select size</label>
      <select id="size-select" autofocus v-model="boardSize">
        <option
          v-for="size in BOARD_SIZES"
          :key="size.label"
          :value="size.value"
        >
          {{ size.label }}
        </option>
      </select>
      <button>Play</button>
    </form>

    <section v-if="state === GAME_STATES.PLAYING">
      {{ tries }} tries
      <ul class="board">
        <li
          v-for="(card, index) in deck"
          :key="index"
          tabindex="0"
          @click="onCardClick(index)"
          @keyup.enter="onCardClick(index)"
          :class="{ revealed: isRevealed(index) }"
        >
          <Card :card="card" />
        </li>
      </ul>
    </section>

    <section v-if="state === GAME_STATES.GAME_OVER" class="game-over">
      Wow, only {{ tries }} tries ! 200IQ big brain detected !!

      <button @click="reset">Retry ?</button>
    </section>
  </main>
</template>

<style scoped>
main {
  max-width: 48rem;
  margin-inline: auto;
}

form,
.game-over {
  max-width: 22rem;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
}

form > select {
  padding: 0.5rem;
}

button {
  padding: 0.5rem;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}

h1 {
  text-align: center;
}
.board {
  display: grid;
  --rows: v-bind('boardSize.h');
  --cols: v-bind('boardSize.w');
  grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
  grid-template-rows: repeat(var(--rows), minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.board > li {
  aspect-ratio: 3 / 4;
  border-radius: 0.5rem;
  display: grid;
  transform-style: preserve-3d;
}

.board > li:focus-visible {
  outline: none;
}

.board > li:focus-visible *,
.board > li:hover * {
  border-color: white;
}

.board > li > svg,
.board > li::after {
  backface-visibility: hidden;
  transition: transform 0.5s ease-out;
  border: solid 5px transparent;
  grid-column: 1;
  grid-row: 1;
}

.board > li::after {
  content: '';
  background-color: var(--color-primary);
  height: 100%;
}

.board > li > svg {
  width: 100%;
  height: 100%;
}
.board > li:not(.revealed) svg {
  transform: rotateY(0.5turn);
}
.board > li.revealed::after {
  transform: rotateY(0.5turn);
}
</style>
