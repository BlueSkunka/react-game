export function Badge(
    {level, content}: {
        level: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger' | 'error',
        content: string
    }
) {
    return (
        <>
            <div className={`badge bg-${level}`}>
                {content}
            </div>
        </>
    );
}