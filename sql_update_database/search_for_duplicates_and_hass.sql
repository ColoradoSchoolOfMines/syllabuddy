--shows hass syllabi
--SELECT * from syllabase_dev where "Course Number" LIKE 'HASS%';

--deletes hass syllabi
--DELETE FROM syllabase_dev WHERE "Course Number" LIKE 'HASS%';


-- shows duplicate syllabi
-- SELECT "Course Number", COUNT(*) AS count
-- FROM syllabase_dev
-- GROUP BY "Course Number"
-- HAVING COUNT(*) > 1

--delete duplicates by keeping the most recent syllabi
DELETE FROM syllabase_dev
WHERE id IN (
    SELECT id FROM (
        SELECT id, ROW_NUMBER() OVER (PARTITION BY "Course Number" ORDER BY "Timestamp" DESC) AS rn
        FROM syllabase_dev
        WHERE "Course Number" IN (
            SELECT "Course Number"
            FROM syllabase_dev
            GROUP BY "Course Number"
            HAVING COUNT(*) > 1
        )
    ) AS subquery
    WHERE subquery.rn > 1
);

