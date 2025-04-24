class StudentInfoSystem {
    constructor() {
      this.students = []
      this.currentId = 1
      this.editingId = null
      this.studentForm = document.getElementById("studentForm")
      this.studentIdInput = document.getElementById("studentId")
      this.rollNumberInput = document.getElementById("rollNumber")
      this.nameInput = document.getElementById("name")
      this.ageInput = document.getElementById("age")
      this.gradeInput = document.getElementById("grade")
      this.subjectsInput = document.getElementById("subjects")
      this.gpaInput = document.getElementById("gpa")
      this.addressInput = document.getElementById("address")
      this.emailInput = document.getElementById("email")
      this.phoneInput = document.getElementById("phone")
  
      // DOM Elements - Buttons
      this.saveBtn = document.getElementById("saveBtn")
      this.resetBtn = document.getElementById("resetBtn")
      this.exportBtn = document.getElementById("exportBtn")
      this.importBtn = document.getElementById("importBtn")
      this.searchBtn = document.getElementById("searchBtn")
      this.addSampleBtn = document.getElementById("addSampleBtn")
      this.copyJsonBtn = document.getElementById("copyJsonBtn")
      this.downloadJsonBtn = document.getElementById("downloadJsonBtn")
      this.closeJsonBtn = document.getElementById("closeJsonBtn")
      this.confirmImportBtn = document.getElementById("confirmImportBtn")
      this.cancelImportBtn = document.getElementById("cancelImportBtn")
      this.clearDataBtn = document.getElementById("clearDataBtn")
      this.exportAllBtn = document.getElementById("exportAllBtn")
      this.importtAllBtn = document.getElementById("importAllBtn")
      this.viewAllStudentsBtn = document.getElementById("viewAllStudentsBtn")
      this.addStudentFromDashboard = document.getElementById("addStudentFromDashboard")
  
      // DOM Elements - Tables and Containers
      this.studentTableBody = document.getElementById("studentTableBody")
      this.recentStudentsTableBody = document.getElementById("recentStudentsTableBody")
      this.gpaDistributionTable = document.getElementById("gpaDistributionTable")
      this.studentCount = document.getElementById("studentCount")
      this.studentsTabBadge = document.getElementById("studentsTabBadge")
      this.emptyState = document.getElementById("emptyState")
      this.recentStudentsEmptyState = document.getElementById("recentStudentsEmptyState")
  
      // DOM Elements - Modals and Notifications
      this.jsonSection = document.getElementById("jsonSection")
      this.jsonPreview = document.getElementById("jsonPreview")
      this.importSection = document.getElementById("importSection")
      this.jsonInput = document.getElementById("jsonInput")
      this.notification = document.getElementById("notification")
      this.notificationMessage = document.getElementById("notificationMessage")
  
      // DOM Elements - Search
      this.searchInput = document.getElementById("searchInput")
      this.searchByName = document.getElementById("searchByName")
      this.searchByRoll = document.getElementById("searchByRoll")
      this.searchBySubject = document.getElementById("searchBySubject")
  
      // DOM Elements - Stats
      this.totalStudents = document.getElementById("totalStudents")
      this.totalSubjects = document.getElementById("totalSubjects")
      this.avgGpa = document.getElementById("avgGpa")
      this.totalGrades = document.getElementById("totalGrades")
      this.analyticsStudents = document.getElementById("analyticsStudents")
      this.analyticsHighGpa = document.getElementById("analyticsHighGpa")
      this.analyticsAvgAge = document.getElementById("analyticsAvgAge")
      this.analyticsPopularSubject = document.getElementById("analyticsPopularSubject")
  
      // DOM Elements - Settings
      this.darkModeToggle = document.getElementById("darkModeToggle")
      this.darkModeCheckbox = document.getElementById("darkModeToggle")
      this.autoSaveToggle = document.getElementById("autoSaveToggle")
  
      // DOM Elements - Tabs
      this.tabBtns = document.querySelectorAll(".tab-btn")
      this.tabContents = document.querySelectorAll(".tab-content")
      this.tabSelect = document.getElementById("tabSelect")
  
      // Initialize event listeners
      this.initEventListeners()
  
      // Load data from localStorage
      this.loadFromLocalStorage()
  
      // Render student list
      this.renderStudentList()
      this.renderRecentStudents()
      this.updateDashboardStats()
      this.updateAnalytics()
  
      // Load dark mode setting
      this.darkMode = localStorage.getItem("darkMode") === "true"
      this.applyTheme()
    }
  
    initEventListeners() {
      // Form submission
      this.studentForm.addEventListener("submit", (e) => {
        e.preventDefault()
        this.saveStudent()
      })
  
      // Reset form
      this.resetBtn.addEventListener("click", () => {
        this.resetForm()
      })
  
      // Export to JSON
      this.exportBtn.addEventListener("click", () => {
        this.exportToJson()
      })
  
      // Import from JSON
      this.importBtn.addEventListener("click", () => {
        this.showImportSection()
      })
  
      // Search
      this.searchBtn.addEventListener("click", () => {
        this.searchStudents()
      })
  
      this.searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
          this.searchStudents()
        }
      })
  
      // Add sample data
      this.addSampleBtn.addEventListener("click", () => {
        this.addSampleData()
      })
  
      // JSON section buttons
      this.copyJsonBtn.addEventListener("click", () => {
        this.copyJsonToClipboard()
      })
  
      this.downloadJsonBtn.addEventListener("click", () => {
        this.downloadJson()
      })
  
      this.closeJsonBtn.addEventListener("click", () => {
        this.jsonSection.classList.remove("show")
      })
  
      // Import section buttons
      this.confirmImportBtn.addEventListener("click", () => {
        this.importFromJson()
      })
  
      this.cancelImportBtn.addEventListener("click", () => {
        this.importSection.classList.remove("show")
      })
  
      // Settings buttons
      this.clearDataBtn.addEventListener("click", () => {
        this.clearAllData()
      })
  
      this.exportAllBtn.addEventListener("click", () => {
        this.exportToJson()
      })
  
      this.importtAllBtn.addEventListener("click", () => {
        this.showImportSection()
      })
      this.darkModeToggle.addEventListener("change", () => {
        this.toggleDarkMode()
      })
  
      this.autoSaveToggle.addEventListener("change", () => {
        this.showNotification("Auto save setting updated!", "success")
      })
  
      // Dashboard buttons
      this.viewAllStudentsBtn.addEventListener("click", () => {
        this.switchTab("students")
      })
  
      this.addStudentFromDashboard.addEventListener("click", () => {
        this.switchTab("add-student")
      })
  
      // Search type change
      this.searchByName.addEventListener("change", () => {
        this.searchInput.placeholder = "Search by name..."
      })
  
      this.searchByRoll.addEventListener("change", () => {
        this.searchInput.placeholder = "Search by roll number..."
      })
  
      this.searchBySubject.addEventListener("change", () => {
        this.searchInput.placeholder = "Search by subject..."
      })
  
      // Tab navigation
      this.tabBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const tabId = btn.getAttribute("data-tab")
          this.switchTab(tabId)
        })
      })
  
      // Mobile tab select
      this.tabSelect.addEventListener("change", () => {
        this.switchTab(this.tabSelect.value)
      })
    }
  
    applyTheme() {
      if (this.darkMode) {
        document.body.classList.add("dark-mode")
        this.darkModeCheckbox.checked = true
      } else {
        document.body.classList.remove("dark-mode")
        this.darkModeCheckbox.checked = false
      }
    }
  
    toggleDarkMode() {
      this.darkMode = this.darkModeCheckbox.checked
      localStorage.setItem("darkMode", this.darkMode)
      this.applyTheme()
      this.showNotification("Dark mode toggled!", "success")
    }
    switchTab(tabId) {
      // Update tab buttons
      this.tabBtns.forEach((btn) => {
        if (btn.getAttribute("data-tab") === tabId) {
          btn.classList.add("active")
        } else {
          btn.classList.remove("active")
        }
      })
  
      // Update tab content
      this.tabContents.forEach((content) => {
        if (content.id === `${tabId}-tab`) {
          content.classList.add("active")
        } else {
          content.classList.remove("active")
        }
      })
  
      // Update mobile select
      this.tabSelect.value = tabId
    }
  
    saveStudent() {
      // Check if roll number already exists (except for the current editing student)
      const rollNumber = this.rollNumberInput.value
      const existingStudent = this.students.find(
        (s) => s.rollNumber === rollNumber && (!this.editingId || s.id !== this.editingId),
      )
  
      if (existingStudent) {
        this.showNotification(`Roll number ${rollNumber} already exists!`, "error")
        return
      }
  
      const student = {
        rollNumber: rollNumber,
        name: this.nameInput.value,
        age: Number.parseInt(this.ageInput.value),
        grade: Number.parseInt(this.gradeInput.value),
        subjects: this.subjectsInput.value ? this.subjectsInput.value.split(",").map((s) => s.trim()) : [],
        gpa: Number.parseFloat(this.gpaInput.value) || 0,
        address: this.addressInput.value || "",
        email: this.emailInput.value || "",
        phone: this.phoneInput.value || "",
      }
  
      if (this.editingId) {
        // Update existing student
        const index = this.students.findIndex((s) => s.id === this.editingId)
        if (index !== -1) {
          student.id = this.editingId
          this.students[index] = student
          this.showNotification("Student updated successfully!", "success")
        }
      } else {
        // Add new student
        student.id = this.currentId++
        this.students.push(student)
        this.showNotification("Student added successfully!", "success")
      }
  
      this.saveToLocalStorage()
      this.renderStudentList()
      this.renderRecentStudents()
      this.updateDashboardStats()
      this.updateAnalytics()
      this.resetForm()
    }
  
    resetForm() {
      this.studentForm.reset()
      this.editingId = null
      this.studentIdInput.value = ""
      this.saveBtn.innerHTML = `
              <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Save Student
          `
    }
  
    editStudent(id) {
      const student = this.students.find((s) => s.id === id)
      if (student) {
        this.editingId = id
        this.studentIdInput.value = id
        this.rollNumberInput.value = student.rollNumber || ""
        this.nameInput.value = student.name
        this.ageInput.value = student.age
        this.gradeInput.value = student.grade
        this.subjectsInput.value = student.subjects.join(", ")
        this.gpaInput.value = student.gpa
        this.addressInput.value = student.address || ""
        this.emailInput.value = student.email || ""
        this.phoneInput.value = student.phone || ""
        this.saveBtn.innerHTML = `
                  <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Update Student
              `
  
        // Switch to add student tab
        this.switchTab("add-student")
      }
    }
  
    deleteStudent(id) {
      if (confirm("Are you sure you want to delete this student?")) {
        const index = this.students.findIndex((s) => s.id === id)
        if (index !== -1) {
          this.students.splice(index, 1)
          this.saveToLocalStorage()
          this.renderStudentList()
          this.renderRecentStudents()
          this.updateDashboardStats()
          this.updateAnalytics()
          this.showNotification("Student deleted successfully!", "success")
        }
      }
    }
  
    renderStudentList() {
      this.studentTableBody.innerHTML = ""
  
      if (this.students.length === 0) {
        document.getElementById("studentTable").style.display = "none"
        this.emptyState.style.display = "block"
        this.studentCount.textContent = "0 Students"
        this.studentsTabBadge.textContent = "0"
        return
      }
  
      document.getElementById("studentTable").style.display = "table"
      this.emptyState.style.display = "none"
      this.studentCount.textContent = `${this.students.length} Students`
      this.studentsTabBadge.textContent = this.students.length
  
      this.students.forEach((student) => {
        const row = document.createElement("tr")
        row.className = "fade-in"
  
        // Determine GPA grade and badge class
        let gradeLabel = "F"
        let badgeClass = "badge-danger"
  
        if (student.gpa >= 3.7) {
          gradeLabel = "A"
          badgeClass = "badge-success"
        } else if (student.gpa >= 3.0) {
          gradeLabel = "B"
          badgeClass = "badge-success"
        } else if (student.gpa >= 2.0) {
          gradeLabel = "C"
          badgeClass = "badge-warning"
        } else if (student.gpa >= 1.0) {
          gradeLabel = "D"
          badgeClass = "badge-danger"
        }
  
        // Create subjects HTML
        let subjectsHtml = ""
        if (student.subjects && student.subjects.length > 0) {
          subjectsHtml = `<div class="subjects-list">
                      ${student.subjects.map((subject) => `<span class="subject-tag">${subject}</span>`).join("")}
                  </div>`
        } else {
          subjectsHtml = '<span class="text-muted">No subjects</span>'
        }
  
        row.innerHTML = `
                  <td><span class="badge badge-primary">${student.rollNumber || "N/A"}</span></td>
                  <td>${student.name}</td>
                  <td>${student.age}</td>
                  <td>${student.grade}</td>
                  <td class="subjects-cell">${subjectsHtml}</td>
                  <td><span class="badge ${badgeClass}">${student.gpa.toFixed(1)} (${gradeLabel})</span></td>
                  <td class="table-actions">
                      <button class="btn btn-warning table-btn edit-btn" data-id="${student.id}">Edit</button>
                      <button class="btn btn-danger table-btn delete-btn" data-id="${student.id}">Delete</button>
                  </td>
              `
  
        this.studentTableBody.appendChild(row)
      })
  
      // Add event listeners to buttons
      document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          this.editStudent(Number.parseInt(btn.dataset.id))
        })
      })
  
      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          this.deleteStudent(Number.parseInt(btn.dataset.id))
        })
      })
    }
  
    renderRecentStudents() {
      this.recentStudentsTableBody.innerHTML = ""
  
      if (this.students.length === 0) {
        document.getElementById("recentStudentsTable").style.display = "none"
        this.recentStudentsEmptyState.style.display = "block"
        return
      }
  
      document.getElementById("recentStudentsTable").style.display = "table"
      this.recentStudentsEmptyState.style.display = "none"
  
      // Get the 5 most recent students (or all if less than 5)
      const recentStudents = [...this.students].slice(-5).reverse()
  
      recentStudents.forEach((student) => {
        const row = document.createElement("tr")
        row.className = "fade-in"
  
        // Determine GPA grade and badge class
        let gradeLabel = "F"
        let badgeClass = "badge-danger"
  
        if (student.gpa >= 3.7) {
          gradeLabel = "A"
          badgeClass = "badge-success"
        } else if (student.gpa >= 3.0) {
          gradeLabel = "B"
          badgeClass = "badge-success"
        } else if (student.gpa >= 2.0) {
          gradeLabel = "C"
          badgeClass = "badge-warning"
        } else if (student.gpa >= 1.0) {
          gradeLabel = "D"
          badgeClass = "badge-danger"
        }
  
        // Create subjects HTML
        let subjectsHtml = ""
        if (student.subjects && student.subjects.length > 0) {
          subjectsHtml = `<div class="subjects-list">
                      ${student.subjects.map((subject) => `<span class="subject-tag">${subject}</span>`).join("")}
                  </div>`
        } else {
          subjectsHtml = '<span class="text-muted">No subjects</span>'
        }
  
        row.innerHTML = `
                  <td><span class="badge badge-primary">${student.rollNumber || "N/A"}</span></td>
                  <td>${student.name}</td>
                  <td>${student.grade}</td>
                  <td class="subjects-cell">${subjectsHtml}</td>
                  <td><span class="badge ${badgeClass}">${student.gpa.toFixed(1)} (${gradeLabel})</span></td>
                  <td class="table-actions">
                      <button class="btn btn-warning table-btn edit-btn" data-id="${student.id}">Edit</button>
                      <button class="btn btn-danger table-btn delete-btn" data-id="${student.id}">Delete</button>
                  </td>
              `
  
        this.recentStudentsTableBody.appendChild(row)
      })
  
      // Add event listeners to buttons
      document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          this.editStudent(Number.parseInt(btn.dataset.id))
        })
      })
  
      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          this.deleteStudent(Number.parseInt(btn.dataset.id))
        })
      })
    }
  
    updateDashboardStats() {
      // Total students
      this.totalStudents.textContent = this.students.length
  
      // Total unique subjects
      const allSubjects = new Set()
      this.students.forEach((student) => {
        student.subjects.forEach((subject) => {
          allSubjects.add(subject)
        })
      })
      this.totalSubjects.textContent = allSubjects.size
  
      // Average GPA
      if (this.students.length > 0) {
        const totalGpa = this.students.reduce((sum, student) => sum + student.gpa, 0)
        const avgGpaValue = totalGpa / this.students.length
        this.avgGpa.textContent = avgGpaValue.toFixed(1)
      } else {
        this.avgGpa.textContent = "0.0"
      }
  
      // Total grade levels
      const gradeLevels = new Set()
      this.students.forEach((student) => {
        gradeLevels.add(student.grade)
      })
      this.totalGrades.textContent = gradeLevels.size
    }
  
    updateAnalytics() {
      // Analytics students count
      this.analyticsStudents.textContent = this.students.length
  
      if (this.students.length === 0) {
        this.analyticsHighGpa.textContent = "0.0"
        this.analyticsAvgAge.textContent = "0"
        this.analyticsPopularSubject.textContent = "-"
        this.gpaDistributionTable.innerHTML = ""
        return
      }
  
      // Highest GPA
      const highestGpa = Math.max(...this.students.map((student) => student.gpa))
      this.analyticsHighGpa.textContent = highestGpa.toFixed(1)
  
      // Average age
      const totalAge = this.students.reduce((sum, student) => sum + student.age, 0)
      const avgAge = totalAge / this.students.length
      this.analyticsAvgAge.textContent = avgAge.toFixed(1)
  
      // Most popular subject
      const subjectCount = {}
      this.students.forEach((student) => {
        student.subjects.forEach((subject) => {
          subjectCount[subject] = (subjectCount[subject] || 0) + 1
        })
      })
  
      let popularSubject = "-"
      let maxCount = 0
  
      for (const subject in subjectCount) {
        if (subjectCount[subject] > maxCount) {
          maxCount = subjectCount[subject]
          popularSubject = subject
        }
      }
  
      this.analyticsPopularSubject.textContent = popularSubject
  
      // GPA Distribution
      this.gpaDistributionTable.innerHTML = ""
  
      const gpaRanges = [
        { min: 3.7, max: 4.0, grade: "A" },
        { min: 3.0, max: 3.69, grade: "B" },
        { min: 2.0, max: 2.99, grade: "C" },
        { min: 1.0, max: 1.99, grade: "D" },
        { min: 0, max: 0.99, grade: "F" },
      ]
  
      gpaRanges.forEach((range) => {
        const studentsInRange = this.students.filter((student) => student.gpa >= range.min && student.gpa <= range.max)
  
        const percentage = (studentsInRange.length / this.students.length) * 100
  
        const row = document.createElement("tr")
        row.innerHTML = `
                  <td>${range.min.toFixed(1)} - ${range.max.toFixed(1)}</td>
                  <td>${range.grade}</td>
                  <td>${studentsInRange.length}</td>
                  <td>${percentage.toFixed(1)}%</td>
              `
  
        this.gpaDistributionTable.appendChild(row)
      })
    }
  
    searchStudents() {
      const searchTerm = this.searchInput.value.toLowerCase()
  
      if (!searchTerm) {
        this.renderStudentList()
        return
      }
  
      let filteredStudents = []
  
      // Determine search type
      if (this.searchByName.checked) {
        filteredStudents = this.students.filter((student) => student.name.toLowerCase().includes(searchTerm))
      } else if (this.searchByRoll.checked) {
        filteredStudents = this.students.filter(
          (student) => student.rollNumber && student.rollNumber.toLowerCase().includes(searchTerm),
        )
      } else if (this.searchBySubject.checked) {
        filteredStudents = this.students.filter((student) =>
          student.subjects.some((subject) => subject.toLowerCase().includes(searchTerm)),
        )
      }
  
      this.studentTableBody.innerHTML = ""
  
      if (filteredStudents.length === 0) {
        document.getElementById("studentTable").style.display = "none"
        this.emptyState.style.display = "block"
        this.emptyState.querySelector("p").textContent = "No students match your search."
        this.studentCount.textContent = "0 Students"
        return
      }
  
      document.getElementById("studentTable").style.display = "table"
      this.emptyState.style.display = "none"
      this.studentCount.textContent = `${filteredStudents.length} Students`
  
      filteredStudents.forEach((student) => {
        const row = document.createElement("tr")
        row.className = "fade-in"
  
        // Determine GPA grade and badge class
        let gradeLabel = "F"
        let badgeClass = "badge-danger"
  
        if (student.gpa >= 3.7) {
          gradeLabel = "A"
          badgeClass = "badge-success"
        } else if (student.gpa >= 3.0) {
          gradeLabel = "B"
          badgeClass = "badge-success"
        } else if (student.gpa >= 2.0) {
          gradeLabel = "C"
          badgeClass = "badge-warning"
        } else if (student.gpa >= 1.0) {
          gradeLabel = "D"
          badgeClass = "badge-danger"
        }
  
        // Create subjects HTML
        let subjectsHtml = ""
        if (student.subjects && student.subjects.length > 0) {
          subjectsHtml = `<div class="subjects-list">
                      ${student.subjects.map((subject) => `<span class="subject-tag">${subject}</span>`).join("")}
                  </div>`
        } else {
          subjectsHtml = '<span class="text-muted">No subjects</span>'
        }
  
        row.innerHTML = `
                  <td><span class="badge badge-primary">${student.rollNumber || "N/A"}</span></td>
                  <td>${student.name}</td>
                  <td>${student.age}</td>
                  <td>${student.grade}</td>
                  <td class="subjects-cell">${subjectsHtml}</td>
                  <td><span class="badge ${badgeClass}">${student.gpa.toFixed(1)} (${gradeLabel})</span></td>
                  <td class="table-actions">
                      <button class="btn btn-warning table-btn edit-btn" data-id="${student.id}">Edit</button>
                      <button class="btn btn-danger table-btn delete-btn" data-id="${student.id}">Delete</button>
                  </td>
              `
  
        this.studentTableBody.appendChild(row)
      })
  
      // Add event listeners to buttons
      document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          this.editStudent(Number.parseInt(btn.dataset.id))
        })
      })
  
      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          this.deleteStudent(Number.parseInt(btn.dataset.id))
        })
      })
    }
  
    exportToJson() {
      const jsonData = JSON.stringify(this.students, null, 2)
      this.jsonPreview.textContent = jsonData
      this.jsonSection.classList.add("show")
    }
  
    copyJsonToClipboard() {
      const jsonData = this.jsonPreview.textContent
      navigator.clipboard
        .writeText(jsonData)
        .then(() => {
          this.showNotification("JSON copied to clipboard!", "success")
        })
        .catch((err) => {
          this.showNotification("Failed to copy JSON", "error")
        })
    }
  
    downloadJson() {
      const jsonData = JSON.stringify(this.students, null, 2)
      const blob = new Blob([jsonData], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "students.json"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      this.showNotification("JSON file downloaded!", "success")
    }
  
    showImportSection() {
      this.importSection.classList.add("show")
      this.jsonInput.value = ""
    }
  
    importFromJson() {
      try {
        const jsonData = this.jsonInput.value.trim()
        if (!jsonData) {
          throw new Error("Please enter JSON data")
        }
  
        const parsedData = JSON.parse(jsonData)
  
        if (!Array.isArray(parsedData)) {
          throw new Error("Invalid JSON format. Expected an array of students.")
        }
  
        // Find the highest ID to ensure new IDs don't conflict
        let maxId = 0
        parsedData.forEach((student) => {
          if (student.id && student.id > maxId) {
            maxId = student.id
          }
        })
  
        this.currentId = maxId + 1
  
        // Replace or merge with existing students
        this.students = parsedData
  
        this.saveToLocalStorage()
        this.renderStudentList()
        this.renderRecentStudents()
        this.updateDashboardStats()
        this.updateAnalytics()
        this.importSection.classList.remove("show")
        this.showNotification(`Imported ${parsedData.length} students successfully!`, "success")
      } catch (error) {
        this.showNotification(`Import failed: ${error.message}`, "error")
      }
    }
  
    clearAllData() {
      if (confirm("Are you sure you want to delete all student data? This action cannot be undone.")) {
        this.students = []
        this.currentId = 1
        this.saveToLocalStorage()
        this.renderStudentList()
        this.renderRecentStudents()
        this.updateDashboardStats()
        this.updateAnalytics()
        this.showNotification("All student data has been cleared!", "success")
      }
    }
  
    addSampleData() {
      const sampleStudents = [
        {
          id: this.currentId++,
          rollNumber: "R001",
          name: "John Smith",
          age: 16,
          grade: 10,
          subjects: ["Math", "Science", "English"],
          gpa: 3.8,
          address: "123 Main St, Anytown, USA",
          email: "john.smith@example.com",
          phone: "(555) 123-4567",
        },
        {
          id: this.currentId++,
          rollNumber: "R002",
          name: "Emma Johnson",
          age: 15,
          grade: 9,
          subjects: ["History", "Art", "Math"],
          gpa: 3.5,
          address: "456 Oak Ave, Somewhere, USA",
          email: "emma.j@example.com",
          phone: "(555) 987-6543",
        },
        {
          id: this.currentId++,
          rollNumber: "R003",
          name: "Michael Brown",
          age: 17,
          grade: 11,
          subjects: ["Physics", "Chemistry", "Calculus"],
          gpa: 3.9,
          address: "789 Pine Rd, Nowhere, USA",
          email: "michael.b@example.com",
          phone: "(555) 456-7890",
        },
        {
          id: this.currentId++,
          rollNumber: "R004",
          name: "Sophia Garcia",
          age: 14,
          grade: 8,
          subjects: ["English", "Spanish", "Art"],
          gpa: 2.7,
          address: "321 Elm St, Anytown, USA",
          email: "sophia.g@example.com",
          phone: "(555) 234-5678",
        },
        {
          id: this.currentId++,
          rollNumber: "R005",
          name: "William Davis",
          age: 18,
          grade: 12,
          subjects: ["Computer Science", "Math", "Physics"],
          gpa: 3.2,
          address: "654 Maple Dr, Somewhere, USA",
          email: "william.d@example.com",
          phone: "(555) 876-5432",
        },
      ]
  
      this.students = [...this.students, ...sampleStudents]
      this.saveToLocalStorage()
      this.renderStudentList()
      this.renderRecentStudents()
      this.updateDashboardStats()
      this.updateAnalytics()
      this.showNotification("Sample data added successfully!", "success")
    }
  
    saveToLocalStorage() {
      localStorage.setItem("students", JSON.stringify(this.students))
      localStorage.setItem("currentId", this.currentId.toString())
    }
  
    loadFromLocalStorage() {
      const studentsData = localStorage.getItem("students")
      const currentIdData = localStorage.getItem("currentId")
  
      if (studentsData) {
        this.students = JSON.parse(studentsData)
      }
  
      if (currentIdData) {
        this.currentId = Number.parseInt(currentIdData)
      }
    }
  
    showNotification(message, type = "success") {
      this.notification.className = `notification ${type}`
      this.notificationMessage.textContent = message
  
      if (type === "success") {
        this.notification.querySelector(".notification-title").textContent = "Success"
        this.notification.querySelector(".notification-icon svg").innerHTML = `
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
              `
      } else {
        this.notification.querySelector(".notification-title").textContent = "Error"
        this.notification.querySelector(".notification-icon svg").innerHTML = `
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
              `
      }
  
      this.notification.classList.add("show")
  
      // Auto hide after 3 seconds
      setTimeout(() => {
        this.notification.classList.remove("show")
      }, 3000)
    }
  }
  
  // Initialize the system when the DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    const studentSystem = new StudentInfoSystem()
  })
  