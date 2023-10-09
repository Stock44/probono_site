do
$$
    declare
        category_id int;
    begin
        insert into "OrganizationActivityCategory" values (default, 'Investigación') returning id into category_id;

        insert into "OrganizationActivity"
        values (default, 'Promoción y fomento de la investigación en ciencias de la salud', category_id),
               (default, 'Promoción y fomento de la investigación en ingeniería y tecnología', category_id),
               (default,
                'Promoción y fomento de la investigación en en ciencias naturales, de la Tierra y agropecuarias',
                category_id),
               (default, 'Promoción y fomento de la investigación en en ciencias exactas', category_id),
               (default, 'Promoción y fomento de la investigación en ciencias sociales', category_id),
               (default, 'Promoción y fomento de la investigación en ciencias administrativas', category_id),
               (default, 'Promoción y fomento de la investigación en humanidades', category_id);
    end;
$$
