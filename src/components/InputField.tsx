import React, { ChangeEvent, InputHTMLAttributes, memo } from 'react';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

interface InputFieldProps extends HTMLInputProps {
    currentAbbr: string;
    currentValue: string;
    onChangeHandler: (value: string) => void;
    isDisabled?: boolean;
}

export const InputField = memo((props: InputFieldProps) => {
    const {
        currentAbbr,
        currentValue,
        onChangeHandler,
        isDisabled,
    } = props;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => onChangeHandler(e.target.value);

    return (
        <div>
            <label className="label">{currentAbbr}</label>
            <input
                type="number"
                value={currentValue}
                onChange={onChange}
                disabled={isDisabled}
                className="input"
            />
        </div>
    );
});
