steps = [
    [
        ##Create the table
        """
        CREATE TABLE trips (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            pic VARCHAR(500) NULL
        );
        """,
        ##Drop the table
        """
        DROP TABLE account;
        """
    ]
]