import React from 'react';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import AppInput from './AppInput';

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  variant?: 'outlined' | 'filled' | 'shadowed';
  style?: any;
  secureTextEntry?: boolean;
  disabled?: boolean;
  multiline?: boolean;
}

const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  variant = 'outlined',
  style,
  secureTextEntry = false,
  disabled = false,
  multiline,
}: FormInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={'' as any}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <AppInput
          label={label}
          placeholder={placeholder}
          value={String(value ?? '')}
          onBlur={onBlur}
          onChangeText={onChange}
          error={error?.message}
          variant={variant}
          containerStyle={style}
          secureTextEntry={secureTextEntry}
          editable={!disabled}
          multiline
        />
      )}
    />
  );
};

export default FormInput;
