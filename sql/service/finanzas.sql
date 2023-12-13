do
$$
    declare
        category_id int;
    begin
        insert into "ServiceCategory" values (default, 'Finanzas') returning id into category_id;

        insert into "Service"
        values (default, 'Asesoría contable', category_id),
               (default, 'Asesoría fiscal', category_id),
               (default, 'Procuración de fondos', category_id),
               (default, 'Conocimiento sobre fuentes de financiamiento', category_id),
               (default, 'Conocimiento sobre crowdfunding', category_id),
               (default, 'Gestión de donativos en especie', category_id),
               (default, 'Gestión de donativos económicos', category_id),
               (default, 'Conocimiento de convocatorias para bajar fondos', category_id),
               (default, 'Software contable', category_id);
    end;
$$
