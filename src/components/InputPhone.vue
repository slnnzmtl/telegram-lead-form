<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";

export default defineComponent({
  name: "InputPhone",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "Phone",
    },
    required: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "phone",
    },
    defaultCountry: {
      type: String,
      default: "RU",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue);
    const isFocused = ref(false);
    const isInputFilled = computed(() => !!inputValue.value);
    const displayLabel = computed(() => props.required ? `${props.label} *` : props.label);
    const error = ref<string | null>(null);

    watch(() => props.modelValue, (val) => {
      inputValue.value = val;
    });

    const formatPhone = (value: string) => {
      return new AsYouType(props.defaultCountry).input(value);
    };

    const validatePhone = (value: string) => {
      const phone = parsePhoneNumberFromString(value, props.defaultCountry);
      if (!phone || !phone.isValid()) {
        error.value = "Invalid phone number";
        return false;
      }
      error.value = null;
      return true;
    };

    const onInput = (e: Event) => {
      const value = (e.target as HTMLInputElement).value;
      inputValue.value = formatPhone(value);
      emit("update:modelValue", inputValue.value);
      validatePhone(inputValue.value);
    };

    const onFocus = () => {
      isFocused.value = true;
    };
    const onBlur = () => {
      isFocused.value = false;
    };

    return {
      inputValue,
      isInputFilled,
      isFocused,
      displayLabel,
      error,
      onInput,
      onFocus,
      onBlur,
      placeholder: props.placeholder,
      required: props.required,
      name: props.name,
    };
  },
});
</script>

<template>
  <div class="form-group">
    <div class="input-container">
      <input
        :id="name"
        :name="name"
        :autocomplete="name"
        :value="inputValue"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        type="tel"
        class="form-input"
        :required="required"
      />
      <label
        :for="name"
        :class="{ floating: isInputFilled || isFocused }"
        class="form-label"
      >
        {{ displayLabel }}
      </label>
    </div>
    <div v-if="error" class="text-red-500 text-xs mt-1 ml-4">{{ error }}</div>
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
  color: #e6f0fa !important;
  

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 31, 63, 0.25);
  }

  &:focus + .form-label {
    top: 1rem;
    font-size: 0.8rem;
  }
}

  iinput:-webkit-autofill,
  input:-webkit-autofill:focus {
    border: 1px solid #434346;
    -webkit-text-fill-color: #F1F1F1;
    -webkit-box-shadow: 0 0 0px 1000px #1B1B1C inset !important;
    transition: background-color 5000s ease-in-out 0s;
    background-color: rgba(255, 255, 255, 0.1) !important;
  };



.floating {
  top: 1rem;
  font-size: 0.8rem;
}
</style>
