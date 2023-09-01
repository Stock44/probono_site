export default async function OnboardingLayout({children}: { children: React.ReactNode }) {
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='flex flex-col gap-4 rounded-md p-8 border-1 border-stone-200 bg-stone-100  dark:border-stone-700 dark:bg-stone-800 max-w-sm'>
                {children}
            </div>
        </div>
    )
}
