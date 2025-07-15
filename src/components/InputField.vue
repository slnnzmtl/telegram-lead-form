<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "InputField",
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const isInputFilled = computed(() => {
      return !!props.modelValue;
    });

    const displayLabel = computed(() => {
      return props.required ? `${props.label} *` : props.label;
    });

    const value = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      },
    });

    return {
      isInputFilled,
      displayLabel,
      value,
    };
  },
});
</script>

<template>
  <div class="form-group">
    <div class="input-container">
      <input
        :id="name"
        :autocomplete="name"
        v-model="value"
        :type="type || 'text'"
        class="form-input"
        :required="required"
        :placeholder="placeholder"
      />
      <label
        :for="label"
        :class="{ floating: isInputFilled || placeholder }"
        class="form-label"
      >
        {{ displayLabel }}
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form-group {
  position: relative;
}

.input-container {
  position: relative;
}

.form-label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1rem;
  pointer-events: none;
  transition: 0.2s ease all;
  font-size: 1rem;
  color: #e6f0fa;
  background-color: transparent;
  text-shadow: 0 1px 2px rgba(0,0,0,0.25);
}

.form-input {
  padding: 1rem;
  padding-top: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  font-size: 1rem;
  line-height: 1.5;
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: 0.2s ease all;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 31, 63, 0.25);
  }

  &:focus + .form-label {
    top: 1rem;
    font-size: 0.8rem;
  }
}

.floating {
  top: 1rem;
  font-size: 0.8rem;
}
</style>
