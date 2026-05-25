import React from 'react'
import { FormFieldProps } from '../../types/types'

export function FormField({
    id,
    label,
    type,
    placeholder,
    className,
    step,
    classNameForLabel,
    onChange,
    ...props
}: FormFieldProps): React.ReactElement {
    return (
        <>
            <label className={classNameForLabel} htmlFor={id}>
                {label}
            </label>
            <input
                onChange={onChange}
                className={className}
                type={type}
                id={id}
                placeholder={placeholder}
                step={step}
                {...props}
            />
        </>
    )
}