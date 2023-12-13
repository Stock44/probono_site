do
$$
    declare
        category_id int;
    begin
        insert into "ServiceCategory" values (default, 'Gestión de talento') returning id into category_id;

        insert into "Service"
        values (default, 'Fortalecimiento del voluntariado', category_id),
               (default, 'Desarrollo de habilidades de liderazgo', category_id),
               (default, 'Procesos de reclutamiento', category_id),
               (default, 'Capacitación continua', category_id),
               (default, 'Cursos de actualización', category_id),
               (default, 'Servicios psicológicos', category_id),
               (default, 'Servicios de salud', category_id),
               (default, 'Diseño de programas para incentivos', category_id),
               (default, 'Software para la gestión del talento', category_id),
               (default, 'Conocimiento de mediación de conflictos', category_id);
    end;
$$
