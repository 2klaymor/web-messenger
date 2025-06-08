export default function Button({
                                   children,
                                   disabled = false,
                                   userClassName = '',
                                   ...restProps})
{
    const className = [
        'button',
        // `button-${variant}`,
        disabled && 'button_disabled',
        userClassName,
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