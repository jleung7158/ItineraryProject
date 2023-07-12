steps = [
    [
        # Create the table
        """
        CREATE TABLE plans (
            id SERIAL PRIMARY KEY NOT NULL,
            location_id INT NOT NULL,
            detail VARCHAR(5000) NOT NULL,
            time VARCHAR(100) NOT NULL,
            names_attendees VARCHAR(5000) NOT NULL,
            num_of_attendees INT NOT NULL,
            picture_url VARCHAR(500) NULL
        );
        """,
        # Drop the table
        """
        DROP TABLE plans;
        """
    ]
]
