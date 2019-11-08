CREATE TABLE budget_tracker.expense_categories (
    id INT(11) PRIMARY KEY,
    category_name VARCHAR(32) NOT NULL
);

INSERT INTO budget_tracker.expense_categories VALUES
    (0, 'Grocery'),
    (1, 'Living Essentials'),
    (2, 'Dining'),
    (3, 'Shopping & Entertainment'),
    (4, 'Special');


CREATE TABLE budget_tracker.expenses (
    id INT(7) PRIMARY KEY AUTO_INCREMENT,
    category_id INT(3) NOT NULL,
    date_time DATE NOT NULL,
    title VARCHAR(32) NOT NULL,
    description VARCHAR(64) NULL,
    cost DECIMAL(7, 2) NOT NULL
);

INSERT INTO budget_tracker.expenses VALUES
    (NULL, 0, DATE('2019-11-01'), 'Trader Joes', 'Work Meals', 13.75),
    (NULL, 2, DATE('2019-11-01'), 'Starbucks', 'Latte', 4.45),
    (NULL, 2, DATE('2019-11-02'), 'Grand Casino', 'Breakfast', 6.30);
