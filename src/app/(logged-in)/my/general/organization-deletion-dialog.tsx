'use client';
import { useCloseModal } from "@/components/modal/modal-context";
import React from "react";
import type { Organization } from "@prisma/client";
import { useQuery } from "react-query";
import Dialog from "@/components/dialog";
import Button from '@/components/button/button.tsx';
import LoadingSpinner from "@/components/loading-spinner";


export type OrganizationDeletionDialogProps = {
    readonly organizationId: number;
}

export default function OrganizationDeletionDialog(props: OrganizationDeletionDialogProps) {
    const {organizationId} = props;
    const closeModal = useCloseModal();
    const {data} = useQuery<Organization[]>([organizationId, 'organizations'], async () => {
        const response = await fetch(`/api/users/${organizationId}/dependant-organizations`);
        return response.json();
    });

    return (
        <Dialog title={<span className="text-red-400">Borrar la organización</span>}>
            ¿Estás seguro de que quieres borrar la organización?
            {data 
                ? (
                    <div className="mt-4">
                        {data.length === 1 && 'Se borrara la siguiente organizacion:'}
                        <ul className="list-disc list-inside">
                            {
                                data.map(organization => (
                                    <li key={organization.id}>
                                        {organization.name}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )
                : (
                    <div className="h-16 flex items-center justify-center mt-4">
                        <LoadingSpinner/>
                    </div>
                )
                }
            <div className="mt-4 flex justify-between">
                <Button variant="secondary" onPress={closeModal}>
                    Cancelar
                </Button>
            </div>
        </Dialog>
    )
}

