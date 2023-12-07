do
$$
    declare
        category_id int;
    begin
        insert into "ActivityCategory" values (default, 'Desarrollo Económico') returning id into category_id;

        insert into "Activity" values
                                               (default, 'Creación de empleo y desarrollo de la fuerza laboral', category_id),
                                               (default, 'Capacitación laboral', category_id),
                                               (default, 'Responsabilidad social corporativa', category_id),
                                               (default, 'Emprendimiento', category_id),
                                               (default, 'Cooperativas de ahorro y crédito', category_id),
                                               (default, 'Asesoramiento financiero', category_id);
    end;
$$
