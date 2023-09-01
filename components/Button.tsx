import {ButtonHTMLAttributes} from 'react';

export default function Button({...rest}:  ButtonHTMLAttributes<any>) {
    return (
        <button className='dark:bg-stone-700 p-1 text-stone-200 rounded-sm hover:bg-stone-600 ' {...rest}/>
    )
}