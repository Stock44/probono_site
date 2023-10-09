do
$$
    declare
        category_id int;
    begin
        insert into "OrganizationActivityCategory" values (default, 'Desarrollo Social') returning id into category_id;

        insert into "OrganizationActivity"
        values (default, 'Promoción y aportación de servicios para la salud', category_id),
               (default, 'Programas de nutrición', category_id),
               (default, 'Rehabilitación Juvenil', category_id),
               (default, 'Rehabilitación Física', category_id),
               (default, 'Atención Psicoterapéutica', category_id),
               (default, 'Emergencias', category_id),
               (default, 'Prevención de enfermedades', category_id),
               (default, 'Adicciones', category_id),
               (default, 'Servicios de comedor', category_id),
               (default, 'Bancos de alimentos', category_id),
               (default, 'Acceso a medicamentos', category_id),
               (default, 'Ayuda al viajero', category_id),
               (default, 'Ayuda a las víctimas', category_id),
               (default, 'Banco de ropa', category_id),
               (default, 'Organización comunitaria', category_id),
               (default, 'Servicio a la comunidad', category_id),
               (default, 'Asociaciones de vecinos', category_id),
               (default, 'Adopción', category_id),
               (default, 'Acogimiento', category_id),
               (default, 'Servicios de empleo', category_id),
               (default, 'Servicios o rehabilitación de vivienda', category_id),
               (default, 'Alojamiento temporal', category_id),
               (default, 'Servicios, atención y/o cuidados para inmigrantes', category_id),
               (default, 'Servicios, atención y/o cuidados para la mujer', category_id),
               (default, 'Servicios, atención y/o cuidados para jóvenes', category_id),
               (default, 'Servicios, atención y/o cuidados a personas con discapacidad', category_id),
               (default, 'Servicios, atención y/o cuidado de adultos mayores', category_id),
               (default, 'Servicios, atención y/o cuidado de niños, niñas y adolescentes', category_id),
               (default, 'Educación y formación en derechos humanos', category_id),
               (default, 'Promoción de la equidad de género', category_id),
               (default, 'Prevención de la violencia de género', category_id),
               (default, 'Asistencia jurídica', category_id),
               (default,
                'Apoyo en la defensa y promoción de los derechos humanos para la reducción de las desigualdades',
                category_id);
    end;
$$
