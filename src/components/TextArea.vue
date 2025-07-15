<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "TextareaField",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
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
    rows: {
      type: Number,
      default: 3,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const isInputFilled = computed(() => {
      return !!props.modelValue;
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
      value,
    };
  },
});
</script>

<template>
  <div class="form-group">
    <div class="input-container">
      <textarea
        :id="name"
        v-model="value"
        class="form-input"
        :placeholder="placeholder"
        :required="required"
        :name="name"
        :rows="rows"
        :autocomplete="name"
      />
      <label
        :for="label"
        :class="{ floating: isInputFilled || !!placeholder }"
        class="form-label"
      >
        {{ label }}
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
  resize: vertical;
  outline: none;
  margin: 0;
  transition: 0.2s ease all;
  color: white;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 31, 63, 0.25);
  }

  &:focus + .form-label {
    top: 1rem;
    font-size: 0.8rem;
  }
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
  z-index: 2;
}


.floating {
  top: 1rem;
  font-size: 0.8rem;
}
</style>
