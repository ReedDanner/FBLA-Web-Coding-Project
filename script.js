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
                    <button class="approve-button" data-job-id="${job.id}">Approve</button>
                    <button class="deny-button" data-job-id="${job.id}">Deny</button>
                </div>
                <hr>
            `;
            pendingJobsContainer.appendChild(jobElement);
        });

        addApprovalEventListeners();
    }
}

function displayApprovedJobPostings() {
    const activeJobContainer = document.getElementById('activeJobs'); 
    activeJobContainer.innerHTML = ''; 

    const approvedJobPostings = JSON.parse(localStorage.getItem('approvedJobPostings')) || [];

    approvedJobPostings.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.classList.add('job-posting');
        jobElement.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.description}</p>
            <p>Contact: ${job.contactEmail}</p>
            <button class="delete-button" data-job-id="${job.id}">Delete Posting</button>
            <hr>
        `;
        activeJobContainer.appendChild(jobElement);
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

    document.getElementById('jobTitle').value = '';
    document.getElementById('description').value = '';
    document.getElementById('contactEmail').value = '';

    document.getElementById('jobSubmissionForm').reset();
    alert('Job submission successful! Your job is now pending approval.');

    displayPendingJobPostings();
    displayApprovedJobPostings();
});

function approveJobPosting(jobId) {
    let pendingJobPostings = JSON.parse(localStorage.getItem('pendingJobPostings')) || [];
  
    const jobToApprove = pendingJobPostings.find(job => job.id === jobId);
  
    if (jobToApprove) {
      let activeJobPostings = JSON.parse(localStorage.getItem('activeJobPostings')) || [];
      activeJobPostings.push(jobToApprove);
  
      localStorage.setItem('activeJobPostings', JSON.stringify(activeJobPostings));
  
      pendingJobPostings = pendingJobPostings.filter(job => job.id !== jobId);
  
      localStorage.setItem('pendingJobPostings', JSON.stringify(pendingJobPostings));
  
      displayApprovedJobs();
    }
  }
  
  function displayApprovedJobs() {
    let activeJobPostings = JSON.parse(localStorage.getItem('activeJobPostings')) || [];
    const jobsContainer = document.getElementById('approvedJobsContainer');
  
    jobsContainer.innerHTML = '';
  
    activeJobPostings.forEach(job => {
      const jobElement = document.createElement('div');
      jobElement.classList.add('job-posting');
      jobElement.innerHTML = `
        <h3>${job.title}</h3>
        <p>${job.description}</p>
        <p>Company: ${contact.email}</p>
      `;
      jobsContainer.appendChild(jobElement);
    });
  }
  
 document.addEventListener('DOMContentLoaded', () => {
    displayApprovedJobs();
  });
  