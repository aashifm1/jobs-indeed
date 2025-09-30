function generateJobs(count) {
  const roles = ["Software Engineer","Data Scientist","Product Manager","UX Designer","DevOps Engineer","Full Stack Developer","Backend Developer","Frontend Developer"];
  const companies = ["AlphaTech","BetaSoft","CloudSolutions","DataDynamics","InnovateX","NextGen","QuantumWorks","WebCraft"];
  const locations = [
    { city: "New York", country: "USA" },
    { city: "Bangalore", country: "India" },
    { city: "London", country: "UK" },
    { city: "Berlin", country: "Germany" },
    { city: "Sydney", country: "Australia" },
    { city: "Toronto", country: "Canada" },
  ];
  const types = ["Onsite","Hybrid","Remote"];
  const salaryRanges = ["$80,000‑$120,000", "₹15,00,000‑₹25,00,000", "£60,000‑£90,000", "$120,000‑$160,000", "€70,000‑€110,000"];

  const jobs = [];
  for (let i = 1; i <= count; i++) {
    const role = roles[i % roles.length];
    const company = companies[i % companies.length];
    const loc = locations[i % locations.length];
    const type = types[i % types.length];
    const locationText = type === "Remote" ? "Remote" : `${loc.city}, ${loc.country}`;
    const salary = salaryRanges[i % salaryRanges.length];
    const daysAgo = (i * 3) % 30 + 1;
    const posted = `${daysAgo} days ago`;

    jobs.push({
      id: i,
      role,
      company,
      locationType: type,
      location: locationText,
      salary,
      posted
    });
  }
  return jobs;
}

const jobs = generateJobs(100);
const jobsPerPage = 25;
let currentPage = 1;
const totalPages = Math.ceil(jobs.length / jobsPerPage);

const jobListings = document.getElementById('job-listings');
const prevButton = document.getElementById('prev-page');
const nextButton = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');

function renderPage() {
  jobListings.innerHTML = '';
  const start = (currentPage - 1) * jobsPerPage;
  const end = start + jobsPerPage;
  const slice = jobs.slice(start, end);

  slice.forEach(job => {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.setAttribute('data-job-id', job.id);

    // left info
    const info = document.createElement('div');
    info.className = 'job-info';

    const h2 = document.createElement('h2');
    h2.textContent = job.role;
    h2.setAttribute('data-job-role', '');
    info.appendChild(h2);

    const cP = document.createElement('p');
    cP.className = 'company';
    cP.textContent = job.company;
    cP.setAttribute('data-job-company', '');
    info.appendChild(cP);

    const locP = document.createElement('p');
    locP.className = 'location';
    locP.textContent = `${job.location} (${job.locationType})`;
    locP.setAttribute('data-job-location', '');
    info.appendChild(locP);

    const postP = document.createElement('p');
    postP.className = 'posted';
    postP.textContent = `Posted: ${job.posted}`;
    postP.setAttribute('data-job-posted', '');
    info.appendChild(postP);

    // right salary
    const salDiv = document.createElement('div');
    salDiv.className = 'job-salary';

    const salAmt = document.createElement('div');
    salAmt.className = 'salary-amt';
    salAmt.textContent = job.salary;
    salAmt.setAttribute('data-job-salary', '');
    salDiv.appendChild(salAmt);

    const salLabel = document.createElement('div');
    salLabel.className = 'salary-label';
    salLabel.textContent = 'Annual Salary';
    salDiv.appendChild(salLabel);

    card.appendChild(info);
    card.appendChild(salDiv);

    jobListings.appendChild(card);
  });

  prevButton.disabled = (currentPage === 1);
  nextButton.disabled = (currentPage === totalPages);
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
});
nextButton.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
  }
});

document.addEventListener('DOMContentLoaded', renderPage);
