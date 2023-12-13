do
$$
    declare
        category_id int;
    begin
        insert into "ActivityCategory" values (default, 'Educación') returning id into category_id;

        insert into "Activity"
        values (default, 'Formación y educación en apoyo a niños, adolescentes y jóvenes', category_id),
               (default, 'Educación de adultos', category_id),
               (default, 'Aprendizaje fuera de la escuela', category_id),
               (default, 'Participación de padres y maestros', category_id),
               (default, 'Promoción de la lectura', category_id),
               (default, 'Tutoría', category_id),
               (default, 'Educación para superdotados (alto rendimiento)', category_id),
               (default, 'Educación STEM', category_id),
               (default, 'Educación STEAM', category_id),
               (default, 'Educación ambiental', category_id);
    end;
$$
