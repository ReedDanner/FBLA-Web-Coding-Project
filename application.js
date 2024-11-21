document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get("jobId");
    document.getElementById("jobId").value = jobId;

    document.getElementById("applicationForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const jobId = document.getElementById("jobId").value;
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const resumeFile = document.getElementById("resume").files[0]; 

        if (!name || !email || !resumeFile) {
            alert("Please fill out all fields and attach a resume.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const resume = event.target.result;

            const application = {
                id: Date.now(), 
                jobId: jobId,
                name: name,
                email: email,
                resume: resume
            };

            let pendingApplications = JSON.parse(localStorage.getItem("pendingApplications")) || [];
            pendingApplications.push(application);
            localStorage.setItem("pendingApplications", JSON.stringify(pendingApplications));

            alert("Application submitted successfully!");
            window.location.href = "job_postings.html"; 
        };
        reader.readAsDataURL(resumeFile); 
    });
});
