--make sure to upload syllabase_dev as a csv and make id the primary key and remove the space in Semester.

--delete rows in syllabase
DELETE FROM syllabase;

--insert the data from syllabase_dev into syllabase
INSERT INTO syllabase ("id", "Timestamp", "Syllabus Upload", "Semester", "Year", "Professor", "Course Number", "Course Name")
SELECT "id", "Timestamp", "Syllabus Upload", "Semester", "Year", "Professor", "Course Number", "Course Name"
FROM syllabase_dev;

--remove space in course number between the department code and course code
-- SELECT *
-- FROM cs_courses
-- JOIN syllabase_dev ON REPLACE(cs_courses."Course Number", ' ', '') = REPLACE(syllabase_dev."Course Number", ' ', '')

-- SELECT COALESCE(cs."Course Number", sb."Course Number") AS "Course Number", COALESCE(cs."Course Name", sb."Course Name") AS "Course Name"
-- FROM cs_courses cs
-- FULL OUTER JOIN syllabase_dev sb ON REPLACE(cs."Course Number", ' ', '') = REPLACE(sb."Course Number", ' ', '')
-- WHERE cs."Course Number" IS NULL OR sb."Course Number" IS NULL;
