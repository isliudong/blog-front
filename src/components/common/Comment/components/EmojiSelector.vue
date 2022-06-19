<template>
  <div class="emoji-selector" @mousedown.prevent @mousedown.stop>
    <div class="triangle" />
    <div class="emoji-content">
      <div class="category">
        <div
          v-for="(item, i) in currentEmojis"
          :key="`emoji-${i}`"
          class="item"
          @click="$emit('choose', item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="next-page">
      <div
        v-for="cat in Object.keys(emojis)"
        :key="cat"
        :class="{ active: currentCat === cat }"
        @click="currentCat = cat"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImojiSelector',
  data() {
    return {
      currentCat: 'FrequentlyUsed',
      emojis: {
        FrequentlyUsed: [
          '😃',
          '😘',
          '😂',
          '😳',
          '😍',
          '👏',
          '👍',
          '👎',
          '😁',
          '😉',
          '😠',
          '😞',
          '😥',
          '😭',
          '😝',
          '😡',
          '❤',
          '💔',
          '😣',
          '😔',
          '😄',
          '😷',
          '😚',
          '😓',
          '😊',
          '😢',
          '😜',
          '😨',
          '😰',
          '😲',
          '😏',
          '😱',
          '😪',
          '😖',
          '😌',
          '😒',
          '👻',
          '🎅',
          '👧',
          '👦',
          '👩',
          '👨',
          '🐶',
          '🐱',
          '👊',
          '✊',
          '✌',
          '💪',
          '👆',
          '👇',
          '👉',
          '👈',
          '👌',
          '💩'
        ],
        Symbols0: [
          '🤗',
          '😎',
          '🤓',
          '👩‍💻',
          '👨‍💻',
          '🙄',
          '😭',
          '😨',
          '🤪',
          '🎉',
          '🤔',
          '🐵',
          '😇',
          '🤬',
          '🐈',
          '😹',
          '🙀',
          '🇨🇳',
          '👮',
          '🐕',
          '✅',
          '👋',
          '🔥',
          '🐛',
          '🍉',
          '👽',
          '🤖',
          '⌚',
          '🤝',
          '🏳️‍🌈',
          '🚩',
          '💤',
          '®',
          '©',
          '💯',
          '™',
          '💻',
          '📅',
          '📌',
          '✉',
          '⌨',
          '📗',
          '🤳',
          '🛌',
          '🎣',
          '🎨',
          '🎧',
          '🎸',
          '🎤',
          '🏸',
          '🏀',
          '⚽',
          '🎮',
          '🏊'
        ],
        Symbols1: [
          '🍗',
          '🦄',
          '🔞',
          '🙏',
          '☀',
          '🌙',
          '🌟',
          '⚡',
          '☁',
          '☔',
          '🍁',
          '🌻',
          '🍃',
          '👗',
          '🎀',
          '👄',
          '🌹',
          '☕',
          '🎂',
          '🕙',
          '🍺',
          '🔍',
          '📱',
          '🏠',
          '🚗',
          '🎁',
          '⚽',
          '💣',
          '💎',
          '💊',
          '🤮',
          '🏆',
          '👿'
        ]
      }
    }
  },
  computed: {
    currentEmojis() {
      return this.emojis[this.currentCat]
    }
  }
}
</script>

<style lang="scss" scoped>
.emoji-selector {
  padding: 0.8em;
  position: absolute;
  top: 2.24em;
  z-index: 1;
  bottom: 0;
  width: 19em;
  height: 14em;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 5px 18px 0 rgba(0, 0, 0, 0.16);
  box-sizing: content-box;
  .triangle {
    position: absolute;
    top: -0.56em;
    left: 14%;
    width: 0;
    height: 0;
    transform: translate(-50%, -50%);
    border: 0.64em solid transparent;
    border-bottom-color: #fff;
  }
  .emoji-content {
    height: 100%;
    overflow: auto;
    margin-bottom: 10px;
    .category {
      max-width: 19em;
      max-height: 13em;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      overflow: hidden;
      .item {
        width: calc(19em / 9);
        height: calc(13em / 6);
        font-size: 1.25em;
        text-align: center;
        line-height: calc(10em / 6);
        cursor: pointer;
        &:hover {
          font-size: 1.6em;
        }
      }
    }
  }
  .next-page {
    list-style: none;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, -50%);
    div {
      list-style: none;
      margin: 0 5px;
      width: 6px;
      height: 6px;
      border-radius: 100%;
      background-color: #f0f0f0;
      cursor: pointer;
      &.active {
        cursor: default;
        background-color: #d8d8d8;
      }
    }
  }
}
</style>
