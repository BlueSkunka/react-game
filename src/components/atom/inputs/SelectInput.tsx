export function SelectInput(
    {field, form, options, ...props}
) {
    return (
        <>
            {form.touched[field.name] && form.errors[field.name] ? (
                <div className="error text-red-400">{form.errors[field.name]}</div>
            ): null}

        </>
    );
}