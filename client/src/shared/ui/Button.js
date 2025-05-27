export function Button({
                           children,
                           variant = 'primary',
                           disabled = false,
                           ...restProps
                       }) {
    const className = [
        'button',
        `button_${variant}`,
        disabled && 'button_disabled',,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            className={className}
            disabled={disabled}
            {...restProps}
        >
            {children}
        </button>
    );
}