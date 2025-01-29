export function Badge(
    {level, content}: {
        level: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger',
        content: string
    }
) {
    return (
        <>
            <div className={`badge badge-${level}`}>
                {content}
            </div>
        </>
    );
}