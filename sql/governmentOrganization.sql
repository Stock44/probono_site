do
$$
    declare
        category_id bigint;
    begin
        insert into "GovernmentOrganizationCategory" values (default, 'Secretaría') returning id into category_id;

        insert into "GovernmentOrganization"
        values (default, 'Secretaría de Seguridad', category_id),
               (default, 'Secretaría General de Gobierno', category_id),
               (default, 'Secretaría de Finanzas y Tesorería General del Estado', category_id),
               (default, 'Secretaría Movilidad y Planeación Urbana', category_id),
               (default, 'Secretaría de Medio Ambiente', category_id),
               (default, 'Secretaría de Economía', category_id),
               (default, 'Secretaría de Desarrollo Regional y Agropecuario', category_id),
               (default, 'Secretaría de Turismo', category_id),
               (default, 'Secretaría de Igualdad e Inclusión', category_id),
               (default, 'Secretaría de las Mujeres', category_id),
               (default, 'Secretaría de Educación', category_id),
               (default, 'Secretaría de Salud', category_id),
               (default, 'Secretaría de Cultura', category_id),
               (default, 'Instituto de la Vivienda de Nuevo León', category_id),
               (default, 'Fomento Metropolitano de Monterrey', category_id),
               (default, 'Servicios de Agua y Drenaje de Monterrey', category_id),
               (default, 'Instituto de Innovación y Transferencia de Tecnología de Nuevo León', category_id);
    end
$$
