const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json()); // For parsing application/json
app.use(cookieParser());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "talent_bridge_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database.");
});

// Student Signup API : http://localhost:5000/student_signup
app.post("/student_signup", (req, res) => {
  const sql =
    "INSERT INTO student (`first_name`, `last_name`, `email`, `password`, `phone_number`,`city`,`state`,`skills`,`dob`,`passing_year`,`qaulification`,`stream`) VALUES (?, ?, ?, ?,?,?,?,?,?,?,?,?)";
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password,
    req.body.phoneNumber,
    req.body.city,
    req.body.state,
    req.body.skills,
    req.body.dob,
    req.body.passing_year,
    req.body.qaulification,
    req.body.stream,
  ];

  db.query(sql, values, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
// Student Login API Ends Here

// Student Login API : http://localhost:5000/student_login
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
// Student Login API
app.post("/student_login", (req, res) => {
  const sql = "SELECT * FROM student WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      const token = jwt.sign({ id: data[0].email }, "jwt-secret-key", {
        expiresIn: "1d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      });
      // Return student_id in the response
      return res.json({
        Status: "Success",
        student_id: data[0].id, // Add this line
      });
    } else {
      return res.json("Invalid Credentials");
    }
  });
});
// Student Login API Ends Here.

// Jobs Fetch API : http://localhost:5000/jobs
app.get("/jobs", (req, res) => {
  const sql = "SELECT * FROM jobs";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Current Jobs fetch API : http://localhost:5000/jobs/current
app.get("/current", (req, res) => {
  const sql = `
    SELECT 
      job_id,
      title, 
      company_name, 
      location, 
      salary, 
      posted_date 
    FROM jobs 
    WHERE company_type = 'current'
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//upcoming jobs fetch API : http://localhost:5000/jobs/upcoming
app.get("/upcoming", (req, res) => {
  const sql = `
    SELECT 
      job_id,
      title, 
      company_name, 
      location, 
      salary, 
      posted_date 
    FROM jobs 
    WHERE company_type = 'upcoming'
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//
app.get("/partner", (req, res) => {
  const sql = `
    SELECT 
      job_id,
      title, 
      company_name, 
      location, 
      salary, 
      posted_date 
    FROM jobs 
    WHERE company_type = 'partner'
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
// Jobs fetch code ends here.

// fetch the data of coordinator : http://localhost:5000/coordinator
app.get("/coordinator", (req, res) => {
  const sql = `
    SELECT 
      coordinator_id,
      full_name, 
      email, 
      phone_number, 
      designation, 
      institution_name, 
      institution_email
    FROM coordinator
  `;

  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

// student fetch API : http://localhost:5000/student
app.get("/student", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
// student fetch code ends here.

// Admin Profile API : http://localhost:5000/admin-profile
app.get("/admin-profile", (req, res) => {
  const sql = "SELECT * FROM tpo";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
  });
});

// Getting the Data of user : http://localhost:5000/student
// Fetch Student Profile API : http://localhost:5000/student_profile
//app.get('/student_profile', (req, res) => {
//   // Assuming you pass the student's email in the query parameter to identify them
//   const sql = "SELECT * FROM student";

//   db.query(sql, [req.query.email], (err, data) => {
//     if (err) return res.json("Error fetching profile");
//     if (data.length > 0) {
//       return res.json(data[0]); // Send the first student's data if found
//     } else {
//       return res.json("Student not found");
//     }
//   });
// });
// Verify Token Middleware for Protected Routes
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json("Unauthorized: No token provided");
  }

  jwt.verify(token, "jwt-secret-key", (err, decoded) => {
    if (err) return res.status(401).json("Invalid Token");
    req.user = decoded;
    next();
  });
};
// ✅ Apply the middleware to protect the student profile route
app.get("/student_profile", verifyToken, (req, res) => {
  const sql = "SELECT * FROM student WHERE email = ?";
  db.query(sql, [req.user.id], (err, data) => {
    if (err) return res.status(500).json("Error fetching profile");
    if (data.length > 0) {
      return res.json(data[0]);
    } else {
      return res.status(404).json("User not found");
    }
  });
});

// API to fetch counts for dashboard stats
app.get("/dashboard-stats", (req, res) => {
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM jobs WHERE company_type = 'current') AS currentCount,
      (SELECT COUNT(*) FROM jobs WHERE company_type = 'upcoming') AS upcomingCount,
      (SELECT COUNT(*) FROM jobs WHERE company_type = 'partner') AS partnerCount,
      (SELECT COUNT(*) FROM student) AS studentCount,
      (SELECT COUNT(*) FROM coordinator) AS coordinatorCount,
       (SELECT COUNT(*) FROM testimonial) AS testimonialCount
  `;

  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data[0]); // Send the counts as a JSON response
  });
});
// Logout Functionality
app.get("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: false }); // Clear the JWT token cookie
  return res
    .status(200)
    .json({ Status: "Success", message: "Logged out successfully" });
});

// Edit Functionality
// Update Student Profile API : http://localhost:5000/update_student_profile
app.put("/update_student_profile", verifyToken, (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    city,
    state,
    skills,
    dob,
    passing_year,
    qaulification,
    stream,
  } = req.body;

  const sql = `
    UPDATE student 
    SET 
      first_name = ?, 
      last_name = ?, 
      phone_number = ?, 
      city = ?,
      state = ?, 
      skills = ?, 
      dob = ?, 
      passing_year = ?, 
      qaulification = ?,
      stream = ?
    WHERE email = ?
  `;

  const values = [
    first_name,
    last_name,
    phone_number,
    city,
    state,
    skills,
    dob,
    passing_year,
    qaulification,
    stream,
    email,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json("Error updating profile");
    return res.status(200).json("Profile updated successfully");
  });
});

// API endpoint to fetch student details by ID
app.get("/students/:id", (req, res) => {
  const studentId = req.params.id;
  //console.log(studentId);
  const sql = "SELECT * FROM student WHERE id = ?";
  db.query(sql, [studentId], (err, result) => {
    if (err) {
      console.error("Error fetching student data:", err); // Log the error for debugging
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(result[0]); // Return the student data
  });
});

// for View of the Drive  .get(`http://localhost:5000/drive/${id}`)
app.get("/drive/:id", (req, res) => {
  const driveId = req.params.id;
  //console.log(driveId);
  const sql = "SELECT * FROM jobs WHERE job_id = ?";
  db.query(sql, [driveId], (err, result) => {
    if (err) {
      console.error("Error fetching student data:", err); // Log the error for debugging
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(result[0]); // Return the student data
  });
});

app.get("/cordinator/:id", (req, res) => {
  const cordinatorId = req.params.id;
  const sql = "SELECT * FROM coordinator WHERE coordinator_id = ?";
  db.query(sql, [cordinatorId], (err, result) => {
    if (err) {
      console.error("Error fetching coordinator data:", err);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Coordinator not found" });
    }
    res.json(result[0]); // Return a single object
  });
});
// Testimonial view Pages
app.get("/testimonial/:id", (req, res) => {
  const testimonialId = req.params.id;
  const sql = "SELECT * FROM testimonial WHERE id = ?";
  db.query(sql, [testimonialId], (err, result) => {
    if (err) {
      console.error("Error fetching coordinator data:", err);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    res.json(result[0]); // Return a single object
  });
});

// Crud api to add coridatior
app.post("/add_cordinator", (req, res) => {
  const sql =
    "INSERT INTO coordinator (`full_name`, `email`, `phone_number`, `designation`, `institution_name`, `institution_address`, `institution_contact`, `institution_email`, `username`, `password`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.full_name,
    req.body.email,
    req.body.phone_number,
    req.body.designation,
    req.body.institution_name,
    req.body.institution_address,
    req.body.institution_contact,
    req.body.institution_email,
    req.body.username,
    req.body.password,
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database Error: ", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    return res
      .status(200)
      .json({ message: "Coordinator added successfully!", data });
  });
});

// Crud company api for crete company : https://localhost:5000/add_company
app.post("/add_company", (req, res) => {
  const sql =
    "INSERT INTO jobs (`title`, `description`, `company_name`, `location`, `employment_type`, `salary`, `posted_date`, `closing_date`, `skills_required`, `experience_required`, `job_category`, `application_link`, `company_type`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.company_name,
    req.body.location,
    req.body.employment_type,
    req.body.salary,
    req.body.posted_date,
    req.body.closing_date,
    req.body.skills_required,
    req.body.experience_required,
    req.body.job_category,
    req.body.application_link,
    req.body.company_type,
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database Error: ", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(200).json({ message: "Job added successfully!", data });
  });
});
//Post reuirest for the contact form
// POST API to store contact details: http://localhost:5000/contact
app.post("/contact", (req, res) => {
  const sql = `
    INSERT INTO contactdetail (name, email, message,student_id) 
    VALUES (?, ?, ?,?)
  `;

  const values = [
    req.body.name,
    req.body.email,
    req.body.message,
    req.body.student_id,
  ];

  db.query(sql, values, (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ Status: "Error", message: "Error saving contact details" });
    return res.status(201).json({
      Status: "Success",
      message: "Contact details saved successfully",
    });
  });
});
//Remove the Student From the Database
// Delete Student API: http://localhost:5000/student/:id
// app.delete("/studentremove/:id", (req, res) => {
//   const studentId = req.params.id;
//   console.log(studentId);
//   const sql = "DELETE FROM student WHERE id = ?";
//   db.query(sql, [studentId], (err, result) => {
//     if (err) {
//       console.error("Error deleting student:", err);
//       return res
//         .status(500)
//         .json({ error: "Database error", details: err.message });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Student not found" });
//     }

//     return res.status(200).json({ message: "Student deleted successfully!" });
//   });
// });

app.delete("/studentremove/:id", (req, res) => {
  const studentId = req.params.id;
  console.log(studentId);

  // Step 1: Delete related applications first
  const deleteApplicationsSQL = "DELETE FROM applications WHERE student_id = ?";
  db.query(deleteApplicationsSQL, [studentId], (err, result) => {
    if (err) {
      console.error("Error deleting applications:", err);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    // Step 2: Delete student after applications are removed
    const deleteStudentSQL = "DELETE FROM student WHERE id = ?";
    db.query(deleteStudentSQL, [studentId], (err, result) => {
      if (err) {
        console.error("Error deleting student:", err);
        return res
          .status(500)
          .json({ error: "Database error", details: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Student not found" });
      }

      return res.status(200).json({ message: "Student deleted successfully!" });
    });
  });
});

//(`http://localhost:5000/drive_remove/${id}`)
// app.delete("/driveremove/:id", (req, res) => {
//   const driveid = req.params.id;
//   console.log(driveid);
//   const sql = "DELETE FROM jobs WHERE job_id = ?";
//   db.query(sql, [driveid], (err, result) => {
//     if (err) {
//       console.error("Error deleting Drive:", err);
//       return res
//         .status(500)
//         .json({ error: "Database error", details: err.message });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Drive not found" });
//     }

//     return res.status(200).json({ message: "Drive  deleted successfully!" });
//   });
// });

app.delete("/driveremove/:id", (req, res) => {
  const driveid = req.params.id;

  // First, delete dependent records from applications
  const deleteApplicationsSQL = "DELETE FROM applications WHERE job_id = ?";
  db.query(deleteApplicationsSQL, [driveid], (err, result) => {
    if (err) {
      console.error("Error deleting related applications:", err);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    // Now delete the job from jobs table
    const deleteJobSQL = "DELETE FROM jobs WHERE job_id = ?";
    db.query(deleteJobSQL, [driveid], (err, result) => {
      if (err) {
        console.error("Error deleting Drive:", err);
        return res
          .status(500)
          .json({ error: "Database error", details: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Drive not found" });
      }

      return res.status(200).json({ message: "Drive deleted successfully!" });
    });
  });
});

// const response = await axios.delete(`http://localhost:5000/upcommingdriveremove/${id}`);
// app.delete("/upcommingdriveremove/:id", (req, res) => {
//   const driveid = req.params.id;
//   console.log(driveid);
//   const sql = "DELETE FROM jobs WHERE job_id = ?";
//   db.query(sql, [driveid], (err, result) => {
//     if (err) {
//       console.error("Error deleting Drive:", err);
//       return res
//         .status(500)
//         .json({ error: "Database error", details: err.message });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Drive not found" });
//     }

//     return res.status(200).json({ message: "Drive  deleted successfully!" });
//   });
// });

app.delete("/upcommingdriveremove/:id", (req, res) => {
  const driveid = req.params.id;

  // First, delete dependent records from applications
  const deleteApplicationsSQL = "DELETE FROM applications WHERE job_id = ?";
  db.query(deleteApplicationsSQL, [driveid], (err, result) => {
    if (err) {
      console.error("Error deleting related applications:", err);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    // Now delete the job from jobs table
    const deleteJobSQL = "DELETE FROM jobs WHERE job_id = ?";
    db.query(deleteJobSQL, [driveid], (err, result) => {
      if (err) {
        console.error("Error deleting Drive:", err);
        return res
          .status(500)
          .json({ error: "Database error", details: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Drive not found" });
      }

      return res.status(200).json({ message: "Drive deleted successfully!" });
    });
  });
});

// Remove the Partner
// const response = await axios.delete(`http://localhost:5000/partnerdriveremove/${id}`);
// app.delete("/partnerremove/:id", (req, res) => {
//   const driveid = req.params.id;
//   console.log(driveid);
//   const sql = "DELETE FROM jobs WHERE job_id = ?";
//   db.query(sql, [driveid], (err, result) => {
//     if (err) {
//       console.error("Error deleting partner:", err);
//       return res
//         .status(500)
//         .json({ error: "Database error", details: err.message });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "partner not found" });
//     }

//     return res.status(200).json({ message: "partner  deleted successfully!" });
//   });
// });

// coordinater Remove
// const response = await axios.delete(`http://localhost:5000/coordinaterremove/${id}`);
app.delete("/coordinaterremove/:id", (req, res) => {
  const driveid = req.params.id;
  console.log(driveid);
  const sql = "DELETE FROM coordinator WHERE coordinator_id= ?";
  db.query(sql, [driveid], (err, result) => {
    if (err) {
      console.error("Error deleting Coordinater:", err);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: " Coordinater not found" });
    }

    return res
      .status(200)
      .json({ message: "Coordinater  deleted successfully!" });
  });
});

// testimonial Remove
app.delete("/testimonialremove/:id", (req, res) => {
  const testimonialid = req.params.id;
  console.log(testimonialid);
  const sql = "DELETE FROM testimonial WHERE id = ?";
  db.query(sql, [testimonialid], (err, result) => {
    if (err) {
      console.error("Error deleting testimonial:", err);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Testimonial not found" });
    }

    return res
      .status(200)
      .json({ message: "testimonial deleted successfully!" });
  });
});

// working on the View page

// Apply for Job
// POST endpoint to apply for a job (server.js)
app.post("/applications", (req, res) => {
  const { student_id, job_id } = req.body;

  // Validate input
  if (!student_id || !job_id) {
    return res.status(400).json({ error: "Missing student_id or job_id" });
  }

  // Insert into applications table
  const sql = "INSERT INTO applications (student_id, job_id) VALUES (?, ?)";
  db.query(sql, [student_id, job_id], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({
        error: "Failed to apply. You might have already applied.",
      });
    }
    res.json({ message: "Application submitted!" });
  });
});

// Get Applied Jobs for a Student
// GET endpoint to fetch applied jobs (server.js)
app.get("/students/:student_id/applications", (req, res) => {
  const { student_id } = req.params;
  const sql = `
    SELECT jobs.*, applications.status, applications.applied_at 
    FROM applications 
    JOIN jobs ON applications.job_id = jobs.job_id 
    WHERE applications.student_id = ?
  `;

  db.query(sql, [student_id], (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Failed to fetch applications" });
    }
    res.json(results);
  });
});

// Withdraw Application API
app.delete(
  "/students/:student_id/applications/:job_id",
  verifyToken,
  (req, res) => {
    const { student_id, job_id } = req.params;
    const studentEmail = req.user.id; // From token

    // 1. Get actual student ID from database using email in token
    db.query(
      "SELECT id FROM student WHERE email = ?",
      [studentEmail],
      (err, studentResults) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (studentResults.length === 0)
          return res.status(404).json({ error: "Student not found" });

        const actualStudentId = studentResults[0].id;

        // 2. Verify requested student_id matches logged-in student
        if (parseInt(student_id) !== actualStudentId) {
          return res.status(403).json({ error: "Unauthorized access" });
        }

        // 3. Delete application
        const deleteSql =
          "DELETE FROM applications WHERE student_id = ? AND job_id = ?";
        db.query(deleteSql, [actualStudentId, job_id], (err, deleteResult) => {
          if (err) return res.status(500).json({ error: "Withdrawal failed" });
          if (deleteResult.affectedRows === 0) {
            return res.status(404).json({ error: "Application not found" });
          }
          res.json({ message: "Application withdrawn successfully" });
        });
      }
    );
  }
);

// Get all notices
app.get("/shownotice", (req, res) => {
  const sql = "SELECT * FROM notices ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add a new notice
app.post("/addnotice", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const sql = "INSERT INTO notices (title, content) VALUES (?, ?)";
  db.query(sql, [title, content], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({
      id: result.insertId,
      title,
      content,
      created_at: new Date(),
    });
  });
});

// Get all student messages
app.get("/studentmessages", (req, res) => {
  const sql =
    "SELECT id, name, email, message, reply, created_at FROM contactdetail ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch messages" });
    res.json(results);
  });
});

// Reply perticular student
app.put("/replymessage/:id", (req, res) => {
  const { reply } = req.body;
  const { id } = req.params;

  if (!reply) {
    return res.status(400).json({ error: "Reply cannot be empty" });
  }

  const sql = "UPDATE contactdetail SET reply = ? WHERE id = ?";
  db.query(sql, [reply, id], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to send reply" });
    res.json({ success: true, message: "Reply sent successfully" });
  });
});

// Get messages for a student
app.get("/students/:id/messages", (req, res) => {
  const studentId = req.params.id;
  const sql = `
    SELECT 
      id,
      name,
      email,
      message,
      reply,
      created_at
    FROM contactdetail 
    WHERE student_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [studentId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to fetch messages" });
    }
    res.json(result);
  });
});

// ✅ API to Fetch Students by Job ID
app.get("/jobs/:jobId/applications", (req, res) => {
  const jobId = parseInt(req.params.jobId);

  if (isNaN(jobId)) {
    return res.status(400).json({ error: "Invalid job ID format" });
  }

  const query = `
  SELECT 
    student.id AS student_id,
    student.first_name,
    student.email,
    applications.status,
    applications.applied_at
  FROM applications
  INNER JOIN student 
    ON applications.student_id = student.id
  WHERE applications.job_id = ?`;

  db.query(query, [jobId], (err, results) => {
    if (err) {
      console.error("❌ Database error:", err.message);
      return res.status(500).json({
        error: "Database operation failed",
        details: err.message,
      });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "No applications found for this job." });
    }

    res.json(results);
  });
});

// ✅ API to Fetch Job Details
app.get("/jobs/:jobId", (req, res) => {
  const jobId = parseInt(req.params.jobId);

  if (isNaN(jobId)) {
    return res.status(400).json({ error: "Invalid job ID format" });
  }

  const query = `SELECT * FROM jobs WHERE job_id = ?`;

  db.query(query, [jobId], (err, result) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ error: "Database operation failed" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(result[0]);
  });
});

app.post("/feedback", (req, res) => {
  const { name, email, testimonial, rating, placed_company } = req.body;
  const created_at = new Date();
  const updated_at = new Date();

  const sql =
    "INSERT INTO testimonial (name, email, testimonial, rating, created_at, updated_at, placed_company) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [name, email, testimonial, rating, created_at, updated_at, placed_company],
    (err, result) => {
      if (err) {
        console.error("Database Insertion Error: ", err); // Log error
        return res
          .status(500)
          .json({ message: "Error inserting data", error: err });
      }
      res.json({ message: "Feedback submitted successfully" });
    }
  );
});

// For Fetching the Testimonial from backend

app.get("/testimonial", (req, res) => {
  // Corrected: req comes first, then res
  const sql = "SELECT * FROM testimonial"; // Corrected: "from" → "FROM" (SQL is case-insensitive, but best practice)

  db.query(sql, (err, data) => {
    if (err) return res.json({ error: err.message }); // Better error handling
    return res.json(data); // Returns the fetched testimonials as JSON
  });
});

app.get("/", (req, res) => {
  return res.json("Backend is working");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
