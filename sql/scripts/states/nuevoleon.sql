do
$$
    declare
        state_id bigint;
    begin
        insert into state
        values (default, 'Nuevo León')
        returning id into state_id;

        insert into municipality
        values (default, 'Abasolo', state_id),
               (default, 'Aguasleguas', state_id),
               (default, 'Allende', state_id),
               (default, 'Anáhuac', state_id),
               (default, 'Apodaca', state_id),
               (default, 'Aramberri', state_id),
               (default, 'Bustamante', state_id),
               (default, 'Cadereyta Jiménez', state_id),
               (default, 'Cerralvo', state_id),
               (default, 'Ciénega de Flores', state_id),
               (default, 'China', state_id),
               (default, 'Doctor Arroyo', state_id),
               (default, 'Doctor Coss', state_id),
               (default, 'Doctor González', state_id),
               (default, 'El Carmen', state_id),
               (default, 'Galeana', state_id),
               (default, 'García', state_id),
               (default, 'General Bravo', state_id),
               (default, 'General Escobedo', state_id),
               (default, 'General Terán', state_id),
               (default, 'General Treviño', state_id),
               (default, 'General Zaragoza', state_id),
               (default, 'General Zuazua', state_id),
               (default, 'Guadalupe', state_id),
               (default, 'Hidalgo', state_id),
               (default, 'Higueras', state_id),
               (default, 'Hualahuises', state_id),
               (default, 'Iturbide', state_id),
               (default, 'Juárez', state_id),
               (default, 'Lampazos de Naranjo', state_id),
               (default, 'Linares', state_id),
               (default, 'Los Aldamas', state_id),
               (default, 'Los Herreras', state_id),
               (default, 'Los Ramones', state_id),
               (default, 'Marín', state_id),
               (default, 'Melchor Ocampo', state_id),
               (default, 'Mier y Noriega', state_id),
               (default, 'Mina', state_id),
               (default, 'Montemorelos', state_id),
               (default, 'Monterrey', state_id),
               (default, 'Parás', state_id),
               (default, 'Pesquería', state_id),
               (default, 'Rayones', state_id),
               (default, 'Sabinas Hidalgo', state_id),
               (default, 'Salinas Victoria', state_id),
               (default, 'San Nicolás de los Garza', state_id),
               (default, 'San Pedro Garza García', state_id),
               (default, 'Santa Catarina', state_id),
               (default, 'Santiago', state_id),
               (default, 'Vallecillo', state_id),
               (default, 'Villadama', state_id);
    end
$$

