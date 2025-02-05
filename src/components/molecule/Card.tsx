export function Card(
    {title, children}:
    {
        title: string,
        children: any
    }
){
    return (
        <>
            <div className="card bg-base w-96 shadow-xl">
                <h2 className="card-title">{title}</h2>
                <div className="card-body">
                    {children}
                </div>
            </div>
        </>
    );
}