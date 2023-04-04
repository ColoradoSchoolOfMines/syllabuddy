WITH DepartmentCounts AS (
    SELECT
        SUBSTR("Course Number", 1, 4) AS Department,
        COUNT(*) AS SyllabiCount
    FROM
        syllabase
    GROUP BY
        Department
),
TotalSyllabi AS (
    SELECT
        COUNT(*) AS TotalCount
    FROM
        syllabase
)

SELECT
    DepartmentCounts.Department,
    DepartmentCounts.SyllabiCount,
    ROUND((DepartmentCounts.SyllabiCount * 100.0) / TotalSyllabi.TotalCount, 2) AS Percentage
FROM
    DepartmentCounts, TotalSyllabi;

