import React from 'react';

type CheckboxProps = {
  checked?: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'>;

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  disabled = false,
  className,
  ...rest
}) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.checked)}
      {...rest}
    />
  );
};

