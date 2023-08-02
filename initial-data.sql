INSERT INTO campaign_type (campaign_type_description,period_quantity) VALUES 
("ARROZ", 2),
("FREJOL", 3),
("MANGO", 4),
("LIMON", 2),
("SOYA", 3),
("PAPAYA", 2),
("PLATANO", 2),
("MAIZ", 2);

INSERT INTO farmer_quality (farmer_quality_description) VALUES
("Bueno"),
("Regular"),
("Malo"),
("Pésimo"),
("No registra");

INSERT INTO property_legal_condition (property_legal_condition_description) VALUES
("Adjudicado"),
("Arrendatario"),
("Conducc"),
("Posesión"),
("Titulado");

INSERT INTO sector (sector_id, sector_description) VALUES
(2, "Margen izquierda"),
(3, "Tumbes"),
(4, "Margen derecha");

INSERT INTO project (code, project_description, sector_id) VALUES
(1, "El Palmar", 2),
(2, "Cooperativa 20 de Enero", 2),
(3,"Romero", 2),
(4,"La Tuna", 2),
(5,"Puerto El Cura", 2),
(6,"Las Brujas Alta", 2),
(7,"Las Brujas Baja", 2),
(8,"Becerra Belén", 2),
(9,"Coop. Ntra. Sra. del Carmen", 2),
(10,"Bebedero", 2),
(11,"Huaquillas", 2),
(12,"El Limon", 2),
(13,"La Palma", 2),
(14,"Papayal", 2),
(15,"Pocitos", 2),
(16,"Matapalo", 2),
(1,"Tumbes", 3),
(2,"Higuerón", 4),
(3,"San Julián", 4),
(4,"Casablanqueada", 4),
(5,"Oidor", 4),
(6,"Cristales", 4),
(7,"La Noria", 4),
(8,"Malvales", 4),
(9,"Realengal", 4),
(10,"La Cruz", 4),
(11,"Coop 5 de Diciembre", 4),
(15,"Rica Playa", 4),
(16,"La Rosita", 4),
(17,"Monteo", 4),
(18,"La Paila", 4);

INSERT INTO assistance_type (assistance_type_description) VALUES 
('SERVIAGRO'),
('AGROINDUSTRIAS'),
('Tecnologóa Tumbesina'),
('P&G INGENIEROS'),
('INDEPENDIENTES');

INSERT INTO technical (assistance_type_id, technical_name) VALUES
(1, 'SILVA CRUZ TEODORO'),
(1, 'ZAPATA CAMACHO PORFIRIO'),
(3, 'JAVIER MIJAHUANCA'),
(3, 'WILMER FERMANDEZ'),
(3, 'ODAR LA ROSA'),
(3, 'JOSE ALVINES YOVERA'),
(4, 'ZAPATA CAMACHO PORFIRIO'),
(5, 'Eras Luna Orlando'),
(5, 'Valladares Lopez Edilbert'),
(5, 'Olavarria Saavedra Ricard'),
(5, 'Coveñas Palomino Segundo'),
(5, 'Dios Espinoza Miguel'),
(5, 'Aguirre Challe Dante'),
(5, 'Medina Benites Jose'),
(5, 'Emp. Agroindustrial Tumpis'),
(5, 'Helguero Campaña Erwing'),
(5, 'Castro Arrunategui Milagr'),
(5, 'Paz Garcia Sandra'),
(5, 'Guerra Garcia Carlos'),
(5, 'Zapata Balladares Oswaldo'),
(5, 'Carrasco Delgado Anibal'),
(5, 'Dioses Espinoza Rey Willy'),
(5, 'Cespedes Dioses Luis'),
(5, 'Vinces Martinez Pedro'),
(5, 'Alvines Sullon Jose Pascu'),
(5, 'No requiere');

INSERT INTO provider (provider_description) VALUES 
('BANCO DE LA NACIÓN');

INSERT INTO financial_source (financial_source_description) VALUES 
('Recuperaciones M.E.');

INSERT INTO current_account (current_account_description) VALUES 
('007251-1-32');