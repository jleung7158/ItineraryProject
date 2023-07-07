steps = [
    [
        ##Create the table
        """
        CREATE TABLE locations (
            id SERIAL PRIMARY KEY NOT NULL,
            trip_id INT NOT NULL,
            name VARCHAR(100) NOT NULL,
            date VARCHAR(100) NOT NULL,
            address VARCHAR(100) NOT NULL,
            pic VARCHAR(500) NULL
        );
        """,
        ##Drop the table
        """
        DROP TABLE account;
        """
    ]
]