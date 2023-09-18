import React, { InputHTMLAttributes, memo } from 'react';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

interface CurrencyInputProps extends HTMLInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export const CurrencyInput = memo((props: CurrencyInputProps) => {
    const { label, value, onChange } = props;
    return (
        <div>
            <label className="label">{label}</label>
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="input"
            />
        </div>
    );
});
