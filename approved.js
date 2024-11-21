function displayApprovedJobs() {
    let approvedJobPostings = JSON.parse(localStorage.getItem('approvedJobPostings')) || [];
    const jobsContainer = document.getElementById('approvedJobsContainer');
  
    
    jobsContainer.innerHTML = '';
  
    approvedJobPostings.forEach(job => {
      const jobElement = document.createElement('div');
      jobElement.classList.add('job-posting');
      jobElement.innerHTML = `
        <h3>${job.title}</h3>
        <p>${job.description}</p>
        <button onclick="removeJobPosting('${job.id}', 'approved')">Remove</button>
        <button onclick="applyJobPosting('${job.id}', 'approved')">Apply</button>
      `;
      jobsContainer.appendChild(jobElement);
    });
  }
  
  function removeJobPosting(jobId, type) {
    const password = prompt("Please enter the password to remove this posting:");
    
    if (password === '123') {
      let jobPostings = JSON.parse(localStorage.getItem(`${type}JobPostings`)) || [];
      jobPostings = jobPostings.filter(job => job.id !== jobId);
      localStorage.setItem(`${type}JobPostings`, JSON.stringify(jobPostings));
        
      displayApprovedJobs();
    } else {
      alert("Incorrect password!");
    }
  }

  function applyJobPosting(jobId, type) {
   
    const jobBox = document.getElementById(`job-${jobId}`);
  
   
    if (jobBox) {
      jobBox.style.display = 'none';
    }
  
    
    const form = document.createElement('form');
    form.setAttribute('id', 'jobApplicationForm');
    form.innerHTML = `
      <h3>Apply for Job Posting</h3>
      <label for="name">Full Name:</label>
      <input type="text" id="name" name="name" required><br><br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required><br><br>
      <label for="resume">Upload Resume:</label>
      <input type="file" id="resume" name="resume" required><br><br>
      <label for="coverLetter">Cover Letter:</label>
      <textarea id="coverLetter" name="coverLetter" rows="4" required></textarea><br><br>
      <button type="submit">Submit Application</button>
      <button type="button" id="cancelButton">Cancel</button>
    `;
  
    document.body.appendChild(form);
   
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const resume = document.getElementById('resume').files[0];
      const coverLetter = document.getElementById('coverLetter').value;
  
      
      let applications = JSON.parse(localStorage.getItem('pendingApplications')) || [];
      const application = {
        jobId,
        name,
        email,
        resume,
        coverLetter,
        status: 'pending',
      };
      applications.push(application);
      localStorage.setItem('pendingApplications', JSON.stringify(applications));
  
      
      form.reset();
  
      
      form.style.display = 'none';
  
     
      if (jobBox) {
        jobBox.style.display = 'block';
      }
  
      alert("Your application has been submitted!");
    });
  
    
    const cancelButton = document.getElementById('cancelButton');
    if (cancelButton) {
      cancelButton.addEventListener('click', function() {
        form.style.display = 'none';
  
        
        if (jobBox) {
          jobBox.style.display = 'block';
        }
      });
    }
  }
  

  
  
  document.addEventListener('DOMContentLoaded', () => {
    displayApprovedJobs();
  });
  
