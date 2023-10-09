do
$$
    declare
        category_id int;
    begin
        insert into "OrganizationActivityCategory" values (default, 'Ecología') returning id into category_id;

        insert into "OrganizationActivity"
        values (default, 'Protección del medio ambiente', category_id),
               (default, 'Preservación forestal', category_id),
               (default, 'Manejo de especies invasoras', category_id),
               (default, 'Protección de la fauna acuática', category_id),
               (default, 'Protección de especies en peligro de extinción', category_id),
               (default, 'Parques zoológicos', category_id),
               (default, 'Adopciones, rescate y/o rehabilitación de animales', category_id),
               (default, 'Cambio climático', category_id),
               (default, 'Calidad del aire', category_id),
               (default, 'Reciclaje y/o gestión de residuos peligrosos', category_id),
               (default, 'Conservación y/o tratamiento del agua', category_id),
               (default, 'Reproducción de especies en protección y peligro de extinción', category_id),
               (default, 'Conservación de especies en peligro de extinción', category_id);
    end ;
$$
