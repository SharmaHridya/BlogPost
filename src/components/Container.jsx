function Container({ children, className = '', size = 'default' }) {
    const sizes = {
        default: 'max-w-7xl',
        wide: 'max-w-[88rem]',
        narrow: 'max-w-4xl',
        reader: 'max-w-3xl',
    };

    return (
        <div className={`w-full ${sizes[size] || sizes.default} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    );
}

export default Container
