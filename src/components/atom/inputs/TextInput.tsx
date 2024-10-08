export function TextInput({field, form, ...props}) {
    console.log(props, field, form)
    return (
        <>
            {form.touched[field.name] && form.errors[field.name] ? (
                <div className="error text-red-400">{form.errors[field.name]}</div>
            ): null}
            <label className="input input-bordered flex items-center gap-2 mb-4">
                {props.icon}
                <input {...field} {...props} className="grow" />
            </label>
        </>
    );
}