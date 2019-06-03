CREATE TABLE temp.employees (
    id INT(11) NOT NULL,
    employee VARCHAR(64) NOT NULL
);

INSERT INTO temp.employees VALUES
    (1, 'odin'),
    (2, 'thor');


CREATE TABLE temp.sales (
    id INT(11) NOT NULL,
    sale_date DATE NOT NULL,
    sale INT(11) NULL
);

INSERT INTO temp.sales VALUES
    (1, DATE('2017-03-01'), 200),
    (1, DATE('2017-04-01'), 300),
    (1, DATE('2017-05-01'), 400),
    (2, DATE('2017-03-01'), 400),
    (2, DATE('2017-04-01'), 300),
    (2, DATE('2017-05-01'), 500);