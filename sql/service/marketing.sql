do
$$
    declare
        category_id int;
    begin
        insert into "ServiceCategory" values (default, 'Marketing') returning id into category_id;

        insert into "Service"
        values (default, 'Desarrollo de una identidad gráfica', category_id),
               (default, 'Diseño de página web', category_id),
               (default, 'Mantenimiento de página web', category_id),
               (default, 'Diseño de redes sociales', category_id),
               (default, 'Administración de redes sociales', category_id),
               (default, 'Diseño de estrategia de comunicación', category_id),
               (default, 'Diseño de estrategia de marketing', category_id),
               (default, 'Marketing inclusivo', category_id),
               (default, 'Generación de material gráfico y audiovisual', category_id);
    end ;
$$
