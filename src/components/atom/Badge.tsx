export function Badge(
    {level, content}: {
        level: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger' | 'error',
        content: string
    }
) {
    return (
        <>
            <div className={`bg-${level} bordered p-2`}>
                {content}
            </div>
        </>
    );
}