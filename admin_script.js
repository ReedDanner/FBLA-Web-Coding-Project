function generateUniqueJobId() {
    return 'job_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    displayPendingJobPostings();
    displayApprovedJobPostings();
});

function displayPendingJobPostings() {
    const pendingJobsContainer = document.getElementById('pendingJobs');
    pendingJobsContainer.innerHTML = ''; 

    const pendingJobPostings = JSON.parse(localStorage.getItem('pendingJobPostings')) || [];

    if (pendingJobPostings.length === 0) {
        pendingJobsContainer.innerHTML = '<p>No pending job postings.</p>';
    } else {
        pendingJobPostings.forEach(job => {
            const jobElement = document.createElement('div');
            jobElement.classList.add('job-posting');
            jobElement.innerHTML = `
                <h3>${job.title}</h3>
                <p>${job.description}</p>
                <p>Contact: ${job.contactEmail}</p>
                <p>Status: ${job.status}</p>
                <div>
                    <button class="approve-button small-button" data-job-id="${job.id}">Approve</button>
                    <button class="deny-button small-button" data-job-id="${job.id}">Deny</button>
                </div>
                <hr>
            `;
            pendingJobsContainer.appendChild(jobElement);
        });

        addApprovalEventListeners();
    }
}

function displayApprovedJobPostings() {
    const approvedJobContainer = document.getElementById('approvedJobs'); 
    approvedJobContainer.innerHTML = ''; 

    const approvedJobPostings = JSON.parse(localStorage.getItem('approvedJobPostings')) || [];

    approvedJobPostings.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.classList.add('job-posting');
        jobElement.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.description}</p>
            <p>Contact: ${job.contactEmail}</p>
            <button class="delete-button small-button" data-job-id="${job.id}">Delete Posting</button>
            <hr>
        `;
        approvedJobContainer.appendChild(jobElement);
    });

    addDeleteEventListeners();
}

function addApprovalEventListeners() {
    const approveButtons = document.querySelectorAll('.approve-button');
    const denyButtons = document.querySelectorAll('.deny-button');

    approveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const jobId = this.dataset.jobId;
            approveJobPosting(jobId);
        });
    });

    denyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const jobId = this.dataset.jobId;
            denyJobPosting(jobId);
        });
    });
}

function approveJobPosting(jobId) {
    let pendingJobPostings = JSON.parse(localStorage.getItem('pendingJobPostings')) || [];

    const jobToApprove = pendingJobPostings.find(job => job.id === jobId);
    
    if (jobToApprove) {
        pendingJobPostings = pendingJobPostings.filter(job => job.id !== jobId);
        localStorage.setItem('pendingJobPostings', JSON.stringify(pendingJobPostings));

        let approvedJobPostings = JSON.parse(localStorage.getItem('approvedJobPostings')) || [];
        approvedJobPostings.push(jobToApprove);
        localStorage.setItem('approvedJobPostings', JSON.stringify(approvedJobPostings));

        displayPendingJobPostings();
        displayApprovedJobPostings();
    }
}

function denyJobPosting(jobId) {
    let pendingJobPostings = JSON.parse(localStorage.getItem('pendingJobPostings')) || [];

    pendingJobPostings = pendingJobPostings.filter(job => job.id !== jobId);
    localStorage.setItem('pendingJobPostings', JSON.stringify(pendingJobPostings));

    displayPendingJobPostings();
}

function addDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll('.delete-button');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const jobId = this.dataset.jobId;
            deleteJobPosting(jobId);
        });
    });
}

function deleteJobPosting(jobId) {
    let approvedJobPostings = JSON.parse(localStorage.getItem('approvedJobPostings')) || [];

    approvedJobPostings = approvedJobPostings.filter(job => job.id !== jobId);
    localStorage.setItem('approvedJobPostings', JSON.stringify(approvedJobPostings));

    displayApprovedJobPostings();
}

document.getElementById('jobSubmissionForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const jobTitle = document.getElementById('jobTitle').value;
    const description = document.getElementById('description').value;
    const contactEmail = document.getElementById('contactEmail').value;

    const jobId = generateUniqueJobId();

    const jobData = {
        id: jobId,
        title: jobTitle,
        description: description,
        contactEmail: contactEmail,
        status: 'pending' 
    };

    let pendingJobPostings = JSON.parse(localStorage.getItem('pendingJobPostings')) || [];

    pendingJobPostings.push(jobData);

    localStorage.setItem('pendingJobPostings', JSON.stringify(pendingJobPostings));

    document.getElementById('jobSubmissionForm').reset();
    alert('Job submission successful! Your job is now pending approval.');

    displayPendingJobPostings();
});

function loadPendingJobs() {
    const pendingJobs = JSON.parse(localStorage.getItem('pendingJobPostings')) || [];
    const pendingJobsContainer = document.getElementById('pendingJobs');
    
    pendingJobsContainer.innerHTML = ''; 
    
    pendingJobs.forEach(job => {
      const jobElement = document.createElement('div');
      jobElement.classList.add('job-posting');
      jobElement.innerHTML = `
        <h3>${job.title}</h3>
        <p>${job.description}</p>
        <button onclick="approveJobPosting('${job.id}')">Approve</button>
        <button onclick="removeJobPosting('${job.id}', 'pending')">Remove</button>
      `;
      pendingJobsContainer.appendChild(jobElement);
    });
  }
  
  function loadApprovedJobs() {
    const approvedJobs = JSON.parse(localStorage.getItem('approvedJobPostings')) || [];
    const approvedJobsContainer = document.getElementById('approvedJobs');
    
    approvedJobsContainer.innerHTML = ''; 
    
    approvedJobs.forEach(job => {
      const jobElement = document.createElement('div');
      jobElement.classList.add('job-posting');
      jobElement.innerHTML = `
        <h3>${job.title}</h3>
        <p>${job.description}</p>
        <button onclick="removeJobPosting('${job.id}', 'approved')">Remove</button>
      `;
      approvedJobsContainer.appendChild(jobElement);
    });
  }
  
  function approveJobPosting(jobId) {
    let pendingJobPostings = JSON.parse(localStorage.getItem('pendingJobPostings')) || [];
    const jobToApprove = pendingJobPostings.find(job => job.id === jobId);
  
    if (jobToApprove) {
      let approvedJobPostings = JSON.parse(localStorage.getItem('approvedJobPostings')) || [];
      approvedJobPostings.push(jobToApprove);
      localStorage.setItem('approvedJobPostings', JSON.stringify(approvedJobPostings));
  
      pendingJobPostings = pendingJobPostings.filter(job => job.id !== jobId);
      localStorage.setItem('pendingJobPostings', JSON.stringify(pendingJobPostings));
  
      loadPendingJobs();
      loadApprovedJobs();
    }
  }
  
  function removeJobPosting(jobId, type) {
    const password = prompt("Please enter the password to remove this posting:");
    
    if (password === '123') {
      let jobPostings = JSON.parse(localStorage.getItem(`${type}JobPostings`)) || [];
      jobPostings = jobPostings.filter(job => job.id !== jobId);
      localStorage.setItem(`${type}JobPostings`, JSON.stringify(jobPostings));
  
      if (type === 'pending') {
        loadPendingJobs();
      } else if (type === 'approved') {
        loadApprovedJobs();
      }
    } else {
      alert("Incorrect password!");
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    loadPendingJobs();
    loadApprovedJobs();
  });
  