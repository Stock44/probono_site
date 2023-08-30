export default function TextInput({label, type = 'text'}: {
    label: string,
    type?: 'text' | 'email' | 'tel',
}) {
    return (
        <label className='flex flex-col gap-1 mb-4'>
            <p className='text-xs text-stone-800'>{label}</p>
            <input type={type}/>
        </label>
    )
}