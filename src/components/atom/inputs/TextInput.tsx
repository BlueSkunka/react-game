export function TextInput({field, form, ...props}) {
    return (
        <>
            {form.touched[field.name] && form.errors[field.name] ? (
                <div className="error text-red-400">{form.errors[field.name]}</div>
            ): null}
            <label className={`input input-bordered flex items-center gap-2 mb-4 ${props.className}`}>
                {props.icon}
                <input {...field} {...props} className="grow" />
            </label>
        </>
    );
}