insert into "Sector" (id, name, geom, "municipalityId")
select distinct on (s.id) s.id, s.sector, s.wkb_geometry, m.id
from "sectors_dump" as s
join "Municipality" as m on m.name = s.municipio;
