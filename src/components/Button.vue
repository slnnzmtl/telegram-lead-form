<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['button', variantClass]"
    @click="$emit('click')"
  >
    <slot>Click me</slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
export default defineComponent({
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'button',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (val: string) => ['primary', 'secondary', 'danger'].includes(val),
    },
  },
  emits: ['click'],
  setup(props) {
    const variantClass = computed(() => {
      return {
        primary: 'button-primary',
        secondary: 'button-secondary',
        danger: 'button-danger',
      }[props.variant] || 'button-primary';
    });
    return { variantClass };
  },
});
</script>

<style scoped lang="scss">
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.button-primary {
  background-color: #007bff;
  color: white;
}
.button-primary:hover {
  background-color: #0056b3;
}
.button-primary:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.button-secondary {
  background-color: #6c757d;
  color: white;
}
.button-secondary:hover {
  background-color: #565e64;
}
.button-secondary:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.button-danger {
  background-color: #dc3545;
  color: white;
}
.button-danger:hover {
  background-color: #a71d2a;
}
.button-danger:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>