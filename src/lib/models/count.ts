import prisma from '@/lib/prisma.ts';

//Función para contar cuantos elementos están presentes en la base de datos

async function getCounts() {
    const counts = await prisma.count.findMany();
    return counts;
}

export default getCounts;
